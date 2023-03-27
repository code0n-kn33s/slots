import React from 'react';
import PropTypes from 'prop-types';
import {Container, Sprite, Text} from "react-pixi-fiber";

export default class Freespins extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.freespinsSettings = context.config.freespins;
    };

    render() {
        const {
            images,
            freespinsActiveCount
        } = this.props;

        const {
            meterPositionContainer,
            countText
        } = this.freespinsSettings;

        return <Container {...meterPositionContainer}>
             {/* <Sprite key="freespin_meter.png" texture={images['freespin_meter.png'].texture}/> */}
            {'nameText' in this.freespinsSettings ? <Text {...this.freespinsSettings.nameText}/> : null}
            <Text {...countText} text={freespinsActiveCount}/>
        </Container>
    }
}
