import React from 'react';
import PropTypes from 'prop-types';
import { random } from 'lodash';
import { Sprite, Container, Text } from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import SoundController from "src/slots/common/soundController";
import AnimationBezier from "src/slots/common/components/AnimationBezier";
import ScoresWin from "src/slots/common/components/ScoresWin";

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            bearAnimation: 'bear_idle',
            activeHole: null,
            activeScores: {},
            picksLeft: 3
        };
        this.freegameSettings = context.config.freegame;
        this.clickOnItem = this.clickOnItem.bind(this);
        this.onCompleteHit = this.onCompleteHit.bind(this);
        console.clear();
        setTimeout(() => {
            SoundController.instance.playSound('banner.mp3');
        },2000)
    };

    getItem(itemID) {
        const itemName = `hole${itemID}`;
        const {
            images,
            freegame: { availableItems }
        } = this.props;
        const { holes } = this.freegameSettings;
        const { animation } = availableItems[itemID];
        const configParams = {
            ...holes[itemID - 1][animation],
            key: `${itemName}_${animation}`,
            images: images,
            idForClickHandler: itemID,
            clickHandler: this.clickOnItem,
            handleOnComplete: () => this.onCompleteClickItemAnimation()
        };

        return <AnimationJson {...configParams}/>
    }

    onCompleteClickItemAnimation() {
        const { freegame: { activeScores } } = this.props;
        this.setState({activeScores});
    }

    getAllActiveItems() {
        const { availableItems } = this.props.freegame;
        const itemsList = [];
        for (let item in availableItems) {
             itemsList.push(this.getItem(item));
        }
        return itemsList;
    }

    clickOnItem(pinID) {
        const { freegame: { availableItems } } = this.props;
        if (!availableItems[pinID].isActive || this.state.picksLeft < 1) {
            return null;
        }
        this.setState({
            bearAnimation: 'bear_casting',
            activeHole: pinID
        });
        SoundController.instance.playSound('line_cast.mp3');
        setTimeout(() => {
            this.props.actions.freegameClickOnPin({pinID});
            SoundController.instance.playSound('fish.mp3');
        },2500);
    }

    onCompleteHit() {
        this.props.actions.freegameHitOnComplete();
    }

    banner = (imageName, key) => {
        const { images } = this.props;
        const { banner, bannerText, bannerImage } = this.freegameSettings;
        return <AnimationBezier {...banner} key={`banner_${key}`} >
            <Sprite {...bannerImage} texture={images['banner.png'].texture}/>
            <Sprite {...bannerText} texture={images[imageName].texture}/>
        </AnimationBezier>
    }

    render() {
        const { images } = this.props;
        const {
            container,
            walrus, dog, penguins, snowman
        } = this.freegameSettings;
        const {
            bearAnimation,
            activeHole,
            activeScores,
            picksLeft
        } = this.state;
        const textPicksLeft = picksLeft === 1 ? 'text_pick_left.png' : 'text_picks_left.png'
        return <Container>
            <Sprite texture={images['freegame_bg.jpg'].texture} {...container}/>
            {/*<Sprite texture={images['test.png'].texture} {...container}/>*/}
            <Sprite texture={images[`left_${picksLeft}.png`].texture} x={715} y={53} anchor={{x: 0.5, y: 0.5}}/>
            <Sprite texture={images[textPicksLeft].texture} x={715} y={76} anchor={{x: 0.5, y: 0.5}}/>
            <AnimationJson {...walrus} images={images}/>
            <AnimationJson {...dog} images={images}/>
            <AnimationJson {...penguins} images={images}/>
            <AnimationJson {...snowman} images={images}/>
            <AnimationJson
                {...this.freegameSettings[bearAnimation]}
                images={images}
                key={bearAnimation}
            />
            { this.getAllActiveItems() }
            <ScoresWin images={images} activeScores={activeScores}/>
            { activeHole ?
                <AnimationJson
                    x={0} y={0} nameAnimation={`line${(activeHole < 10 ? "0": "") + activeHole}`}
                    typeAnimation="default"
                    images={images}
                    key={`line${activeHole}`}
                    handleOnComplete={() => {
                        this.setState({
                            bearAnimation: 'bear_idle',
                            activeHole: null,
                            picksLeft: picksLeft - 1
                        })
                        setTimeout(() => {
                            this.onCompleteHit()
                        }, 1000)
                    }}
                /> : null
            }
            { picksLeft === 3 ?
                this.banner('text_pick_3_holes.png', picksLeft) :
                picksLeft > 0 ?
                    this.banner('text_pick_again.png', picksLeft) : null}
        </Container>;
    }
}
