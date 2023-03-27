import React from 'react';
import PropTypes from 'prop-types';
import {Sprite, Container, Text} from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import AnimationBezier from "src/slots/common/components/AnimationBezier";
import { random } from "lodash";

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.freegameSettings = context.config.freegame;
        this.handleClickOnItem = this.clickOnItem.bind(this);
        this.handleOnCompleteItemAnimation = this.onCompleteItemAnimation.bind(this);
        this.handleOnCompleteBunnyAnimation = this.onCompleteBunnyAnimation.bind(this);
        this.handleOnCompleteSnowballAnimation = this.onCompleteSnowballAnimation.bind(this);

        this.state = {
            personId: 0,
            rotation: 0,
            isShowAnimationPickAnObject: false,
            isStartSnowBall: false,
            bunny: {
                nameAnimation: 'bunnyIntro',
                animation: 'default'
            },
            itemsList: {...this.getDefaultItemList()}
        }
    };

    getDefaultItemList() {
        let itemList = {};
        for(let i = 1; i <= 12; i++) {
            itemList[i] = {
                isActive: true,
                nameAnimation: 'window',
                animation: 'default',
                scores: 0
            }
        }
        return itemList;
    }

    clickOnItem(pinID) {
        const { isCanPickOnItem } = this.props.freegame;
        if(isCanPickOnItem) {
            this.props.actions.freegameClickOnPin({ pinID });
            this.props.actions.slotPlaySound({soundName: 'window_select.mp3'});
        }
    }
    onCompleteItemAnimation(typeAnimation) {
        switch (typeAnimation) {
            case 'openWindow': this.showPersonInWindow(); break;
            case 'intro':
                this.throwBunny();
                this.startSnowBall();
                break;
            case 'smack':
                this.loopPersonInWindow();
                this.onCompleteHit();
                break;
        }
    }
    onCompleteBunnyAnimation(typeAnimation) {
        switch (typeAnimation) {
            case 'default': this.showBunnyDefault(); break;
            case 'whistle':
                this.showBunnyDefault();
                this.openWindow();
                break;
            case 'throw':
                this.showBunnyDefault();
                break;
            case 'reload':  break;
        }
    }
    onCompleteSnowballAnimation() {
        this.stopSnowBall();
        this.smackPersonInWindow();
    }

    whistleBunny() {
        this.props.actions.slotPlaySound({soundName: 'bunny_whistle.mp3'});
        this.setState({
            bunny: {
                ...this.state.bunny,
                animation: 'whistle'
            }
        });
    }
    throwBunny() {
        this.props.actions.slotPlaySound({soundName: 'bunny_throw.mp3'});
        this.setState({
            bunny: {
                ...this.state.bunny,
                animation: 'throw'
            }
        });
    }

    showBunnyDefault() {
        if(this.state.bunny.nameAnimation === 'bunnyIntro') {
            this.setState({
                bunny: {
                    ...this.state.bunny,
                    nameAnimation: 'bunny'
                }
            });
        }
        this.setState({
            bunny: {
                ...this.state.bunny,
                animation: 'default'
            }
        });
    }

    startSnowBall() {
        setTimeout(() => {
            this.setState({
                isStartSnowBall: true
            });
        }, 500);
    }
    stopSnowBall() {
        this.setState({
            isStartSnowBall: false
        });
    }

    onCompleteHit() {
        this.props.actions.freegameHitOnComplete();
    }

    getItem(itemID) {
        const {images} = this.props;
        const { scores, animation, nameAnimation } = this.state.itemsList[itemID];
        const configParams = this.freegameSettings.items[itemID - 1];
        const itemsScores = this.freegameSettings.itemsScores;

        return (
            <Container key={`item${itemID}${nameAnimation}`}>
                <AnimationJson
                    {...configParams}
                    idForClickHandler={itemID}
                    clickHandler={this.handleClickOnItem}
                    images={images}
                    nameAnimation={nameAnimation}
                    typeAnimation={animation}
                    handleOnComplete={this.handleOnCompleteItemAnimation}
                />
                {scores > 0 ?
                    <Text
                        {...itemsScores}
                        x={configParams.x + itemsScores.x}
                        y={configParams.y + itemsScores.y}
                        text={scores}
                    />
                    : null}
            </Container>
        )
    }
    getAllItems() {
        const itemsList = [];

        for (let item in this.state.itemsList) {
            itemsList.push(this.getItem(item));
        }
        return itemsList;
    }

    openWindow() {
        const { activePin } = this.props.freegame;
        const { itemsList } = this.state;
        itemsList[activePin].isActive = false;
        itemsList[activePin].animation = 'openWindow';
        this.setState({itemsList});
    }

    showPersonInWindow() {
        const { activePin } = this.props.freegame;
        const { itemsList } = this.state;
        const personId = random(1, 5);
        itemsList[activePin].nameAnimation = `person${personId}`;
        itemsList[activePin].animation = 'intro';
        this.props.actions.slotPlaySound({soundName: 'find_intro.mp3'});
        this.setState({
            personId,
            itemsList
        });
    }
    smackPersonInWindow() {
        const { activePin } = this.props.freegame;
        const { itemsList } = this.state;
        itemsList[activePin].animation = 'smack';
        this.props.actions.slotPlaySound({soundName: 'people_smack.mp3'});
        this.setState({
            itemsList
        });
    }
    loopPersonInWindow() {
        const { activePin, activeScores } = this.props.freegame;
        const { itemsList, personId } = this.state;
        itemsList[activePin].animation = 'endLoop';
        itemsList[activePin].scores = activeScores[activeScores.length - 1];
        this.props.actions.slotPlaySound({soundName: `people${personId}_end.mp3`});
        this.setState({itemsList});
    }

    getBunnyAnimation() {
        const {images} = this.props;
        const {
            personId,
            bunny: {
                animation,
                nameAnimation
            }}
            = this.state;
        let configParams = this.freegameSettings.bunny;
        if(nameAnimation === "bunnyIntro") {
            configParams = this.freegameSettings.bunnyIntro
        }
        return (
            <AnimationJson
                {...configParams}
                key={`bunny${personId}${nameAnimation}`}
                images={images}
                nameAnimation={nameAnimation}
                typeAnimation={animation}
                handleOnComplete={this.handleOnCompleteBunnyAnimation}
            />
        )
    }

    startAnimationTextPickAnObject() {
        this.setState({isShowAnimationPickAnObject: true});
        setTimeout(() => {
            this.setState({isShowAnimationPickAnObject: false});
        }, 2000);
    }


    componentDidUpdate(prevProps) {
        const { activePin, isCanPickOnItem } = this.props.freegame;
        if(activePin && activePin !== prevProps.freegame.activePin) {
            this.whistleBunny();
        }
        if (isCanPickOnItem && prevProps.freegame.isCanPickOnItem !== isCanPickOnItem) {
            this.startAnimationTextPickAnObject();
        }
    }
    componentDidMount() {
        this.props.actions.slotPlaySound({soundName: 'bonus_music.mp3'});
        this.props.actions.slotPlaySound({soundName: 'bunny_intro.mp3'});
        this.startAnimationTextPickAnObject();
    }

    render() {
        const {
            images,
            freegame: {
                activePin,
                maxBonusGameSteps,
                openedObjectsCount
            }
        } = this.props;

        const {isStartSnowBall, isShowAnimationPickAnObject} = this.state;

        const {
            container,
            snowballDefaultPosition,
            snowBallScalingParams,
            textPickAnObject,
            snowballBezier,
            textPicksLeft,
            textPicksLeftCount
        } = this.freegameSettings;

        return <Container>
            <Sprite texture={images['freegame_bg.png'].texture} {...container}/>

            { this.getAllItems() }

            {isStartSnowBall ?
                <AnimationBezier
                    imageTexture={images['snowball.png'].texture}
                    defaultPosition={snowballDefaultPosition}
                    scalingParams={snowBallScalingParams}
                    bezierValue={snowballBezier[activePin - 1]}
                    isStartAnimation={isStartSnowBall}
                    handleOnComplete={this.handleOnCompleteSnowballAnimation}
                /> : null
            }


            { this.getBunnyAnimation() }

            {isShowAnimationPickAnObject ? <Sprite texture={images['Text_Pick_an_Object.png'].texture} {...textPickAnObject}/> : null}

            <Text {...textPicksLeft}/>
            <Text
                {...textPicksLeftCount}
                text={maxBonusGameSteps - openedObjectsCount}
            />
        </Container>;
    }
}
