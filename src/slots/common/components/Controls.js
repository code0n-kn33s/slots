import React from 'react';
import PropTypes from 'prop-types';

import { Container, Sprite, Text } from "react-pixi-fiber";

import ControlsField from './ControlsField'
import ControlsButton from 'src/slots/common/components/ControlsButton'

export default class Controls extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);
        this.buttonsStyle = context.config.controls.buttons;
        this.textsStyle = context.config.controls.text;
    }

    callAction(buttonName) {
        const { actions, isButtonsDisabled} = this.props;
        if(isButtonsDisabled) {return}
        switch (buttonName) {
            case 'spin':  actions.controlsSpiningStart(); break;
            case 'coins':  actions.controlsToggleSelectCoins(); break;
            case 'lines':  actions.controlsToggleSelectLines(); break;
            case 'maxLines':  actions.controlsMaxLines(); break;
            case 'payout':  actions.controlsPayload(); break;
        }
    }

    getButton(nameButton, imageName) {
        const {images, isButtonsDisabled} = this.props;
        const callAction = this.callAction.bind(this, nameButton);
        return <ControlsButton
            key={nameButton}
            images={images}
            isButtonsDisabled={isButtonsDisabled}
            nameButton={imageName}
            buttonStyle={this.buttonsStyle[nameButton]}
            actionClick={callAction}
        />
    }

    getSlotMenuButtons() {
        return [
            this.getButton('coins', 'button_coins'),
            this.getButton('lines', 'button_lines'),
            this.getButton('maxLines', 'button_max_lines'),
            this.getButton('payout', 'button_payout'),
            this.getButton('spin', 'button_start')
        ]
    }

    render() {
        return <Container>
            <ControlsField name={'credits'}>
                <Text {...this.textsStyle.credits.name}/>
                <Text {...this.textsStyle.credits.value} text={this.props.credits}/>
            </ControlsField>
            <ControlsField name={'lines'}>
                {'name' in this.textsStyle.lines ? <Text {...this.textsStyle.lines.name}/> : null }
                <Text {...this.textsStyle.lines.value} text={this.props.lines}/>
            </ControlsField>
            <ControlsField name={'coins'}>
                {'name' in this.textsStyle.coins ? <Text {...this.textsStyle.coins.name}/> : null }
                <Text {...this.textsStyle.coins.value} text={this.props.coins}/>
            </ControlsField>
            <ControlsField name={'bet'}>
                <Text {...this.textsStyle.bet.name}/>
                <Text {...this.textsStyle.bet.value} text={this.props.bet}/>
            </ControlsField>
            <ControlsField name={'win'}>
                <Text {...this.textsStyle.win.name}/>
                <Text {...this.textsStyle.win.value} text={this.props.win}/>
            </ControlsField>

            { this.getSlotMenuButtons() }
        </Container>;
    }
}
