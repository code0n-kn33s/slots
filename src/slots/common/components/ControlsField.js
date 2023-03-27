import React from 'react';
import PropTypes from 'prop-types';
import {Container} from "react-pixi-fiber";
import Rectangle from "./Rectangle";

export default class ControlsField extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);
        this.params = context.config.controls.text[props.name]
    }

    render() {
        return this.props.name ? <Container {...this.params.container}>
            {'bg' in this.params ? <Rectangle {...this.params.bg}/> : null}
            {this.props.children}
        </Container> : null
    }
}