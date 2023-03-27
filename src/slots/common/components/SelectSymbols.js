import React from 'react';
import PropTypes from 'prop-types';
import { Text, Container, Sprite } from 'react-pixi-fiber';
import { Graphics, Texture, BaseTexture } from 'pixi.js';

export default class SelectSymbols extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);

        this.selectSymbolsElementsProps = [];
        this.selectSymbolsComponents = [];

        this.textureForSelected = {};

        this.reelTotalCount = context.config.reel.totalCount;
        this.freeGameSymbol = context.config.symbols.freeGameSymbol;

        this.linesTotalCount = context.config.lines.total;

        this.winLinesMapSymbols = context.config.lines.winLinesMapSymbols;

        const styles = context.config.lines;
        this.lineMainWidth = styles.lineWidth;
        this.lineBorderWidth = styles.lineBorderWidth;
        this.linesColors = styles.colors;

        const cellSettings = context.config.cell;
        this.cellStartX = cellSettings.startOffsetX;
        this.cellStartY = cellSettings.startOffsetY;
        this.cellWidth = cellSettings.width;
        this.cellHeight = cellSettings.height;
        this.cellOffsetX = this.cellWidth + cellSettings.offsetX;
        this.cellOffsetY = this.cellHeight + cellSettings.offsetY;

        this.isShowScoresOnLine = !!styles.isShowScoresOnLine;
        if (this.isShowScoresOnLine) {
            const scoresLineBlock = styles.scoresLineBlock;
            this.scoresContainer = scoresLineBlock.scoresContainer;
            this.scoresText = scoresLineBlock.scoresText;
        }
    }

    componentDidMount() {
        this._createSelectSymbolsProps();
        this._createImageForSelectSymbols();
    }

    componentWillReceiveProps(nextProps) {
        const {
            visible,
            lineLength,
            lineNumber,
            scoresLine,
            bonusReels,
            isShowBonusFreegame,
            reelSymbolsLine
        } = nextProps;

        if (visible) {
            if (isShowBonusFreegame && bonusReels) {
                this.selectSymbolsComponents = this._getSymbolsSelectForBonusFreegame(
                    lineLength,
                    lineNumber,
                    scoresLine,
                    bonusReels
                );
            } else if (this.props.lineLength !== lineLength) {
                this.selectSymbolsComponents = this._getSymbolsSelect(
                    lineLength,
                    lineNumber,
                    scoresLine
                );
            } else if (lineNumber === 0) {
                const freegameSymbolsPosition = this._getFreegameSymbolsPosition(reelSymbolsLine);
                if (freegameSymbolsPosition.length > 0) {
                    this.selectSymbolsComponents = this._getSelectFreegameSymbols(
                        freegameSymbolsPosition,
                        lineNumber,
                        scoresLine
                    );
                }
            } else if (this.textureForScores) {
                this.textureForScores.destroy();
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.visible !== nextProps.visible ||
            this.props.lineLength !== nextProps.lineLength
        );
    }

    _createSelectSymbolsProps() {
        const lineNumber = this.props.lineNumber;

        const selectedMapWinSymbols = this.winLinesMapSymbols[lineNumber];

        for (let reelIndex = 0; reelIndex < this.reelTotalCount; reelIndex++) {
            this.selectSymbolsElementsProps.push({
                id: reelIndex,
                key: `selectLine${lineNumber}${reelIndex}`,
                x: this.cellStartX + this.cellOffsetX * reelIndex - this.lineMainWidth / 2,
                y:
                    this.cellStartY +
                    this.cellOffsetY * selectedMapWinSymbols[reelIndex] -
                    this.lineMainWidth / 2
            });
        }
    }

    _createRectangle({ graphics, x, y, width, height, lineWidth, color, fillColor }) {
        if (fillColor !== undefined) {
            graphics.beginFill(fillColor, 1);
        }
        graphics.lineStyle(lineWidth, color, 1);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();
    }

    _getBaseTextureImageFromCanvas(element) {
        this.props.renderer.render(element);
        const canvas = this.props.renderer.extract.canvas(element);
        return new BaseTexture(canvas);
    }

    _createImageForSelectSymbols() {
        const graphics = new Graphics();
        const _lineNumber =
            this.props.lineNumber !== 0 ? this.props.lineNumber - 1 : this.linesTotalCount;

        const propsForRectangle = {
            graphics: graphics,
            x: this.lineMainWidth,
            y: this.lineMainWidth,
            width: this.cellWidth + this.lineMainWidth,
            height: this.cellHeight + this.lineMainWidth
        };

        this._createRectangle({
            ...propsForRectangle,
            lineWidth: this.lineBorderWidth,
            color: this.linesColors['border'][_lineNumber]
        });
        this._createRectangle({
            ...propsForRectangle,
            lineWidth: this.lineMainWidth,
            color: this.linesColors['main'][_lineNumber]
        });

        const baseTexture = this._getBaseTextureImageFromCanvas(graphics);
        this.textureForSelected = new Texture(baseTexture);
    }

    _getRectangleImage({ key, x, y, width, height, visible }) {
        return (
            <Sprite
                key={key}
                texture={this.textureForSelected}
                x={x}
                y={y}
                width={width}
                height={height}
                visible={visible}
            />
        );
    }

    _getFreegameSymbolsPosition(reelSymbolsLine) {
        const freegameSymbolsPosition = [];
        reelSymbolsLine.map((element, symbolIndex) => {
            if (element === this.freeGameSymbol) {
                const reelIndex = Math.floor(symbolIndex / 3);
                const indexPositionByY = symbolIndex % 3;

                freegameSymbolsPosition.push({ reelIndex, indexPositionByY });
            }
        });
        return freegameSymbolsPosition;
    }

    _getSymbolsSelect(lineLenght, lineNumber, scoresLine) {
        const _lineLenght = lineLenght || 0;
        const _selectSymbolsComponents = [];
        const selectSymbolsElementsProps = this.selectSymbolsElementsProps;
        let rectangleData, animationBorderData, coordinateScores;

        selectSymbolsElementsProps.map(({ id, key, x, y }) => {
            rectangleData = {
                key: key,
                x: x,
                y: y,
                width: this.cellWidth + this.lineMainWidth,
                height: this.cellHeight + this.lineMainWidth,
                visible: true
            };
            animationBorderData = {
                nameSprite: 'combinationFallout',
                x: x,
                y: y,
                width: this.cellWidth + this.lineMainWidth,
                height: this.cellHeight + this.lineMainWidth
            };

            if (_lineLenght > 0) {
                if (id < _lineLenght) {
                    _selectSymbolsComponents.push(this._getRectangleImage(rectangleData));
                }
            }

            if (_lineLenght < 0) {
                if (id > this.reelTotalCount - 1 - -_lineLenght) {
                    _selectSymbolsComponents.push(this._getRectangleImage(rectangleData));
                }
            }

            if (_lineLenght === 'm') {
                if (id > 0 && id < this.reelTotalCount - 1) {
                    _selectSymbolsComponents.push(this._getRectangleImage(rectangleData));
                }
            }

            if (!coordinateScores && _selectSymbolsComponents.length === 1) {
                coordinateScores = { x, y };
            }
        });

        if (this.isShowScoresOnLine && _selectSymbolsComponents.length) {
            _selectSymbolsComponents.push(
                this._createScoresBlock(
                    lineNumber - 1,
                    scoresLine,
                    coordinateScores.x,
                    coordinateScores.y
                )
            );
        }

        return _selectSymbolsComponents;
    }

    _getSelectFreegameSymbols(freegameSymbolsPosition, lineNumber, scoresLine) {
        const _selectSymbolsComponents = [];
        freegameSymbolsPosition.map(({ reelIndex, indexPositionByY }) => {
            const propsForRectangle = this.selectSymbolsElementsProps[reelIndex];
            _selectSymbolsComponents.push(
                this._getRectangleImage({
                    key: propsForRectangle.key + indexPositionByY,
                    x: propsForRectangle.x,
                    y:
                        this.cellStartY +
                        this.cellOffsetY * indexPositionByY -
                        this.lineMainWidth / 2,
                    width: this.cellWidth + this.lineMainWidth,
                    height: this.cellHeight + this.lineMainWidth,
                    visible: true
                })
            );
        });

        if (this.isShowScoresOnLine) {
            const freegameSymbolPosition = freegameSymbolsPosition[0];
            _selectSymbolsComponents.push(
                this._createScoresBlock(
                    this.linesTotalCount,
                    scoresLine,
                    this.selectSymbolsElementsProps[freegameSymbolPosition.reelIndex].x,
                    this.cellStartY +
                        this.cellOffsetY * freegameSymbolPosition.indexPositionByY -
                        this.lineMainWidth / 2
                )
            );
        }

        return _selectSymbolsComponents;
    }

    _getSymbolsSelectForBonusFreegame(lineLenght, lineNumber, scoresLine, bonusReels) {
        const _selectSymbolsComponents = [];
        const selectSymbolsElementsProps = this.selectSymbolsElementsProps;

        const bonusSymbolsPosition = bonusReels;

        selectSymbolsElementsProps.map(({ id, key, x, y }) => {
            if (bonusSymbolsPosition.indexOf(id) >= 0) {
                _selectSymbolsComponents.push(
                    this._getRectangleImage({
                        key: key,
                        x,
                        y,
                        width: this.cellWidth + this.lineMainWidth,
                        height: this.cellHeight + this.lineMainWidth,
                        visible: true
                    })
                );
            }
        });

        if (this.isShowScoresOnLine) {
            _selectSymbolsComponents.push(
                this._createScoresBlock(
                    lineNumber - 1,
                    scoresLine,
                    selectSymbolsElementsProps[bonusSymbolsPosition[0]].x,
                    selectSymbolsElementsProps[bonusSymbolsPosition[0]].y
                )
            );
        }

        return _selectSymbolsComponents;
    }

    _createScoresBlock(lineIndex, scoresLine, x, y) {
        const _width = this._getScoresBlockWidth(scoresLine);

        const graphics = new Graphics();

        const propsForRectangle = {
            graphics: graphics,
            x: this.lineMainWidth / 2,
            y: this.lineMainWidth / 2,
            width: _width,
            height: this.scoresContainer.height,
            fillColor: 0x000000
        };

        this._createRectangle({
            ...propsForRectangle,
            lineWidth: this.lineBorderWidth,
            color: this.linesColors['border'][lineIndex]
        });
        this._createRectangle({
            ...propsForRectangle,
            lineWidth: this.lineMainWidth,
            color: this.linesColors['main'][lineIndex]
        });

        const baseTexture = this._getBaseTextureImageFromCanvas(graphics);
        this.textureForScores = new Texture(baseTexture);

        return this._getScoresBlockImage({
            key: `scores${lineIndex}`,
            x,
            y,
            width: this.scoresContainer.width,
            height: this.scoresContainer.height,
            scoresLine: scoresLine,
            visible: true
        });
    }

    _getScoresBlockImage({ key, x, y, width, height, visible, scoresLine }) {
        const _width = this._getScoresBlockWidth(scoresLine);
        return (
            <Container
                key={key}
                x={x + this.scoresContainer.x}
                y={y - height / 2}
                visible={visible}
            >
                <Sprite texture={this.textureForScores} x={-this.lineMainWidth / 2} />
                <Text key={`${key}Text`} {...this.scoresText} x={_width / 2} text={scoresLine} />
            </Container>
        );
    }

    _getScoresBlockWidth(scores) {
        const _scores = scores ? scores : 0;
        const countDigit = _scores.toString().length;
        return this.scoresContainer.width + countDigit * this.scoresContainer.width;
    }

    render() {
        return <Container visible={this.props.visible}>{this.selectSymbolsComponents}</Container>;
    }
}
