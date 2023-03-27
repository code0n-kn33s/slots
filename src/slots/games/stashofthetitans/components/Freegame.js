import React from 'react';
import PropTypes from 'prop-types';
import {Container, Sprite, Text} from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import ScoresWin from "src/slots/common/components/ScoresWin";

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

    render() {
        const {images, freegame: {activePin}} = this.props;
        const activeItems = this.getAllActiveItems(activePin);

        let contentIntro = null;
        let content = <Container>
            <Sprite texture={images['freegame_bg.png'].texture} {...this.freegameSettings.container}/>
            <Text {...this.freegameSettings.countText} text={activeItems.length}/>
            {'nameText' in this.freegameSettings ? <Text {...this.freegameSettings.nameText}/> : null}

            {activeItems}

            {
                activePin && !this.state.playItemOutro ?
                    <AnimationJson
                        images={images}
                        x={this.freegameSettings.introItems[`item${activePin}`].x}
                        y={this.freegameSettings.introItems[`item${activePin}`].y}
                        handleOnComplete={this.handleOnCompleteItemIntro}
                        nameAnimation={`gen${activePin}_intro`}
                        typeAnimation={'default'}
                        removeOnComplete={false}
                    /> : null
            }
            {
                activePin && this.state.playItemOutro ?
                    <AnimationJson
                        images={images}
                        x={this.freegameSettings.outroItems[`item${activePin}`].x}
                        y={this.freegameSettings.outroItems[`item${activePin}`].y}
                        handleOnComplete={this.handleOnCompleteHit}
                        nameAnimation={`gen${activePin}_outro`}
                        typeAnimation={'default'}
                        removeOnComplete={true}
                    /> : null
            }
            {
                activePin && !this.state.playItemOutro ?
                    <AnimationJson
                        images={images}
                        x={this.freegameSettings.ladyLoop.x}
                        y={this.freegameSettings.ladyLoop.y}
                        nameAnimation={`lady_select`}
                        typeAnimation={'default'}
                        interactive={false}
                    /> : null
            }
            {
                !activePin || (activePin && this.state.playItemOutro) ?
                    <AnimationJson
                        images={images}
                        x={this.freegameSettings.ladySelect.x}
                        y={this.freegameSettings.ladySelect.y}
                        nameAnimation={`lady_loop`}
                        typeAnimation={'default'}
                        interactive={false}
                    /> : null
            }

            <ScoresWin images={images} activeScores={this.props.freegame.activeScores}/>
        </Container>;

        if (this.state.playIntro) {
            content = null;
            contentIntro = <Container>
                <AnimationJson
                    images={images}
                    x={this.freegameSettings.intro.x}
                    y={this.freegameSettings.intro.y}
                    nameAnimation={`intro`}
                    typeAnimation={'default'}
                />
            </Container>;

            setTimeout(() => {
                this.handleOnCompleteIntro();
            }, 1500);

            setTimeout(() => {
                this.state.playIntro = false
            }, 1500);
        }

        return <Container>
            {content}
            {contentIntro}
        </Container>;
    }
}