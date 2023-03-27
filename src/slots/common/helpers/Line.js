import { checkIntersection } from '../helpers';

const winSymbolsForMiddleLineCount = 3;
const intersectionPointsSymbolCount = 2;

export default class Line {
    constructor(params, settings, getContainerCoordinates) {
        const winLinesMapSymbols = window.SLOT_CONFIG.lines.winLinesMapSymbols;
        const linesSettings = settings.lines;

        this.pointValueIndex = params.pointValueIndex;
        Line.getContainerCoordinates = getContainerCoordinates;

        this.lineNumber = params.lineNumber;
        this.winLineMap = winLinesMapSymbols[params.lineNumber];
        this.reelSettings = settings.reel;
        this.linePoints = linesSettings.linesPoints[this.lineNumber - 1];

        this.linesWinSymbols = this.getWinSymbolsLines();
        this.winLinePoints = this.linePoints;
        this.intersectionPoints = this.getIntersectionPointsLineWinSymbols();
    }

    getPointsFullLine() {
        return this.linePoints;
    }

    getPointsWinLine() {
        let intersectionPoints = this.unitePoints(this.winLinePoints, this.intersectionPoints);

        intersectionPoints.sort(this.sortPointsByX);
        intersectionPoints.sort(this.sortPointsByYInOneColumn(intersectionPoints));

        return intersectionPoints;
    }

    getWinSymbolsLines() {
        const linesWinSymbols = [];
        const linesContainerCoordinates = Line.getContainerCoordinates();

        for (let i = 0; i < this.winLineMap.length; i++) {
            let posWinSymbol = this.winLineMap[i];
            let topLeftPoint = [
                linesContainerCoordinates.x +
                    (this.reelSettings.cellDimensions.width +
                        this.reelSettings.cellDimensions.offsetX) *
                        i,
                linesContainerCoordinates.y +
                    (this.reelSettings.cellDimensions.height +
                        this.reelSettings.cellDimensions.offsetY) *
                        posWinSymbol
            ];
            let topRightPoint = [
                topLeftPoint[0] + this.reelSettings.cellDimensions.width,
                topLeftPoint[1]
            ];
            let bottomLeftPoint = [
                topLeftPoint[0],
                topLeftPoint[1] + this.reelSettings.cellDimensions.height
            ];

            let bottomRightPoint = [
                topLeftPoint[0] + this.reelSettings.cellDimensions.width,
                topLeftPoint[1] + this.reelSettings.cellDimensions.height
            ];

            linesWinSymbols.push({
                top: [topLeftPoint, topRightPoint],
                right: [topRightPoint, bottomRightPoint],
                bottom: [bottomLeftPoint, bottomRightPoint],
                left: [topLeftPoint, bottomLeftPoint]
            });
        }

        return linesWinSymbols;
    }

    getIntersectionPointsLineWinSymbols() {
        let intersectionPoints = [];
        this.linesWinSymbols.map((linesSymbol, symbolIndex) => {
            let points = [];

            for (let j = 1; j < this.winLinePoints.length; j++) {
                let segment = [this.winLinePoints[j - 1], this.winLinePoints[j]];
                let sideNames = Object.keys(linesSymbol);

                sideNames.forEach(sideName => {
                    let lineSymbol = linesSymbol[sideName];
                    let intersectionPoint = checkIntersection(...segment, ...lineSymbol);

                    if (intersectionPoint.length) {
                        intersectionPoint[this.pointValueIndex.type] = 'intersection';
                        intersectionPoint[this.pointValueIndex.symbolIndex] = symbolIndex;
                        points.push(intersectionPoint);
                    }
                });
            }

            if (points.length) {
                points.sort(this.sortPointsByX);

                if (points.length > intersectionPointsSymbolCount) {
                    points = this.getExtremePoints(points);
                }

                points = this.getUniqPoints(points);
                this.identifySideIntersectionPoints(points);
                intersectionPoints = intersectionPoints.concat(points);
            } else if (process.env.NODE_ENV === 'development') {
                console.log(
                    `Warning: No intersection point with ${symbolIndex +
                        1} symbols was found at line ${this.lineNumber}`
                );
            }
        });

        return intersectionPoints;
    }

