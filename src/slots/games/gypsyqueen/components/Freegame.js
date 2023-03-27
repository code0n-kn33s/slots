import React from 'react';
import PropTypes from 'prop-types';
import { random } from 'lodash';
import { Sprite, Container, Text } from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import SoundController from "src/slots/common/soundController";
import AnimationBezier from "src/slots/common/components/AnimationBezier";

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            girlAnimation: 'girl_loop',
            cardsAnimation: {
                1: 'card1Loop',
                2: 'card2Loop',
                3: 'card3Loop',
                4: 'card4Loop',
                5: 'card5Loop',
                6: 'card6Loop'
            },
            cardAnimationName: null,
            scoreAnimationPin: null,
            clickCounter: 0,
            canClick: true
        };
        this.cards = [
            "fortuneDirection",
            "fortuneFortune",
            "fortuneLovers",
            "fortuneMoon",
            "fortuneStar",
            "fortuneSun"
        ];
        this.freegameSettings = context.config.freegame;
        this.handleOnCompleteHit = this.onCompleteHit.bind(this);
    };

    getItem(itemID) {
        const itemName = `item${itemID}`;
        const {
            images,
            freegame: { availableItems }
        } = this.props;
        if (!availableItems[itemID].isActive) {
            return null;
        }
        const nameAnimation = this.state.cardsAnimation[itemID];
        const {
            selectedItems,
            items
        } = this.freegameSettings;
        const position = nameAnimation === `card${itemID}_select` ? selectedItems[itemName] : items[itemName];
        const configParams = {
            ...position,
            key: `${itemName}_card_${nameAnimation}`,
            images: images,
            cursor: 'pointer',
            nameAnimation,
            typeAnimation: 'default',
            clickHandler: () => this.clickOnItem(itemID),
            handleOnComplete: () => this.oCompleteClickItemAnimation(itemID)
        };
        return <AnimationJson {...configParams}/>

    }

    oCompleteClickItemAnimation(itemId) {
        switch (this.state.cardsAnimation[itemId]) {
            case `card${itemId}Click`:
                this.setState({
                    cardsAnimation: {
                        ...this.state.cardsAnimation,
                        [itemId]: `card${itemId}_select`
                    }
                })
                break;
            case `card${itemId}_select`:
                this.setState({
                    cardsAnimation: {
                        ...this.state.cardsAnimation,
                        [itemId]: null
                    }
                })
                this.onCompleteHit();
                // todo start show card animation
                break;
        }

        if (this.state.cardsAnimation[itemId] === `card${itemId}Click`) {
            this.setState({
                cardsAnimation: {
                    ...this.state.cardsAnimation,
                    [itemId]: `card${itemId}_select`
                }
            })
        }
    }

    getAllActiveItems() {
        const { availableItems } = this.props.freegame;
        const itemsList = [];
        let items = [];
        for (let item in availableItems) {
            items.push({...availableItems[item], itemIndex: item})
        }
        items = items.sort((i1, i2) => i1.animation > i2.animation ? 1 : -1)
        for (let item of items) {
            itemsList.push(this.getItem(item.itemIndex));
        }
        return itemsList;
    }

    clickOnItem(pinID) {
        if (!this.state.canClick) return;
        this.setState({
            canClick: false,
            girlAnimation: 'girl_select',
            clickCounter: this.state.clickCounter + 1,
            cardsAnimation: {
                ...this.state.cardsAnimation,
                [pinID]: `card${pinID}Click`
            }
        });
        SoundController.instance.playSound('card_anim.mp3');
        this.props.actions.freegameClickOnPin({pinID});
        const { cardAnimationTimeout } = this.freegameSettings;
        setTimeout(() => {
            const index = random(this.cards.length - 1);
            this.setState({
                cardAnimationName: this.cards.splice(index, 1)[0]
            })
        }, cardAnimationTimeout)
        setTimeout( () => {
            this.setState({ scoreAnimationPin: pinID })
        }, cardAnimationTimeout + 2500)
    }
    onCompleteHit() {
        this.props.actions.freegameHitOnComplete();
    }

    onCompleteGirlAnimation() {
        if (this.state.girlAnimation === 'girl_select'){
            this.setState({ girlAnimation: 'girl_loop' })
        }
    }

    onCompleteCardAnimation() {
        // todo show coins
        const {
            showScoreTimeout
        } = this.freegameSettings;
        setTimeout(() => {
            this.setState({
                cardAnimationName: null,
                scoreAnimationPin: null,
                canClick: true
            })
        }, showScoreTimeout)
    }

    render() {
        let {
            images,
            freegame: { activeScores }
        } = this.props;
        // activeScores = {1:{value: 10}, 2:{value: 200}, 3:{value: 300}, 4:{value: 400}, 5:{value: 500}, 6:{value: 4000}}
        const {
            container,
            banner,
            girl,
            cardAnimationPosition,
            scores,
            bannerBezier
        } = this.freegameSettings;
        const {
            girlAnimation,
            cardAnimationName,
            scoreAnimationPin,
            clickCounter
        } = this.state;
        return <Container>
            <Sprite texture={images['freegame_bg.png'].texture} {...container}/>
            {/*<Sprite texture={images['banner.png'].texture} {...banner}/>*/}
            <AnimationBezier defaultPosition={banner}
                             imageTexture={images['banner_fortune.png'].texture}
                             bezierValue={bannerBezier}
                             // bezierType={'cubic'}
                             duration={5}
            />

            <AnimationJson {...girl} images={images} nameAnimation={girlAnimation} key={girlAnimation}
                           handleOnComplete={() => this.onCompleteGirlAnimation()}/>

            { this.getAllActiveItems() }
            { cardAnimationName ?
                <AnimationJson {...cardAnimationPosition} nameAnimation={cardAnimationName}
                               images={images} key={cardAnimationName + "key"}
                               handleOnComplete={() => this.onCompleteCardAnimation()} />
                : null
            }
            { scoreAnimationPin ?
                <Container>
                    {/*пробелы для выравнивания текста по центру*/}
                    <Text text={'         \n' +
                                (activeScores[scoreAnimationPin] ? activeScores[scoreAnimationPin].value : '')}
                          {...scores.scoreText}/>
                    <Text {...scores.coinsText}/>
                    {clickCounter < 3 ?
                        <Container>
                            <Text {...scores.plusText}/>
                            <Text {...scores.pickAgainText}/>
                        </Container> : null
                    }
                </Container> : null
            }
        </Container>;
    }
}
