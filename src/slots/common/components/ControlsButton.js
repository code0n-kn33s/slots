import React from 'react';
import PropTypes from 'prop-types';

import { Container, Sprite } from "react-pixi-fiber";

export default class ControlsButton extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);
        this.buttonStyle = props.buttonStyle;
        this.handleMouseOver = this.mouseOver.bind(this);
        this.handleMouseOut = this.mouseOut.bind(this);
        this.handleMouseDown = this.mouseDown.bind(this);
        this.handleTouchStart = this.mouseDown.bind(this);
        this.handleMouseUp = this.mouseUp.bind(this);
        this.handleTouchUp = this.mouseUp.bind(this);
    }
    state = {
        buttonsState: 'default'
    };

    mouseOver() {
        this.setState({buttonsState: 'over'});
    }
    mouseOut() {
        this.setState({buttonsState: 'default'});
    }
    mouseDown() {
        this.props.actionClick();
        this.setState({buttonsState: 'clicked'});
    }
    mouseUp() {
        this.setState({buttonsState: 'default'});
    }

    getButtonTexture() {
        const {images, nameButton, isButtonsDisabled} = this.props;
        let typeButton = isButtonsDisabled ? 'disabled' : this.state.buttonsState;
        return images[`${nameButton}_${typeButton}.png`]
            ? images[`${nameButton}_${typeButton}.png`].texture
            : images[`${nameButton}_default.png`].texture
    }

    componentDidUpdate(prevProps) {
        const {isButtonsDisabled} = this.props;
        if(isButtonsDisabled !== prevProps.isButtonsDisabled) {
            this.setState({buttonsState: isButtonsDisabled ? 'disabled' : 'default'});
        }
    }

    render() {
        return <Container
            mouseover={this.handleMouseOver}
            mouseout={this.handleMouseOut}
            mousedown={this.handleMouseDown}
            mouseup={this.handleMouseUp}
            touchstart={this.handleTouchStart}
            touchup={this.handleTouchUp}
            {...this.buttonStyle.container}
        >
            <Sprite
                {...this.buttonStyle.image}
                texture={this.getButtonTexture()}
            />
        </Container>
    }
}
