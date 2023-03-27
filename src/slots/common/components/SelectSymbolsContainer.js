import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-pixi-fiber';
import SelectSymbols from './SelectSymbols';

class SelectSymbolsContainer extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);
    }
    _squaresIsActive(lineNumber) {
        const { activeLines, indexActiveLine } = this.props;
        return (
            (activeLines.indexOf(lineNumber) >= 0 &&
                activeLines[indexActiveLine] === lineNumber) ||
            false
        );
    }

    _getScoresLine(lineNumber) {
        const { activeLines, indexActiveLine, scoresLines } = this.props;
        return activeLines[indexActiveLine] === lineNumber ? scoresLines[indexActiveLine] : 0;
    }

    _getLengthLine(lineNumber) {
        const props = this.props;
        return props.activeLines[props.indexActiveLine] === lineNumber
            ? props.linesLength[props.indexActiveLine]
            : 0;
    }

    _getComponentForSelectSymbols() {
        const {reelSymbols, isShowBonusFreegame, bonusReels, renderer, addWin} = this.props;

        const selectSymbols = [];
        for (let i = 1; i <= this.context.config.lines.total; i++) {
            selectSymbols.push(
                this._getSelectSymbols({
                    lineNumber: i,
                    lineLength: this._getLengthLine(i),
                    scoresLine: this._getScoresLine(i),
                    renderer,
                    visible: this._squaresIsActive(i),
                    reelSymbols,
                    isShowBonusFreegame,
                    bonusReels
                })
            );
        }

        return selectSymbols;
    }

    _getSelectSymbols(propsForSelectSymbols) {
        return (
            <SelectSymbols
                key={propsForSelectSymbols.lineNumber}
                {...propsForSelectSymbols}
            />
        );
    }

    render() {
        return (
            <Container>
                {this._getComponentForSelectSymbols()}
            </Container>
        );
    }
}

export default SelectSymbolsContainer;
