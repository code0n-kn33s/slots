import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-pixi-fiber';
import ImageOfNumbers from "src/slots/common/components/_updated/ImageOfNumbers";

export default class LinesNumber extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);

        const linesConfig = context.config.lines;

        const commonParams = {
            ...linesConfig.linesNumber.commonParams,
            mousedown: props.handleClick,
            touchstart: props.handleClick
        };

        this.positionLeft = {...commonParams, ...linesConfig.linesNumber.left};
        this.positionRight = {...commonParams, ...linesConfig.linesNumber.right};
    }

    render() {
        const {
            images,
            activeLinesCount
        } = this.props;
        return (
            <Container>
                <Container  {...this.positionLeft}>
                    <ImageOfNumbers images={images} value={activeLinesCount}/>
                </Container>
                <Container {...this.positionRight}>
                    <ImageOfNumbers images={images} value={activeLinesCount}/>
                </Container>
            </Container>

        );
    }
}