    sortPointsByX = (a, b) => {
        const { xPosition } = this.pointValueIndex;
        if (a[xPosition] > b[xPosition]) return 1;
        if (a[xPosition] < b[xPosition]) return -1;
        return 0;
    };

    sortPointsByYInOneColumn = points => (a, b) => {
        const { xPosition, yPosition } = this.pointValueIndex;

        if (a[xPosition] === b[xPosition]) {
            const direction = this.determineDirectionSortByY(points, a[xPosition]);
            const descending = direction > 0;
            const ascending = direction < 0;

            if (descending) {
                if (a[yPosition] > b[yPosition]) return 1;
                if (a[yPosition] < b[yPosition]) return -1;
            } else if (ascending) {
                if (a[yPosition] > b[yPosition]) return -1;
                if (a[yPosition] < b[yPosition]) return 1;
            }
        }

        return 0;
    };

    determineDirectionSortByY(points, x) {
        const { xPosition, yPosition } = this.pointValueIndex;
        const index = points.findIndex(point => point[xPosition] === x);
        const prevPoint = points[index - 1];

        if (prevPoint && prevPoint[yPosition] !== points[index][yPosition]) {
            return prevPoint[yPosition] < points[index][yPosition] ? 1 : -1;
        } else if (prevPoint) {
            return prevPoint[yPosition] < points[index + 1][yPosition] ? 1 : -1;
        } else {
            const count = points.filter(point => point[xPosition] === x).length;
            const nextPoint = points[index + count + 1];
            return nextPoint[yPosition] > nextPoint[index][yPosition] ? 1 : -1;
        }
    }

    getUniqPoints(points) {
        const { xPosition, yPosition } = this.pointValueIndex;
        return points.filter(
            (point, i) =>
                points.findIndex(
                    item =>
                        item[xPosition] === point[xPosition] && item[yPosition] === point[yPosition]
                ) === i
        );
    }

    getExtremePoints(points) {
        return [points[0], points[points.length - 1]];
    }

    unitePoints() {
        const argumentsCount = arguments.length;
        const lastArgumentIndex = argumentsCount - 1;
        const beforeLastArgumentIndex = argumentsCount - 2;

        let points = [].concat(arguments[lastArgumentIndex]);

        for (let i = beforeLastArgumentIndex; i >= 0; i--) {
            points = points.concat(arguments[i]);
            points = this.getUniqPoints(points);
        }
        return points;
    }

    identifySideIntersectionPoints(points) {
        const { symbolIndex, intersectionSide, xPosition, yPosition } = this.pointValueIndex;

        if (points.length === intersectionPointsSymbolCount) {
            points[xPosition][intersectionSide] = 'left';
            points[yPosition][intersectionSide] = 'right';
        } else {
            if (points[xPosition][symbolIndex] === 0) {
                points[xPosition][intersectionSide] = 'right';
            } else if (points[xPosition][symbolIndex] === this.linesWinSymbols.length - 1) {
                points[xPosition][intersectionSide] = 'left';
            }
        }
    }

    getMapWinSymbols(props) {
        if (props.bonusReels && props.bonusReels.length) {
            const bonusReels = props.bonusReels;
            return this.winLineMap.map((item, i) => (bonusReels.indexOf(i) !== -1 ? 1 : 0));
        }

        if (!isNaN(props.lineLength)) {
            const lineLength = Math.abs(props.lineLength);
            const mapWinSymbols = this.winLineMap.map((item, i) => (i < lineLength ? 1 : 0));

            if (props.lineLength < 0) {
                mapWinSymbols.reverse();
            }

            return mapWinSymbols;
        } else {
            const symbolsSkipStartcount =
                (this.winLineMap.length - winSymbolsForMiddleLineCount) / 2;
            let winSymbolsCount = 0;
            return this.winLineMap.map((item, i) => {
                if (i >= symbolsSkipStartcount && winSymbolsCount < winSymbolsForMiddleLineCount) {
                    winSymbolsCount += 1;
                    return 1;
                }

                return 0;
            });
        }
    }
}
