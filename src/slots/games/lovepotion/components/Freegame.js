import React from 'react';
import PropTypes from 'prop-types';
import {Container, Sprite, Text} from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import ScoresWin from "src/slots/common/components/ScoresWin";
import SoundController from "src/slots/common/soundController";

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            playIntro: true,
            playItemOutro: false
        };

        this.freegameSettings = context.config.freegame;

        this.handleClickOnItem = this.clickOnItem.bind(this);
        this.handleOnCompleteHit = this.onCompleteHit.bind(this);
        this.handleOnCompleteIntro = this.onCompleteIntro.bind(this);
        this.handleOnCompleteItemIntro = this.onCompleteItemIntro.bind(this);

        const {images} = props;

        this.introAnimation = <Container>
            <AnimationJson
                images={images}
                x={this.freegameSettings.intro.x}
                y={this.freegameSettings.intro.y}
                nameAnimation={`intro`}
                typeAnimation={'default'}
                handleOnComplete={() => {
                    SoundController.instance.playSound(`bonus_music_manual.mp3`);
                    this.handleOnCompleteIntro()
                }}
            />
        </Container>;

        this.ladySelectAnimation = <AnimationJson
            images={images}
            x={this.freegameSettings.ladyLoop.x}
            y={this.freegameSettings.ladyLoop.y}
            nameAnimation={`lady_select`}
            typeAnimation={'default'}
            interactive={false}
        />;

        this.ladyLoopAnimation =
            <AnimationJson
                images={images}
                x={this.freegameSettings.ladySelect.x}
                y={this.freegameSettings.ladySelect.y}
                nameAnimation={`lady_loop`}
                typeAnimation={'default'}
                interactive={false}
            />;
    }

    getAllActiveItems(activePin) {
        const {images, freegame: {availableItems}} = this.props;

        const animationConfigKeys = Object.keys(this.freegameSettings.introItems);
        const activeItems = [];

        for (let key of animationConfigKeys) {
            const start = ('item').length;
            const end = key.length - start;

            const itemId = parseInt(key.substr(start, end));
            const item = availableItems[itemId];

            if (item.isActive && itemId !== activePin) {
                const itemName = `item${itemId}`;

                const animationType = availableItems[itemId].animation;
                const animationConfig = this.freegameSettings.introItems[key];

                activeItems.push(
                    <AnimationJson
                        {...animationConfig}
                        key={itemName}
                        idForClickHandler={itemId}
                        clickHandler={this.handleClickOnItem}
                        images={images}
                        nameAnimation={`gen${itemId}_intro`}
                        typeAnimation={animationType}
                        playing={false}
                        interactive={!this.props.freegame.activePin}
                    />
                );
            }
        }

        return activeItems;
    }

    clickOnItem(pinID) {
        this.props.actions.freegameClickOnPin({pinID});
    }

    onCompleteIntro() {
        this.setState({playIntro: false});
    }

    onCompleteItemIntro() {
        this.setState({playItemOutro: true});
    }

    onCompleteHit() {
        this.setState({playItemOutro: false});

        this.props.actions.freegameHitOnComplete();
    }

    hasActiveItemIntro() {
        return this.props.freegame.activePin && !this.state.playItemOutro
    }

    renderActiveItemIntro() {
        const {images, freegame: {activePin}} = this.props;

        return <AnimationJson
            images={images}
            x={this.freegameSettings.introItems[`item${activePin}`].x}
            y={this.freegameSettings.introItems[`item${activePin}`].y}
            handleOnComplete={this.handleOnCompleteItemIntro}
            nameAnimation={`gen${activePin}_intro`}
            typeAnimation={'default'}
            removeOnComplete={false}
        />
    }

    hasActiveItemOutro() {
        return this.props.freegame.activePin && this.state.playItemOutro
    }

    renderActiveItemOutro() {
        const {images, freegame: {activePin}} = this.props;

        setTimeout(() => {
            SoundController.instance.playSound(`gent_select_outro.mp3`);
        }, 750);

        return <AnimationJson
            images={images}
            x={this.freegameSettings.outroItems[`item${activePin}`].x}
            y={this.freegameSettings.outroItems[`item${activePin}`].y}
            handleOnComplete={this.handleOnCompleteHit}
            nameAnimation={`gen${activePin}_outro`}
            typeAnimation={'default'}
            removeOnComplete={true}
        />
    }

    hasLadySelect() {
        return this.props.freegame.activePin && !this.state.playItemOutro
    }

    renderLadySelect() {
        return this.ladySelectAnimation;
    }

    hasLadyLoop() {
        return !this.props.freegame.activePin || (this.props.freegame.activePin && this.state.playItemOutro)
    }

    renderLadyLoop() {
        return this.ladyLoopAnimation;
    }

    renderPickCount(value) {
        return <Text {...this.freegameSettings.countText} text={value}/>
    }

    renderPickText() {
        return 'nameText' in this.freegameSettings ? <Text {...this.freegameSettings.nameText}/> : null
    }

    hasIntro() {
        return this.state.playIntro;
    }

    renderIntro() {
        setTimeout(() => {
            SoundController.instance.playSound(`bonus_intro.mp3`);
        }, 1000);

        return this.introAnimation;
    }

    render() {
        const {images, freegame: {activePin, winScoresList, openedObjectsCount}} = this.props;
        const activeItems = this.getAllActiveItems(activePin);

        let contentIntro = null;
        let content = <Container>
            <Sprite texture={images['freegame_bg.png'].texture} {...this.freegameSettings.container}/>

            {this.renderPickCount(winScoresList.length - openedObjectsCount)}
            {this.renderPickText()}

            {activeItems}

            {this.hasActiveItemIntro() ? this.renderActiveItemIntro() : null}
            {this.hasActiveItemOutro() ? this.renderActiveItemOutro() : null}
            {this.hasLadySelect() ? this.renderLadySelect() : null}
            {this.hasLadyLoop() ? this.renderLadyLoop() : null}

            <ScoresWin images={images} activeScores={this.props.freegame.activeScores}/>
        </Container>;

        if (this.hasIntro()) {
            contentIntro = this.renderIntro();
        }

        return <Container>
            {content}
            {contentIntro}
        </Container>;
    }
}