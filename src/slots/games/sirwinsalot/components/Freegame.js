import React from 'react'
import PropTypes from 'prop-types'
import { Sprite, Container } from "react-pixi-fiber"
import AnimationJson from "src/slots/common/components/AnimationJson"
import ScoresWin from "src/slots/common/components/ScoresWin"

export default class Freegame extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    }

    constructor(props, context) {
        super(props, context)

        this.freegameSettings = context.config.freegame
        this.handleClickOnItem = this.clickOnItem.bind(this)
        this.handleOnCompleteHit = this.onCompleteHit.bind(this)

        this.handleOnMugGrab = this.onMugGrab.bind(this)
        this.handleOnMoveToKnight = this.onMoveToKnight.bind(this)
        this.handlebartenderGiveMugToKnight = this.onbartenderGiveMugToKnight.bind(this)
        this.handleknightDrink = this.onknightDrink.bind(this)

        this.state = {
            mugGrabed: true, 
            activeScores: {},
            picksLeft: 3,
            activeAnimation: 'bartenderLoop'
        }
    }

    getItem(itemID) {
        const itemName = `item${itemID}`
        const {
            images,
            freegame: {
                availableItems
            }
        } = this.props
        const typeAnimation = availableItems[itemID].animation
        const configParams = this.freegameSettings.items[itemName]

        return (
            <AnimationJson
                {...configParams}
                key={itemName}
                idForClickHandler={itemID}
                clickHandler={this.handleClickOnItem}
                images={images}
                nameAnimation={`mugLoop`}
                typeAnimation={typeAnimation}
            />

        )
    }

    getScore(itemID) {
        const scoreName = `scoreMug${itemID}`
        const { images } = this.props
        const configParams = this.freegameSettings.scoreMugs[scoreName]
        const size = { width: '25', height: '35' }

        return (
            <>
                <Sprite
                    texture={images[`winDigit_${configParams.value.toString()[0]}.png`].texture}
                    x={`${parseInt(configParams.x) - 25}`}
                    y={configParams.y}
                    {...size} />
                <Sprite
                    texture={images[`winDigit_${configParams.value.toString()[1]}.png`].texture}
                    x={configParams.x}
                    y={configParams.y}
                    {...size} />
                <Sprite
                    texture={images[`winDigit_${configParams.value.toString()[2]}.png`].texture}
                    x={`${parseInt(configParams.x) + 25}`}
                    y={configParams.y}
                    {...size} />
            </>
        )
    }

    onCompleteClickItemAnimation() {
        const { freegame: { activeScores } } = this.props;
        this.setState({activeScores});
    }

    startAnimationTextPickAnObject() {
        this.setState({ mugGrabed: true });
    }

    componentDidUpdate(prevProps) {
        const {
            activePin
        } = this.props.freegame;

        if (activePin && activePin !== prevProps.freegame.activePin) {
            this.startAnimationTextPickAnObject();
        }
    }
    getAllActiveItems() {
        const { availableItems } = this.props.freegame
        const itemsList = []

        for (let item in availableItems) {
            if (availableItems[item].animation !== 'selected') {
                itemsList.push(this.getItem(item))
            } else {
                this.state.mugGrabed && availableItems[item].isActive !== false ? itemsList.push(this.getItem(item)) : null
            }
        }

        return itemsList
    }
    getAllScoreItems() {
        const { availableItems } = this.props.freegame
        const itemsList = []

        for (let item in availableItems) {
            if (availableItems[item].isActive === false) {
                itemsList.push(this.getScore(item))
            } else {
                null
            }
        }

        return itemsList
    }

    clickOnItem(pinID) {
        // const { freegame: { availableItems } } = this.props;

        this.props.actions.freegameClickOnPin({ pinID })

        this.setState({
            activeAnimation: 'brtWalkToMug'
        })
        this.onCompleteClickItemAnimation()
    }
    onCompleteHit() {
        this.setState({
            activeAnimation: 'bartenderLoop',
            mugGrabed: true,
            picksLeft: this.state.picksLeft - 1
        })
        this.props.actions.freegameHitOnComplete()
    }
    onMugGrab() {
        this.setState({
            activeAnimation: 'bartenderMugGrab',
            mugGrabed: false
        })
    }
    onMoveToKnight() {
        this.setState({
            activeAnimation: 'bartenderMoveToKnight'
        })
    }
    onbartenderGiveMugToKnight() {
        this.setState({
            activeAnimation: 'bartenderGiveMugToKnight'
        })
        setTimeout(() => this.onknightDrink(), 500)
    }
    onknightDrink() {
        this.setState({
            activeAnimation: 'knightDrink'
        })
        setTimeout(() => this.props.actions.slotPlaySound({ soundName: 'drink_scene.mp3' }), 800)
    }
    render() {
        const {
            images,
            freegame: {
                activePin,
            }
        } = this.props

        const { activeAnimation, picksLeft } = this.state
        const { container, mugGrabs, barTable } = this.freegameSettings
        const textPicksLeft = picksLeft === 1 ? 'text_pick_left.png' : 'text_picks_left.png'

        console.log('## this.props.freegame' ,this.props.freegame)
        return <Container>
            <Sprite texture={images['winsalot_bg.png'].texture} {...container} />

            <ScoresWin images={images} activeScores={this.props.freegame.activeScores} />

            {/* pick left */}
            <Sprite texture={images[`digit_${picksLeft}.png`].texture} x={700} y={33} anchor={{x: 0.5, y: 0.5}}/>
            <Sprite texture={images[textPicksLeft].texture} x={700} y={60} anchor={{x: 0.5, y: 0.5}}/>
            {/* end pick left */}

            <AnimationJson
                images={images}
                x={20}
                y={100}
                nameAnimation={'torch'}
                typeAnimation={'default'}
            />

            <AnimationJson
                images={images}
                x={10}
                y={185}
                nameAnimation={'lutePlayerLoop'}
                typeAnimation={'default'}
            />
            {
                activeAnimation === 'knightDrink' ?
                    <AnimationJson
                        images={images}
                        x={220}
                        y={110}
                        handleOnComplete={this.handleOnCompleteHit}
                        nameAnimation={`knightDrink`}
                        typeAnimation={`default`}
                    />
                    : null
            }
            {
                activeAnimation !== 'knightDrink' ?
                    <AnimationJson
                        images={images}
                        x={220}
                        y={110}
                        nameAnimation={'knightLoop'}
                        typeAnimation={'default'}
                    />
                    : null
            }

            <AnimationJson images={images} x={590} y={230} nameAnimation={'girlLoop'} typeAnimation={'default'} />
            <Sprite texture={images['barTable.png'].texture} {...barTable} />

            {this.getAllActiveItems()}
            {this.getAllScoreItems()}

            {
                !activePin && <AnimationJson
                    images={images} x={-70} y={330} nameAnimation={'bartenderLoop'} typeAnimation={'default'} />
            }

            {
                activePin && activeAnimation === 'brtWalkToMug' ?
                    <AnimationJson
                        images={images}
                        x={-50}
                        y={330}
                        handleOnComplete={this.handleOnMugGrab}
                        nameAnimation={`bartenderWalk`}
                        typeAnimation={`brtWalkToMug${activePin}`}
                    />
                    : null
            }
            {
                activeAnimation === 'bartenderMugGrab' ?
                    <AnimationJson
                        images={images}
                        x={mugGrabs[`mugGrab${activePin}`].x}
                        y={280}
                        handleOnComplete={this.handleOnMoveToKnight}
                        nameAnimation={`bartenderMugGrab`}
                        typeAnimation={`default`}
                    />
                    : null
            }
            {
                activeAnimation === 'bartenderMoveToKnight' ?
                    <AnimationJson
                        images={images}
                        x={0}
                        y={330}
                        handleOnComplete={this.handlebartenderGiveMugToKnight}
                        nameAnimation={`bartenderWalk`}
                        typeAnimation={`brtWalkFromMugToKnight${activePin}`}
                    />
                    : null
            }
            {
                activeAnimation === 'bartenderGiveMugToKnight' ?
                    <AnimationJson
                        images={images}
                        x={100}
                        y={280}
                        nameAnimation={`bartenderMugGive`}
                        typeAnimation={`default`}
                    />
                    : null
            }
            {
                activeAnimation === 'knightDrink' && activePin ?
                    <AnimationJson
                        images={images}
                        x={0}
                        y={330}
                        handleOnComplete={this.handlefreegameRoundComplete}
                        nameAnimation={`bartenderWalk`}
                        typeAnimation={`brtComeBack`}
                    />
                    : null
            }
            {/* banners pick again and final banner need toDo */}
            {/* {
            picksLeft === 3 ?
                this.banner('final_banner-NEED_ADD.png', picksLeft) :
                picksLeft > 0 ?
                    this.banner('banner_pick_again-NEED_ADD.png', picksLeft) : null
            } */}
        </Container>
    }
}