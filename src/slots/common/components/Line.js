import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-pixi-fiber';
import { Graphics, Texture, BaseTexture, Sprite } from 'pixi.js';
import HelperLine from '../helpers/Line';

const SIDES = {
    left: 'left',
    right: 'right',
    all: 'all'
};

export default class Line extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.pointValueIndex = {
            xPosition: 0,
            yPosition: 1,
            type: 2,
            symbolIndex: 3,
            intersectionSide: 4
        };

        this.lineIndex = props.lineNumber - 1;
        this.helperLine = new HelperLine(
            {
                lineNumber: props.lineNumber,
                pointValueIndex: this.pointValueIndex
            },
            context.config,
            this.getContainerCoordinates.bind(this)
        );

        const linesStyle = context.config.lines;
        this.lineMainWidth = linesStyle.lineWidth;
        this.lineBorderWidth = linesStyle.lineBorderWidth;
        this.linesColor = linesStyle.colors;

        // this.linesProperties = linesStyle.lineIcons.properties;
        const linesContainer = linesStyle.container;
        this.linesContainerWidth = linesContainer.width;
        this.linesContainerHeight = linesContainer.height;

        this.fullLinePoints = this.helperLine.getPointsFullLine();
        this.winLinePoints = this.helperLine.getPointsWinLine();
        this.borderColor = this.linesColor['border'][this.lineIndex];
        this.mainColor = this.linesColor['main'][this.lineIndex];

        this.elemRef = React.createRef();
    }

    getContainerCoordinates() {
        return {
            x: this.context.config.reel.cellDimensions.startOffsetX - this.context.config.lines.container.x,
            y: 0
        };
    }

    _init() {
        this.elem = this.elemRef.current;
        this.textureFullLine = null;
        this.texturesWinLine = {};
        this.imageLine = new Sprite();
        this.elem.addChild(this.imageLine);

        this._createFullLine();
    }

    _createGraphics() {
        const graphics = new Graphics();
        graphics.drawRect(0, 0, this.linesContainerWidth, this.linesContainerHeight);
        return graphics;
    }

    _createFullLine() {
        const rectangle = this._createGraphics();
        this._createLine(
            this.fullLinePoints,
            0,
            this.fullLinePoints.length - 1,
            rectangle,
            SIDES.all
        );
        this.textureFullLine = this._getBaseTextureImageFromCanvas(rectangle);
        this.forceUpdate(); //@todo remove this shit
    }

    _createLine(points, startIndex, endIndex, graphics, side) {
        this._createCommonLine(points, startIndex, endIndex, graphics, side);
    }

    _createCommonLine(points, startIndex, endIndex, graphics, side) {
        this._drawLine({
            points,
            startIndex,
            endIndex,
            lineWidth: this.lineBorderWidth,
            color: this.borderColor,
            graphics
        });
        this._drawLine({
            points,
            startIndex,
            endIndex,
            lineWidth: this.lineMainWidth,
            color: this.mainColor,
            graphics
        });
    }

    _drawLine({ points = [], lineWidth, color, startIndex, endIndex, graphics }) {
        graphics.lineStyle(lineWidth, color);

        const { xPosition, yPosition } = this.pointValueIndex;
        const _firstPoint = points[startIndex];

        let nextPoint;
        graphics.moveTo(_firstPoint[xPosition], _firstPoint[yPosition]);
        for (let i = startIndex + 1; i <= endIndex; i++) {
            nextPoint = points[i];
            graphics.lineTo(nextPoint[xPosition], nextPoint[yPosition]);
        }
    }

    _getBaseTextureImageFromCanvas(container) {
        this.props.renderer.render(container);
        const canvas = this.props.renderer.extract.canvas(container);
        const texture = new BaseTexture(canvas);
        return new Texture(texture);
    }

    _drawFullLine() {
        this.imageLine.texture = this.textureFullLine;
    }

    _drawWinLineVector(mapWinSymbols, graphics) {
        let mapWinSymbolIndex = 0;
        let prevSymbolIndex = 0;
        let startIndexForLineBeth = 0;
        let firstWinSymbolIndex = mapWinSymbols.indexOf(1);
        let lastWinSymbolIndex = mapWinSymbols.lastIndexOf(1);

        for (let i = 0; i < this.winLinePoints.length; i++) {
            let type = this.winLinePoints[i][this.pointValueIndex.type];
            let symbolIndex = this.winLinePoints[i][this.pointValueIndex.symbolIndex];
            let intersectionSide = this.winLinePoints[i][this.pointValueIndex.intersectionSide];

            if (type !== 'intersection') {
                continue;
            }

            if (prevSymbolIndex !== symbolIndex) {
                prevSymbolIndex = symbolIndex;
                mapWinSymbolIndex += 1;
            }

            // draw line beginning
            if (firstWinSymbolIndex === mapWinSymbolIndex && intersectionSide === SIDES.left) {
                this._createLine(this.winLinePoints, 0, i, graphics, SIDES.left);
            }

            // set start point beth line
            if (
                intersectionSide === SIDES.right &&
                mapWinSymbols[mapWinSymbolIndex] &&
                mapWinSymbolIndex < lastWinSymbolIndex
            ) {
                startIndexForLineBeth = i;
            }

            // draw line between win symbols
            if (
                intersectionSide === SIDES.left &&
                mapWinSymbols[mapWinSymbolIndex] &&
                firstWinSymbolIndex !== mapWinSymbolIndex
            ) {
                this._createLine(this.winLinePoints, startIndexForLineBeth, i, graphics);
            }

            // draw line ending
            if (intersectionSide === SIDES.right && lastWinSymbolIndex === mapWinSymbolIndex) {
                this._createLine(this.winLinePoints, i, this.winLinePoints.length - 1, graphics, SIDES.right);
            }
        }
    }

    _getMapWinSymbols() {
        return this.helperLine.getMapWinSymbols(this.props);
    }

    _drawWinLinePicture() {
        const mapWinSymbols = this._getMapWinSymbols();
        const keyWinLine = mapWinSymbols.join('');

        if (!this.texturesWinLine[keyWinLine]) {
            const rectangle = this._createGraphics();
            this._drawWinLineVector(mapWinSymbols, rectangle);
            this.texturesWinLine[keyWinLine] = this._getBaseTextureImageFromCanvas(rectangle);
        }

        this.imageLine.texture = this.texturesWinLine[keyWinLine];
    }

    _drawWinLine() {
        this._drawWinLinePicture();
    }

    componentDidUpdate(prevProps) {
        const isNeedToDrawWinLine = this.props.lineLength !== prevProps.lineLength && !isNaN(this.props.lineLength) && this.props.lineLength !== 0 ||
            this.props.lineLength !== prevProps.lineLength && this.props.lineLength === 'm' ||
            this.props.bonusReels !== prevProps.bonusReels;

        const isNeedToDrawFullLine =
            this.props.lineIsActive !== prevProps.lineIsActive &&
            this.props.lineIsActive &&
            !this.props.lineLength &&
            !this.props.bonusReels;

        if (isNeedToDrawFullLine) {
            this._drawFullLine();
        } else if (isNeedToDrawWinLine) {
            this._drawWinLine();
        }
        //
        // if (this.props.isSelected) {
        //     this._drawFullLine();
        // }
    }

    componentDidMount() {
        this._init();
    }

    render() {
        return (
            <Container x={0} y={0} visible={this.props.visible}>
                <Container visible={this.props.lineIsActive} ref={this.elemRef} />
            </Container>
        );
    }
}
