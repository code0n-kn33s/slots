import React from 'react';
import PropTypes from 'prop-types';
import CommonLine from './Line';

class LinesContainer extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);
    }
    _lineIsActive(lineNumber) {
        const { areLinesActive, activeLines, indexActiveLine, selectedLineIndex, visibleLines } = this.props;
        return (
            areLinesActive ||
            activeLines[indexActiveLine] === lineNumber ||
            selectedLineIndex === lineNumber - 1
        );
    }

    _createLines() {
        const lineSettings = this.context.config.lines;

        const linesTotalCount = lineSettings.total;

        const { lines, areLinesActive, visibleLines } = this.props;

        const activeLinesCount = lines || linesTotalCount;
        const linesList = [];

        for (let i = 1; i <= activeLinesCount; i++) {
            linesList.push(this._getLine(i, (activeLinesCount >= i && visibleLines.includes(i))));
        }
        return linesList;
    }

    _getLine(lineNumber, visible) {
        const { renderer, bonusReels } = this.props;
        return (
            <CommonLine
                key={lineNumber}
                renderer={renderer}
                lineNumber={lineNumber}
                visible={visible}
                bonusReels={bonusReels}
                lineIsActive={this._lineIsActive(lineNumber)}
                lineLength={this._getLineLength(lineNumber)}
                roundSide={null}
            />
        );
    }

    _getLineLength(indexLine) {
        const { activeLines, linesLength } = this.props;
        const indexLineLength = activeLines.indexOf(indexLine);
        return indexLineLength !== -1 ? linesLength[indexLineLength] : 0;
    }

    render() {
        return this._createLines();
    }
}

export default LinesContainer;
