import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { last, first } from 'lodash';
import { Sprite, Container } from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import ScoresWin from "src/slots/common/components/ScoresWin";
import AnimationBezier from "src/slots/common/components/AnimationBezier";

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            impactIndex: null,
            activeShotIndex: null,
            canShoot: true,
            cloudPosition: null,
            showPickABear: true,
            activePickTextIndex: 0
        };
        this.freegameSettings = context.config.freegame;
        this.handleClickOnItem = this.clickOnItem.bind(this);
        this.handleOnCompleteHit = this.onCompleteHit.bind(this);
        setTimeout(() => this.setState({showPickABear: false}), 5000);
    };

    getItem(itemID) {
        const itemName = `item${itemID}`;
        const {
            images,
            freegame: {
                availableItems
            }
        } = this.props;
        const typeAnimation = availableItems[itemID].animation;
        let configParams = {
            ...this.freegameSettings.items[itemName],
            key: itemName + "clown",
            images: images,
            nameAnimation: `bearClown`,
            typeAnimation: typeAnimation
        };
        if (availableItems[itemID].isActive) {
            configParams = {
                ...configParams,
                key: itemName,
                idForClickHandler: itemID,
                clickHandler: this.handleClickOnItem,
                nameAnimation: `bear`
            }
        }
        return <AnimationJson {...configParams}/>
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
        if (this.state.canShoot && this.state.activePickTextIndex < 3) {
            this.setState({ canShoot: false });
            this.props.actions.freegameClickOnPin({pinID});
        }
    }
    onCompleteHit() {
        this.props.actions.freegameHitOnComplete();
        let { activePickTextIndex } = this.state;
        if ( ++activePickTextIndex < 3 ) {
            this.setState({activePickTextIndex});
        }
    }

    showCannonAnimation(texture, defPosition, bezier, pin) {
        if (this.state.activeShotIndex == null) {
            return <AnimationBezier
                key={`showCannon_${pin}`}
                imageTexture={texture}
                defaultPosition={defPosition}
                bezierValue={bezier}
                handleOnComplete={() => {
                    this.setState({ activeShotIndex: pin });
                    this.props.actions.slotPlaySound({soundName: 'cannon_move.mp3'});
                }}
            />
        } else {
            const bezierLastPosition = bezier ? last(bezier) : null;
            return <AnimationBezier
                key={`hideCannon_${pin}`}
                imageTexture={texture}
                defaultPosition={bezierLastPosition}
                bezierValue={[bezierLastPosition, { x: bezierLastPosition.x, y: bezierLastPosition.y + 200}]}
            />
        }
    }

    onClownImpact() {
        const { freegame: { activePin } } = this.props;
        const cloudPosition = activePin ? this.freegameSettings.clouds[activePin - 1] : null;
        this.setState({ impactIndex: this.state.activeShotIndex, activeShotIndex: null, cloudPosition });
        setTimeout(this.handleOnCompleteHit, 500);
    }

    cannonAnimations() {
        const {
            images,
            freegame: {
                activePin
            }
        } = this.props;
        const {
            cannonDefaultPosition,
            cannonBezier,
            cannonShots,
            clownFly
        } = this.freegameSettings;
        const {
            activeShotIndex,
            impactIndex
        } = this.state;
        const cannonBezierActivePin = activePin && impactIndex === null ? cannonBezier[activePin - 1] : null;
        return <Fragment>
            {
                activeShotIndex !== null ?
                    <Fragment>
                        <AnimationJson
                            {...clownFly[activeShotIndex]}
                            images={images}
                            handleOnComplete={this.onClownImpact.bind(this)}
                        />
                        <AnimationJson
                            {...cannonShots[activeShotIndex]}
                            images={images}
                        />
                    </Fragment>
                : impactIndex !== null ?
                    <AnimationJson
                        images={images}
                        {...this.state.cloudPosition}
                        nameAnimation={'cloudExplosion'}
                        typeAnimation={'default'}
                        handleOnComplete={() => {
                            this.setState({ impactIndex: null, cloudPosition: null });
                            this.setState({ canShoot: true });
                        }}
                    />
                : null
            }
            {cannonBezierActivePin ?
                this.showCannonAnimation(
                    images['cannon.png'].texture,
                    cannonDefaultPosition,
                    cannonBezierActivePin,
                    activePin - 1
                ) : null
            }
        </Fragment>
    }

    render() {
        const {
            images,
            freegame: { activeScores }
        } = this.props;
        const {
            showPickABear,
            activePickTextIndex,
            canShoot
        } = this.state;
        const {
            container,
            showPickABearAnimation,
            hidePickABearAnimation,
            pickAgainAnimation,
            picksImages
        } = this.freegameSettings;
        const picksImageTexture = images[picksImages[activePickTextIndex]].texture;
        return <Container>
            <Sprite texture={images['freegame_bg.png'].texture} {...container}/>
            <AnimationJson images={images} x={0} y={570 - 207} nameAnimation={'bonusElephantLoop'} typeAnimation={'default'}/>
            <Sprite texture={images['platforms.png'].texture}/>
            <AnimationJson images={images} x={760 - 195} y={570 - 207} nameAnimation={'announcerIdle'} typeAnimation={'default'}/>

            { this.getAllActiveItems() }

            <ScoresWin images={images} activeScores={activeScores}/>

            <Sprite texture={picksImageTexture} x={760 / 2 - picksImageTexture.baseTexture.width / 2} y={400}/>
            {canShoot && activePickTextIndex > 0 && activePickTextIndex < 3 ?
                <AnimationBezier {...pickAgainAnimation} imageTexture={images['text_pick_again.png'].texture}/>
                : null
            }

            { this.cannonAnimations() }

            { showPickABear ?
                <AnimationBezier key={'showPickABearAnimation'} defaultPosition={first(showPickABearAnimation)} bezierValue={showPickABearAnimation} duration={2}>
                    <AnimationJson images={images} x={0} y={0} nameAnimation={'banner'} typeAnimation={'default'}/>
                    <Sprite texture={images['text_pick_a_bear.png'].texture} y={340} x={110}/>
                </AnimationBezier>
            :
                <AnimationBezier key={'hidePickABearAnimation'} defaultPosition={first(hidePickABearAnimation)} bezierValue={hidePickABearAnimation}>
                    <AnimationJson images={images} x={0} y={0} nameAnimation={'banner'} typeAnimation={'default'}/>
                    <Sprite texture={images['text_pick_a_bear.png'].texture} y={340} x={110}/>
                </AnimationBezier>
            }
        </Container>;
    }
}
