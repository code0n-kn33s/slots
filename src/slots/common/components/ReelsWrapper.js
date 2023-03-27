import React from 'react';
import PropTypes from 'prop-types';
import {Container} from "react-pixi-fiber";
import ReelContainer from "./ReelContainer";

export default class ReelsWrapper extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);
    }
    render() {
        const {
            cell : {
                width
            },
            reel: {
                offsetX,
                container,
                colors: {
                    common,
                    freegame
                }
            }
        } = this.context.config;
        const { rotating, serverSpinAnswerSymbols, images, freespinsIsActive } = this.props;
        const commonParams = {
            images,
            reelFillColor: freespinsIsActive ? freegame : common
        };
        return (
            <Container {...container}>
                <ReelContainer x={0} rotating={rotating[0]} symbolsFromServer={serverSpinAnswerSymbols[0]} {...commonParams}/>
                <ReelContainer x={width + offsetX} rotating={rotating[1]} symbolsFromServer={serverSpinAnswerSymbols[1]} {...commonParams}/>
                <ReelContainer x={width * 2 + offsetX * 2} rotating={rotating[2]} symbolsFromServer={serverSpinAnswerSymbols[2]} {...commonParams}/>
                <ReelContainer x={width * 3 + offsetX * 3} rotating={rotating[3]} symbolsFromServer={serverSpinAnswerSymbols[3]} {...commonParams}/>
                <ReelContainer x={width * 4 + offsetX * 4} rotating={rotating[4]} symbolsFromServer={serverSpinAnswerSymbols[4]} {...commonParams}/>
            </Container>
        )
    }
}