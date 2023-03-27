import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Container, Sprite, Text} from "react-pixi-fiber";
import AnimationJson from "src/slots/common/components/AnimationJson";
import AnimationBezier from "src/slots/common/components/AnimationBezier";

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.freegameSettings = context.config.freegame;

        this.handleClickOnItem = this.clickOnItem.bind(this);
        this.handleOnCompleteAnimation = this.onCompleteAnimation.bind(this);
        this.handleOnCompleteAnimationCard = this.onCompleteAnimationCard.bind(this);
        this.handleOnCompleteAnimationCardSplat = this.onCompleteAnimationCardSplat.bind(this);
        this.state = {
            activeItemId: 0,
            isStartDogsCardAnimation: false,
            isStartCardSplatAnimation: false,
            itemsList: {...this.getDefaultItemList()}
        }
    };

    getDefaultItemList() {
        const {pinItemsCount} = this.freegameSettings;
        let itemList = {};
        for(let i = 1; i <= pinItemsCount; i++) {
            itemList[i] = {
                isActive: true,
                nameAnimation: 'loop',
                animation: 'default',
                scores: 0
            }
        }
        return itemList;
    }

    clickOnItem(pinID) {
        const { isCanPickOnItem } = this.props.freegame;
        if(isCanPickOnItem) {
            this.props.actions.freegameClickOnPin({pinID});
            this.startSelectAnimation(pinID);
            this.setState({activeItemId: pinID});
        }
    }

    onCompleteAnimation() {
        const { itemsList, activeItemId } = this.state;
        if(activeItemId) {
            switch (itemsList[activeItemId].nameAnimation) {
                case 'select' : this.startLoopEmptyAnimation(activeItemId); break;
            }
        }
    }
    onCompleteAnimationCard() {
        this.setState({
            isStartDogsCardAnimation: false,
            isStartCardSplatAnimation: true,
            activeItemId: 0
        });
    }

    onCompleteAnimationCardSplat() {
        const { activePin, activeScores } = this.props.freegame;
        const { itemsList } = this.state;
        itemsList[activePin].scores = activeScores[activeScores.length - 1];
        this.setState({
            itemsList,
            isStartCardSplatAnimation: false
        });

        this.props.actions.freegameHitOnComplete();
    }

    startSelectAnimation(pinID) {
        const { itemsList } = this.state;
        itemsList[pinID].nameAnimation = 'select';
        this.setState({
            isStartDogsCardAnimation: true,
            itemsList
        });
    }

    startLoopEmptyAnimation(pinID) {
        const { itemsList } = this.state;
        itemsList[pinID].nameAnimation = 'loop2';
        this.setState({itemsList});
    }

    getItem(itemID) {
        const {images} = this.props;
        const { animation, nameAnimation, scores } = this.state.itemsList[itemID];
        const _nameAnimation = `dog${itemID}_${nameAnimation}`;
        const configParams = this.freegameSettings[`dog${itemID}`];
        const itemsScoresCommon = this.freegameSettings.itemsScores.commonStyle;
        const itemsScoresDog = this.freegameSettings.itemsScores[`dog${itemID}`];

        return (
            <Container key={`item${itemID}${nameAnimation}${animation}`}>
                <AnimationJson
                    images={images}
                    {...configParams}
                    idForClickHandler={itemID}
                    clickHandler={this.handleClickOnItem}
                    nameAnimation={_nameAnimation}
                    typeAnimation={animation}
                    handleOnComplete={this.handleOnCompleteAnimation}
                />
                {scores > 0 ?
                    <Text
                        {...itemsScoresCommon}
                        {...itemsScoresDog}
                        text={scores}
                    /> : null}

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

    getDogsCardAnimation() {
        const { images } = this.props;
        const { activeItemId, isStartDogsCardAnimation } = this.state;
        const typeAnimation = `dog${activeItemId}`;
        const configParams = this.freegameSettings['dogsCard'];

        return isStartDogsCardAnimation ?
            <AnimationJson
                key={typeAnimation}
                images={images}
                {...configParams}
                nameAnimation={'dogCard'}
                typeAnimation={typeAnimation}
                handleOnComplete={this.handleOnCompleteAnimationCard}
            /> : null
    }

    render() {
        const {images} = this.props;
        const {isStartCardSplatAnimation} = this.state;
        const {
            container,
            textCoins,
            tableObjects,
            bonusTime,
            cardSplat,
            textScore,
            textAndPickAgain,
            pickAgainAnimation,
        } = this.freegameSettings;
        return <Fragment>
            <Sprite texture={images['freegame_bg.png'].texture} {...container}/>

            <AnimationJson
                key={'bonusTime'}
                images={images}
                {...bonusTime}
                nameAnimation={'bonusTime'}
                typeAnimation={'default'}
            />

            {this.getAllItems()}
            {this.getDogsCardAnimation()}

            {isStartCardSplatAnimation ?
                <Fragment>
                    <AnimationJson
                        key={'card_splat'}
                        images={images}
                        {...cardSplat}
                        nameAnimation={'card_splat'}
                        typeAnimation={'default'}
                        handleOnComplete={this.handleOnCompleteAnimationCardSplat}
                    />
                    <AnimationBezier {...pickAgainAnimation}>
                        <Sprite texture={images['textCoins.png'].texture} {...textCoins}/>
                        <Sprite texture={images['textAndPickAgain.png'].texture} {...textAndPickAgain}/>
                        <Text {...textScore} text={'5,500'} />
                    </AnimationBezier>
                </Fragment> : null}

            <Sprite texture={images['tableObjects.png'].texture} {...tableObjects}/>
        </Fragment>;
    }
}
