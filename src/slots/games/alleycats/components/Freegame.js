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
        this.handleOnCompletePassBall = this.onCompletePassBall.bind(this);

        this.state = {
            isShowAnimationPickAnObject: false,
            catAnimation: 'catsWait',
            itemsList: {...this.getDefaultItemList()},
            tempActivePin: undefined
        };
    };

    getDefaultItemList() {
        let itemList = {};
        for(let i = 1; i <= 6; i++) {
            itemList[i] = {
                isActive: true,
                animation: 'default',
                scores: 0
            }
        }
        return itemList;
    }

    getItem(itemID) {
        const itemName = `item${itemID}`;
        const {images} = this.props;
        const {itemsList} = this.state;
        const typeAnimation = itemsList[itemID].animation;
        const configParams = this.freegemaSettings.items[itemName];
        return <AnimationJson
            {...configParams}
            key={itemName}
            idForClickHandler={itemID}
            clickHandler={this.handleClickOnItem}
            images={images}
            nameAnimation={`pin${itemID}`}
            typeAnimation={typeAnimation}
            cursor={'pointer'}
        />;

    }
    getAllActiveItems() {
        const { itemsList, tempActivePin } = this.state;
        const _itemsList = [];
        for (let item in itemsList) {
            if(itemsList[item].isActive && tempActivePin !== item) {
                _itemsList.push(this.getItem(item));
            }
        }
        return _itemsList;
    }

    clickOnItem(pinID) {
        const {isCanPickOnItem} = this.props.freegame;
        if(isCanPickOnItem) {
            this.props.actions.freegameClickOnPin({ pinID });
            const { itemsList } = this.state;
            itemsList[pinID].animation = 'selected';
            this.setState({
                catAnimation: 'bowlCatsPassBall',
                itemsList
            });
        }
    }
    onCompleteHit() {
        this.props.actions.freegameHitOnComplete();
        const { itemsList, tempActivePin } = this.state;
        itemsList[tempActivePin].isActive = false;
        this.setState({
            catAnimation: 'catsWait',
            itemsList,
            tempActivePin: undefined
        });
    }
    onCompletePassBall() {
        const {activePin} = this.props.freegame;
        this.setState({
            catAnimation: 'catsHit',
            tempActivePin: activePin
        });
        this.props.actions.slotPlaySound({soundName: `bowling_0${activePin}.mp3`});
    }

    startAnimationTextPickAnObject() {
        this.setState({isShowAnimationPickAnObject: true});
        setTimeout(() => {
            this.setState({isShowAnimationPickAnObject: false});
        }, 2000);
    }

    getFenceBurstList() {
        const {images} = this.props;
        const {itemsList} = this.state;
        const {hitsToPins}= this.freegemaSettings;
        let fenceBurstList = [];
        for(let item in itemsList) {
            if(!itemsList[item].isActive && item !== '3') {
                fenceBurstList.push(
                    <AnimationJson
                        key={`hitsToPins${item}`}
                        images={images}
                        x={hitsToPins[`hitToPin${item}`].x}
                        y={hitsToPins[`hitToPin${item}`].y}
                        nameAnimation={`hitToPin${item}`}
                        typeAnimation={'fence'}
                    />)
            }
        }
        return fenceBurstList
    }

    componentDidUpdate(prevProps) {
        const {isCanPickOnItem} = this.props.freegame;
        if (isCanPickOnItem && prevProps.freegame.isCanPickOnItem !== isCanPickOnItem) {
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
                activePin
            }
        } = this.props;

        const {isShowAnimationPickAnObject} = this.state;

        const {
            container,
            freegameBg2,
            bowlCatsPassBall,
            textPickAnObject,
            bowlNoBall,
            bowlCatsGrayLoop,
            hitsToPins,
            bowlCatHit
        } = this.freegemaSettings;
        return <Container>
            <Sprite texture={images['freegame_bg.png'].texture} {...container}/>
            <AnimationJson images={images} x={0} y={306} nameAnimation={'catInBasket'} typeAnimation={'default'}/>
            <AnimationJson images={images} x={592} y={95} nameAnimation={'dumbpster'} typeAnimation={'default'}/>

            {this.getFenceBurstList()}

            { this.getAllActiveItems() }

            <ScoresWin images={images} activeScores={this.props.freegame.activeScores}/>

            {isShowAnimationPickAnObject ? <Sprite texture={images['Text_Pick_an_Object.png'].texture} {...textPickAnObject}/> : null}

            {this.state.catAnimation === 'catsHit' && activePin ?
                <Container key={'catsHit'}>
                    <AnimationJson
                        images={images}
                        x={hitsToPins[`hitToPin${activePin}`].x}
                        y={hitsToPins[`hitToPin${activePin}`].y}
                        handleOnComplete={this.handleOnCompleteHit}
                        nameAnimation={`hitToPin${activePin}`}
                        typeAnimation={'default'}
                    />
                    <AnimationJson
                        images={images}
                        x={bowlCatHit.x}
                        y={bowlCatHit.y}
                        nameAnimation={`bowlCatHit`}
                        typeAnimation={'default'}
                    />
                </Container> : null}


            {this.state.catAnimation === 'catsWait' ?
                <AnimationJson
                    key={'bowlNoBall'}
                    images={images}
                    {...bowlNoBall}
                    nameAnimation={'bowlNoBall'}
                    typeAnimation={'default'}
                /> : null}

            {this.state.catAnimation === 'catsWait' || this.state.catAnimation === 'catsHit' ?
                <AnimationJson
                    key={'bowlCatsGrayLoop'}
                    images={images}
                    {...bowlCatsGrayLoop}
                    nameAnimation={'bowlCatsGrayLoop'}
                    typeAnimation={'default'}
                /> : null}

            {this.state.catAnimation === 'bowlCatsPassBall' ?
                <AnimationJson
                    key={'bowlCatsPassBall'}
                    images={images}
                    {...bowlCatsPassBall}
                    nameAnimation={'bowlCatsPassBall'}
                    handleOnComplete={this.handleOnCompletePassBall}
                    typeAnimation={'default'}
                /> : null}

            <Sprite texture={images['freegame_bg2.png'].texture}{...freegameBg2}/>
        </Container>;
    }
}
