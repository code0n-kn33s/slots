import React from 'react';
import PropTypes from 'prop-types';
import {Container, Sprite, Text} from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import ScoresWin from "src/slots/common/components/ScoresWin";

const SwingState = {
    Idle: 'SwingState.Idle',
    Left: 'SwingState.Left',
    Middle: 'SwingState.Middle',
    Right: 'SwingState.Right'
};

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            swingState: SwingState.Idle,
            swingPlaying: true
        };

        this.freegameSettings = context.config.freegame;

        this.handleClickOnItem = this.clickOnItem.bind(this);
        this.handleOnCompleteHit = this.onCompleteHit.bind(this);
    }

    renderPickCounter(count) {
        return <Container>
            <Text {...this.freegameSettings.countText} text={count}/>
            {'nameText' in this.freegameSettings ? <Text {...this.freegameSettings.nameText}/> : null}
        </Container>;
    }

    renderScore() {
        const {images} = this.props;

        return <ScoresWin images={images} activeScores={this.props.freegame.activeScores}/>;
    }

    getSwingAnimationNameByState(swingState) {
        if (swingState === SwingState.Idle) {
            return 'swing_idle';

        } else if (swingState === SwingState.Left) {
            return 'swing_left';

        } else if (swingState === SwingState.Middle) {
            return 'swing_middle';

        } else if (swingState === SwingState.Right) {
            return 'swing_right';
        }

        return undefined;
    }

    renderSwing() {
        const {images} = this.props;

        const swingState = this.state.swingState;
        const swingPlaying = this.state.swingPlaying;

        const animationConfig = this.freegameSettings.swing;

        const content =
            <AnimationJson
                {...animationConfig}
                anchor={{x: 0.5, y: 0.5}}
                clickHandler={this.handleClickOnItem}
                images={images}
                nameAnimation={this.getSwingAnimationNameByState(swingState)}
                typeAnimation={'default'}
                playing={swingPlaying}
                removeOnComplete={false}
            />;

        return content;
    }

    renderGophers(activePin) {
        const {images, freegame: {availableItems}} = this.props;

        const animationConfigKeys = Object.keys(this.freegameSettings.gophers);
        const gophers = [];

        for (let key of animationConfigKeys) {
            const start = ('gopher').length;
            const end = key.length - start;

            const gopherId = parseInt(key.substr(start, end));
            const gopher = availableItems[gopherId];

            const animationConfig = this.freegameSettings.gophers[key];

            const gopherKey = `gopher${gopherId}`;

            gophers.push(
                <AnimationJson
                    {...animationConfig}
                    key={gopherKey}
                    idForClickHandler={gopherId}
                    clickHandler={this.handleClickOnItem}
                    images={images}
                    nameAnimation={'gopher'}
                    typeAnimation={'default'}
                    playing={false}
                    interactive={!this.props.freegame.activePin}
                />
            );
        }

        return gophers;
    }

    clickOnItem(pinID) {
        this.props.actions.freegameClickOnPin({pinID});
    }

    onCompleteHit() {
        this.props.actions.freegameHitOnComplete();
    }

    render() {
        const {images, freegame: {activePin}} = this.props;
        const gophers = this.renderGophers(activePin);

        return <Container>
            <Sprite texture={images['freegame_bg.jpg'].texture} {...this.freegameSettings.container}/>

            {gophers}

            {this.renderPickCounter(gophers.length)}

            {this.renderScore()}
            {this.renderSwing()}
        </Container>;
    }
}