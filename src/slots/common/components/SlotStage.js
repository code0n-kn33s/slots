import React from 'react';
import PropTypes from 'prop-types';
import {Container, Sprite} from "react-pixi-fiber";
import ReelsWrapper from "src/slots/common/components/ReelsWrapper";
import Controls from "src/slots/common/components/Controls";
import SymbolAnimationContainer from "src/slots/common/components/SymbolAnimationContainer";
import Lines from "src/slots/common/components/Lines";
import Freegame from "src/slots/common/components/Freegame";
import Freespins from "src/slots/common/components/Freespins";

import {INFO_WINDOWS_STATUS} from 'src/slots/common/constants/infoWindows';
import NotificationWindow from "src/slots/common/components/NotificationWindow"
import Paytable from "src/slots/common/components/Paytable";

export default class SlotStage extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);

        this.freespinsSettings = context.config.freespins;
        this.infoWindowsContent = context.config.infoWindows;

        this.lastY = 0;
        this.startActingDistanceY = 50;
        this.touchToStartOffset = 10;
    }

    createTouchEvents() {
        const canvasElement = document.getElementsByTagName("canvas")[0];

        canvasElement.addEventListener("touchstart", this.onTouchStart.bind(this), false);
        canvasElement.addEventListener("touchmove", this.onTouchMove.bind(this), false);

        window.addEventListener("resize", this.setSize.bind(this), false);
        window.addEventListener("webkitfullscreenchange", this.setSize.bind(this), false);
        window.addEventListener("mozfullscreenchange", this.setSize.bind(this), false);
        window.addEventListener("fullscreenchange", this.setSize.bind(this), false);
        window.addEventListener("MSFullscreenChange", this.setSize.bind(this), false);
        this.setSize();
    }

    setSize() {
        const canvasElement = document.getElementsByTagName("canvas")[0];
        const body = document.getElementsByTagName("body")[0];
        const gameLayout = document.getElementById("gameLayout");

        const containerWidth = canvasElement.offsetWidth;
        const containerHeight = canvasElement.offsetHeight;

        let globalWidth = gameLayout.offsetWidth;
        let globalHeight = gameLayout.offsetHeight;

        const scale = Math.min(
            globalWidth / containerWidth,
            globalHeight / containerHeight
        );

        canvasElement.style.transform = "scale(" + scale + ")";
    }

    onTouchStart(e) {
        e.stopPropagation();
        this.lastY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        e.stopPropagation();

        let currentY = e.touches[0].clientY;

        if (this.lastY < this.startActingDistanceY) {
            return;
        }
        if ((currentY - this.lastY) > this.touchToStartOffset) {
            this.props.controlsSpiningStart();
        }
    }

    componentDidMount() {
        this.createTouchEvents();
    }

    getFreegameComponent() {
        const {
            slot: {
                resources,
                freegame
            },
            freegameClickOnPin,
            freegameHitOnComplete
        } = this.props;
        return <Freegame
            images={resources}
            freegame={freegame}
            actions={{
                freegameClickOnPin,
                freegameHitOnComplete
            }}
        />
    }
    getFreespinsComponent() {
        const {
            resources,
            freespins: {
                commonCount,
                count
            }
        } = this.props.slot;
        return <Freespins
            images={resources}
            freespinsActiveCount={count}
            freespinsCommonCount={commonCount}
        />
    }

    getNotificationWindow() {
        const {
            resources,
            freespins,
            freegame,
            infoWindow: {
                isActive,
                typeWindow
            }
        } = this.props.slot;
        if(!isActive) {
            return null
        }

        switch (typeWindow) {
            case INFO_WINDOWS_STATUS.freeSpinsStart:
                return <NotificationWindow
                    images={resources}
                    count={freespins.commonCount}
                    action={this.props.freespinsHideStartNotification}
                    content={this.infoWindowsContent['freeSpinsStart']}
                />;
            case INFO_WINDOWS_STATUS.freeSpinsEnd:
                return <NotificationWindow
                    images={resources}
                    count={freespins.commonCount}
                    coins={freespins.winScoresSum}
                    action={this.props.freespinsHideEndNotification}
                    content={this.infoWindowsContent['freeSpinsEnd']}
                />;
            case INFO_WINDOWS_STATUS.bonusGameEnd:
                return <NotificationWindow
                    images={resources}
                    coins={freegame.commonWin}
                    action={this.props.freegameHide}
                    content={this.infoWindowsContent['endBonusGame']}
                />;
            default: return null;
        }
    }

    payTableIsAvailable() {
        return this.infoWindowsContent.paytable && this.infoWindowsContent.paytable.isRewriteMeComponent
    }

    getPayTable() {
        const resources = this.props.slot.resources;
        return <Paytable
            images={resources}
            controlsResumeGame={this.props.controlsResumeGame}
            config={this.infoWindowsContent.paytable}
        />
    }

    render() {
        const resources = this.props.slot.resources;
        return (
            <Container>
                <ReelsWrapper
                    images={resources}
                    rotating={this.props.slot.rotating}
                    serverSpinAnswerSymbols={this.props.slot.serverSpinAnswerSymbols}
                    freespinsIsActive={this.props.slot.freespins.isActive}
                />

                <Sprite key="main_bg.png" texture={resources['main_bg.png'].texture} x={0} y={0}/>

                <SymbolAnimationContainer
                    symbols={this.props.slot.serverSpinAnswerSymbols}
                    mapAnimation={[...this.props.slot.mapAnimation]}
                    isShowAnimation={this.props.slot.isShowAnimation}
                    images={resources}
                />

                <Lines
                    images={resources}
                    lines={this.props.slot.lines}
                    linesTotalCount={this.props.slot.linesTotalCount}
                    symbols={this.props.slot.serverSpinAnswerSymbols}
                    serverSpinAnswerLines={this.props.slot.serverSpinAnswerLines}
                    serverSpinAnswerLinesLenght={this.props.slot.serverSpinAnswerLinesLenght}
                    serverSpinAnswerScores={this.props.slot.serverSpinAnswerScores}
                    isShowLines={this.props.slot.isShowLines}
                    areLinesActive={this.props.slot.areLinesActive}
                    activeLinesCount={this.props.slot.lines}
                    indexActiveLine={this.props.slot.indexActiveLine}
                    actions={{
                        controlsChangeActiveLinesCount: this.props.controlsChangeActiveLinesCount
                    }}
                />
                <Controls
                    images={resources}
                    isButtonsDisabled={this.props.slot.isButtonsDisabled}
                    credits={this.props.slot.credits}
                    linesTotalCount={this.props.slot.linesTotalCount}
                    lines={this.props.slot.lines}
                    coins={this.props.slot.coins}
                    bet={this.props.slot.bet}
                    win={this.props.slot.win}
                    actions={{
                        controlsCoinsChange: this.props.controlsCoinsChange,
                        changeLinesCount: this.props.changeLinesCount,
                        controlsSpiningStart: this.props.controlsSpiningStart,
                        controlsToggleSelectLines: this.props.controlsToggleSelectLines,
                        controlsToggleSelectCoins: this.props.controlsToggleSelectCoins,
                        controlsMaxLines: this.props.controlsMaxLines,
                        controlsPayload: this.props.controlsPayload
                    }}
                />

                {this.payTableIsAvailable() && this.props.slot.payloadIsShow ?
                    this.getPayTable() : null
                }

                {!this.props.slot.freespins.isActive ?
                    this.getFreespinsComponent() : null
                }

                {!this.props.slot.freegame.isActive ?
                    this.getFreegameComponent() : null
                }

                { this.getNotificationWindow() }
            </Container>
        )
    }
}
