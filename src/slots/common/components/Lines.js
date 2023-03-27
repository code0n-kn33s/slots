import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-pixi-fiber';
import LinesContainer from "./LinesContainer";
import SelectSymbolsContainer from "./SelectSymbolsContainer";
import LinesNumber from "src/slots/common/components/LinesNumber";
const renderer = new PIXI.Renderer();

export default class Lines extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);

        const linesConfig = context.config.lines;

        this.position = new PIXI.Point(65, 90);

        if ('position' in linesConfig) {
            this.position.copyFrom(linesConfig.position);
        }

        this.isHaveLinesNumbers = false;
    }

    render() {
        const {
            images,
            serverSpinAnswerLines,
            serverSpinAnswerLinesLenght,
            indexActiveLine,
            lines,
            serverSpinAnswerScores,
            activeLinesCount,
            symbols,
            actions: {
                controlsChangeActiveLinesCount
            }
        } = this.props;
        return (
            <Container>
                <Container x={this.position.x} y={this.position.y}>
                    <LinesContainer
                        renderer={renderer}
                        activeLines={serverSpinAnswerLines}
                        linesLength={serverSpinAnswerLinesLenght}
                        indexActiveLine={indexActiveLine}
                        visibleLines={serverSpinAnswerLines}
                        lines={lines}
                    />

                    <SelectSymbolsContainer
                        renderer={renderer}
                        activeLines={serverSpinAnswerLines}
                        scoresLines={serverSpinAnswerScores}
                        addWin={0}
                        linesLength={serverSpinAnswerLinesLenght}
                        indexActiveLine={indexActiveLine}
                        reelSymbols={symbols}
                    />
                </Container>

                {
                    this.isHaveLinesNumbers ?
                        <LinesNumber
                            images={images}
                            activeLinesCount={activeLinesCount}
                            handleClick={controlsChangeActiveLinesCount}
                        /> : null
                }

            </Container>

        );
    }
}
