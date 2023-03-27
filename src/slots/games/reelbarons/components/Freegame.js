import React from 'react';
import PropTypes from 'prop-types';
import { Sprite, Container } from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import ScoresWin from "src/slots/common/components/ScoresWin";

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);

        this.freegemaSettings = context.config.freegame;
        this.handleClickOnItem = this.clickOnItem.bind(this);
        this.handleOnCompleteHit = this.onCompleteHit.bind(this);
    };

    state = {
        isShowAnimationPickAnObject: false
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
        const configParams = this.freegemaSettings.items[itemName];
        return (
            <AnimationJson
                {...configParams}
                key={itemName}
                idForClickHandler={itemID}
                clickHandler={this.handleClickOnItem}
                images={images}
                nameAnimation={`pin${itemID}`}
                typeAnimation={typeAnimation}
            />
        )

    }
    getAllActiveItems() {
        const { availableItems } = this.props.freegame;
        const itemsList = [];
        for (let item in availableItems) {
            if(availableItems[item].isActive) {
                itemsList.push(this.getItem(item));
            }
        }
        return itemsList;
    }

    clickOnItem(pinID) {
        if(this.props.freegame.isCanPickOnItem) {
            this.props.actions.freegameClickOnPin({ pinID });
        }
    }
    onCompleteHit() {
        this.props.actions.freegameHitOnComplete();
    }

    startAnimationTextPickAnObject() {
        this.setState({isShowAnimationPickAnObject: true});
        setTimeout(() => {
            this.setState({isShowAnimationPickAnObject: false});
        }, 2000);
    }

    componentDidUpdate(prevProps) {
        if (this.props.freegame.isCanPickOnItem && prevProps.freegame.isCanPickOnItem !== this.props.freegame.isCanPickOnItem) {
            this.startAnimationTextPickAnObject();
        }
    }

    componentDidMount() {
        this.startAnimationTextPickAnObject();
    }

    render() {
        const {
            images,
            freegame: {
                activePin,
                activeAnimationCat,
                availableItems
            }
        } = this.props;

        const {isShowAnimationPickAnObject} = this.state;

        const {
            container,
            bowlCatsPassBall,
            textPickAnObject,
            bowlNoBall,
            fenceBurst,
            hitsToPins
        } = this.freegemaSettings;

        return <Container>
            <Sprite texture={images['freegame_bg.png'].texture} {...container}/>
            <AnimationJson images={images} x={0} y={570 - 264} nameAnimation={'catInBasket'} typeAnimation={'default'}/>

            { this.getAllActiveItems() }

            <ScoresWin images={images} activeScores={this.props.freegame.activeScores}/>

            <AnimationJson images={images} x={760-168} y={95} nameAnimation={'dumbpster'} typeAnimation={'default'}/>

            {!availableItems[1].isActive ? <Sprite texture={images['fenceBurst1.png'].texture} {...fenceBurst.item1} /> : null }
            {!availableItems[2].isActive ? <Sprite texture={images['fenceBurst2.png'].texture} {...fenceBurst.item2} /> : null }
            {!availableItems[4].isActive ? <Sprite texture={images['fenceBurst4.png'].texture} {...fenceBurst.item4} /> : null }
            {!availableItems[5].isActive ? <Sprite texture={images['fenceBurst5.png'].texture} {...fenceBurst.item5} /> : null }
            {!availableItems[6].isActive ? <Sprite texture={images['fenceBurst6.png'].texture} {...fenceBurst.item6} /> : null }

            {isShowAnimationPickAnObject ? <Sprite texture={images['Text_Pick_an_Object.png'].texture} {...textPickAnObject}/> : null}

            {
                activeAnimationCat === 'bowlCatsPassBall' ?
                    <AnimationJson
                        images={images}
                        {...bowlCatsPassBall}
                        nameAnimation={'bowlCatsPassBall'}
                        typeAnimation={'default'}
                    /> : null
            }

            {
                activeAnimationCat === 'bowlNoBall' ?
                    <AnimationJson
                        images={images}
                        {...bowlNoBall}
                        nameAnimation={'bowlNoBall'}
                        typeAnimation={'default'}
                    /> : null
            }

            {
                activePin ?
                    <AnimationJson
                        images={images}
                        x={hitsToPins[`hitToPin${activePin}`].x}
                        y={hitsToPins[`hitToPin${activePin}`].y}
                        handleOnComplete={this.handleOnCompleteHit}
                        nameAnimation={`hitToPin${activePin}`}
                        typeAnimation={'default'}
                    /> :
                    null
            }

        </Container>;
    }
}
