import * as actionTypes from '../actionTypes';
import * as domain from "../domain";
import {INFO_WINDOWS_STATUS} from 'src/slots/common/constants/infoWindows';
import {loop, Cmd} from 'redux-loop';
import {
    getStartAdditionalAnimation,
    getActualMapAnimation,
    getWinLinesInfo,
    getMapSymbols,
    getWinLines,
    getBonusGameWins,
    getAvailableItemsDefault
} from '../helpers'

const globalEventTypes = EventController.getTypes();

const pinItemsCountDefault = 6;
const maxBonusGameStepsDefault = 3;

function getInitialState() {
    const coins = 1;
    const lines = 9;
    return {
        // @todo remove this cheat
        cheatStartBonusGame: false,
        cheatStartFreeSpins: false,
        userId: 0,
        slotName: '',
        soundsIsActive: false,
        gameId: 0,
        answerFromServer: {},
        sequence: 0,
        progressLoading: 0,
        isLoadComplete: false,
        selectLinesIsShow: false,
        selectCoinsIsShow: false,
        payloadIsShow: false,
        resources: [],
        isButtonsDisabled: true,
        isSpining: false,
        isShowAnimation: false,
        isShowLines: false,
        symbolsFromServer: [[], [], [], [], []],
        rotating: [false, false, false, false, false],
        serverSpinAnswerSymbols: [[], [], [], [], []],
        serverSpinAnswerLines: [],
        serverSpinAnswerScores: [],
        serverSpinAnswerLinesLenght: [],
        serverSpinAnswerWinSymbols: [],
        serverSpinAnswerLinesFreegame: false,
        serverSpinAnswerLinesFreespins: 0,
        serverSpinAnswerBalance: 0,
        indexActiveLine: null,
        mapAnimation: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
        linesSteps: [1, 2, 3, 4, 5, 9, 12, 15, 20, 30, 35, 40, 50, 60, 70, 80, 100],
        lines,
        maxLines: 100,
        coinsSteps: [1, 2, 3, 4, 5, 6, 10, 15, 30, 50, 100, 200, 300, 400, 500, 750, 1000, 1500, 3000, 5000],
        maxCoins: 10,
        coins,
        bet: coins * lines,
        credits: 0,
        win: 0,
        symbolsIdMap: {},
        paySchedule: {},

        infoWindow: {
            isActive: false,
            typeWindow: undefined
        },

        messageFromServer: {},

        freespins: {
            isActive: false,
            winScoresSum: 0,
            commonCount: 0,
            count: 0
        },

        freegame: {
            isActive: false,
            isActivePickAnObject: false,
            isCanPickOnItem: false,
            activePin: undefined,
            openedObjectsCount: 0,
            bonusTokens: 0,
            winScoresList: 0,
            winScores: 0,
            commonWin: 0,
            pinItemsCount: pinItemsCountDefault,
            maxBonusGameSteps: maxBonusGameStepsDefault,
            availableItems: {},
            activeScores: {},
            activeAnimationCat: 'bowlCatsPassBall'
        }
    };
}

const slot = (state = getInitialState(), action) => {
    switch (action.type) {
        case actionTypes.SLOT_INIT: {
            const {
                sysname,
                config: {
                    freegame: {
                        pinItemsCount,
                        maxBonusGameSteps
                    }
                }
            } = action.params;

            let _pinItemsCount = pinItemsCount ? pinItemsCount : pinItemsCountDefault;
            let _maxBonusGameSteps = maxBonusGameSteps ? maxBonusGameSteps : maxBonusGameStepsDefault;
            return loop(
                {
                    ...state,
                    initStarted: true,
                    slotName: sysname,
                    freegame: {
                        ...state.freegame,
                        pinItemsCount: _pinItemsCount,
                        maxBonusGameSteps: _maxBonusGameSteps,
                        availableItems: {...getAvailableItemsDefault(_pinItemsCount)}
                    }
                },
                Cmd.run(
                    domain.handleInitSlotStart, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }
        case globalEventTypes.SLOT_CLOSE: {
            return loop(
                {...state},
                Cmd.run(
                    domain.handleCloseSlot, {
                        args: [Cmd.getState, Cmd.dispatch, action.type]
                    })
            );
        }
        case globalEventTypes.SOUNDS_TOGGLE: {
            const {soundsIsActive} = action.params;
            return loop(
                {
                    ...state,
                    soundsIsActive
                },
                Cmd.run(
                    domain.handleSlotSoundsToggle, {
                        args: [{soundsIsActive}, Cmd.getState, Cmd.dispatch]
                    })
            );
        }
        case actionTypes.SLOT_PLAY_SOUND: {
            const {soundName} = action.params;
            return loop(
                {...state},
                Cmd.run(
                    domain.handleSlotPlaySound, {
                        args: [{soundName}, Cmd.getState, Cmd.dispatch]
                    })
            );
        }

        case globalEventTypes.SLOT_GET_SETTINGS: {
            const {userId, balance, gamesInfoList, soundsIsActive} = action.params;
            return loop(
                {
                    ...state,
                    userId,
                    gameId: gamesInfoList[state.slotName] ? gamesInfoList[state.slotName].GameID : 0,
                    soundsIsActive,
                    credits: balance
                },
                Cmd.run(
                    domain.handleSlotGetSettings, {
                        args: [Cmd.getState, Cmd.dispatch, action.type]
                    })
            );
        }

        case actionTypes.SLOT_SET_ID_SYMBOLS_MAP: {
            return {
                ...state,
                symbolsIdMap: action.params
            }
        }

        case actionTypes.SLOT_SET_PAY_SCHEDULE: {
            return {
                ...state,
                paySchedule: action.params
            }
        }

        case actionTypes.SLOT_LOADING: {
            return {
                ...state,
                progressLoading: action.params.progressLoading
            }
        }
        case actionTypes.SLOT_LOAD_COMPLETE: {
            return loop(
                {
                    ...state,
                    resources: action.params.resources,
                    isLoadComplete: true,
                    isButtonsDisabled: false
                },
                Cmd.run(
                    domain.handleSlotLoadComplete, {
                        args: [Cmd.getState, Cmd.dispatch, action.type]
                    })
            );
        }
        // @todo remove this cheat
        case actionTypes.CONTROLS_CHEAT_START_BONUSGAME: {
            return loop({
                    ...state,
                    cheatStartBonusGame: true
                },
                Cmd.run(
                    domain.handleControlsStartBonusGame, {
                        args: [Cmd.getState, Cmd.dispatch, action.type]
                    }))
        }
        case actionTypes.CONTROLS_CHEAT_START_FREESPINS: {
            return loop({
                    ...state,
                    cheatStartFreeSpins: true
                },
                Cmd.run(
                    domain.handleControlsStartFreespins, {
                        args: [Cmd.getState, Cmd.dispatch, action.type]
                    }))
        }
        case actionTypes.CONTROLS_TOGGLE_SELECT_LINES: {
            return {
                ...state,
                selectCoinsIsShow: false,
                selectLinesIsShow: !state.selectLinesIsShow,
            }
        }
        case actionTypes.CONTROLS_SHOW_SELECT_LINES: {
            return {
                ...state,
                selectLinesIsShow: true,
            }
        }
        case actionTypes.CONTROLS_HIDE_SELECT_LINES: {
            return {
                ...state,
                selectLinesIsShow: false,
            }
        }
        case actionTypes.CONTROLS_SELECT_LINE: {
            return {
                ...state,
                lines: action.params,
                selectLinesIsShow: false,
                bet: state.coins * action.params
            }
        }
        case actionTypes.CONTROLS_TOGGLE_SELECT_COINS: {
            return {
                ...state,
                selectLinesIsShow: false,
                selectCoinsIsShow: !state.selectCoinsIsShow,
            }
        }
        case actionTypes.CONTROLS_SHOW_SELECT_COINS: {
            return {
                ...state,
                selectCoinsIsShow: true,
            }
        }
        case actionTypes.CONTROLS_HIDE_SELECT_COINS: {
            return {
                ...state,
                selectCoinsIsShow: false,
            }
        }
        case actionTypes.CONTROLS_SELECT_COIN: {
            const coins = action.params;
            return {
                ...state,
                coins,
                bet: coins * state.lines,
                selectCoinsIsShow: false,
            }
        }
        case actionTypes.CONTROLS_COINS_CHANGE: {
            const newCoins = state.coins + 1;
            return {
                ...state,
                coins: newCoins,
                bet: newCoins * state.lines
            }
        }
        case actionTypes.CONTROLS_CHANGE_ACTIVE_LINES: {
            const indexLineStep = state.linesSteps.indexOf(state.lines);
            let newActiveLines = state.linesSteps[indexLineStep + 1]
                ? state.linesSteps[indexLineStep + 1]
                : state.linesSteps[0];
            return {
                ...state,
                isShowLines: true,
                lines: newActiveLines,
                bet: state.coins * newActiveLines
            }
        }
        case actionTypes.CONTROLS_MAX_LINES: {
            const maxLines = state.maxLines;
            return loop(
                {
                    ...state,
                    isShowLines: true,
                    lines: maxLines,
                    bet: state.coins * maxLines
                },
                Cmd.run(
                    domain.handleControlsMaxLines, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }
        case actionTypes.CONTROLS_PAYLOAD: {
            return {
                ...state,
                payloadIsShow: true
            }
        }
        case actionTypes.CONTROLS_RESUME_GAME: {
            return {
                ...state,
                payloadIsShow: false
            }
        }
        case actionTypes.CONTROLS_SPIN_START: {
            return loop(
                {
                    ...state,
                    isSpining: true,
                    isShowAnimation: true,
                    isButtonsDisabled: true,
                    isShowLines: false,
                    serverSpinAnswerSymbols: [[], [], [], [], []],
                    serverSpinAnswerLines: [],
                    serverSpinAnswerScores: [],
                    serverSpinAnswerLinesLenght: [],
                    serverSpinAnswerWinSymbols: [],
                    serverSpinAnswerLinesFreegame: false,
                    serverSpinAnswerLinesFreespins: 0,
                    win: 0,
                    serverSpinAnswerBalance: 0,
                    mapAnimation: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    sequence: state.sequence + 1
                },
                Cmd.run(
                    domain.handleSlotSpinStart, {
                        args: [Cmd.getState, Cmd.dispatch, state]
                    })
            );
        }
        case actionTypes.CONTROLS_SPIN_STOP: {
            const symbolsMap = getMapSymbols(action.params.messages[0].matrix, state.symbolsIdMap);
            return loop(
                {
                    ...state,
                    answerFromServer: action.params,
                    credits: action.params.messages && action.params.messages[1].Coins,

                    serverSpinAnswerSymbols: [...symbolsMap],
                    isSpining: false,
                    isShowAnimation: false,
                    // @todo remove this cheat
                    cheatStartBonusGame: false,
                    cheatStartFreeSpins: false
                },
                Cmd.run(
                    domain.handleSlotSpinStop, {
                        args: [Cmd.getState, Cmd.dispatch, { userData : action.params.messages[1] }]
                    }),
            );
        }

        case actionTypes.SLOT_REEL_START_ROTATE: {
            const rotating = [...state.rotating];
            let currentReelIndex = action.params.reelIndex;
            rotating[currentReelIndex] = true;
            return loop(
                {
                    ...state,
                    rotating: [...rotating]
                },
                Cmd.run(
                    domain.handleSlotReelStartRotate, {
                        args: [Cmd.getState, Cmd.dispatch, {reelIndex: currentReelIndex}]
                    })
            );
        }
        case actionTypes.SLOT_REEL_STOP_ROTATE: {
            const rotating = [...state.rotating];
            let currentReelIndex = action.params.reelIndex;
            rotating[currentReelIndex] = false;
            return loop(
                {
                    ...state,
                    rotating: [...rotating]
                },
                Cmd.run(
                    domain.handleSlotReelStopRotate, {
                        args: [Cmd.getState, Cmd.dispatch, {reelIndex: currentReelIndex}]
                    })
            );
        }
        case actionTypes.SLOT_REELS_STOPPED: {
            const {WinLines, freeSpins, bonusSeed, bonusTokens} = state.answerFromServer.messages[0];
            const {
                winLines,
                winLinesPayScheduleIDs,
                linesLength,
                winSymbols
            } = getWinLines(WinLines, state.symbolsIdMap);
            const mapAnimation = getActualMapAnimation(winLines, linesLength, state.serverSpinAnswerSymbols);
            const {winLinesScores} = getWinLinesInfo(winLinesPayScheduleIDs, state.paySchedule);
            const params = {};
            if (winLines.length) {
                params.isShowAnimation = true;
                params.isShowLines = true;
            }

            return loop(
                {
                    ...state,
                    serverSpinAnswerLines: winLines,
                    serverSpinAnswerScores: winLinesScores,
                    serverSpinAnswerLinesLenght: linesLength,
                    serverSpinAnswerWinSymbols: winSymbols,
                    serverSpinAnswerLinesFreegame: bonusSeed > 0,
                    serverSpinAnswerLinesFreespins: freeSpins ? freeSpins : 0,
                    credits: state.answerFromServer.messages[1].Coins,
                    bonusTokens: bonusTokens,
                    win: 0,
                    mapAnimation,
                    ...params
                },
                Cmd.run(
                    domain.handleSlotReelsStopped, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }

        case actionTypes.SLOT_START_SHOWING_LINES: {
            return loop(
                {
                    ...state
                },
                Cmd.run(domain.handleSlotShowingLines, {
                    args: [Cmd.getState, Cmd.dispatch, {
                        activeLines: state.serverSpinAnswerLines,
                        winSymbols: state.serverSpinAnswerWinSymbols,
                        isShowLines: state.isShowLines
                    }]
                })
            );
        }

        case actionTypes.SLOT_SHOWING_LINES: {
            const indexActiveLine = action.params ? action.params.indexActiveLine : 0;
            const {freespins, serverSpinAnswerScores} = state;
            const linesScore = serverSpinAnswerScores[indexActiveLine];

            let freespinsParams = {};
            if(freespins.isActive) {
                freespinsParams.winScoresSum = linesScore ? freespins.winScoresSum + Number(linesScore) : freespins.winScoresSum;
            }
            return loop(
                {
                    ...state,
                    indexActiveLine,
                    win: linesScore,
                    freespins: {
                        ...freespins,
                        ...freespinsParams
                    }
                },
                Cmd.run(domain.handleSlotShowingLines, {
                    args: [Cmd.getState, Cmd.dispatch, {
                        indexActiveLine,
                        activeLines: state.serverSpinAnswerLines,
                        winSymbols: state.serverSpinAnswerWinSymbols,
                        isShowLines: state.isShowLines
                    }]
                })
            );
        }

        case actionTypes.SLOT_SHOWING_LINES_LOOP: {
            return loop(
                {
                    ...state
                },
                Cmd.run(domain.handleShowingLinesLoop, {
                    args: [Cmd.getState, Cmd.dispatch, {
                        activeLines: state.serverSpinAnswerLines,
                        isShowLines: state.isShowLines
                    }]
                })
            );
        }

        case actionTypes.SLOT_LINES_SHOWED: {
            const isHaveAdditionalGame = state.serverSpinAnswerLinesFreegame || state.serverSpinAnswerLinesFreespins > 0;
            return loop(
                {
                    ...state,
                    isButtonsDisabled: isHaveAdditionalGame
                },
                Cmd.run(domain.handleSlotLinesShowed, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }

        case actionTypes.SLOT_CONTINUE_AFTER_SPIN: {
            return loop(
                {
                    ...state,
                },
                Cmd.run(domain.handleContinueAfterSpin, {
                    args: [Cmd.getState, Cmd.dispatch]
                })
            );
        }

        case actionTypes.SLOT_START_SPECIAL_SYMBOLS_ANIMATION: {
            const {specialSymbol} = action.params;
            const mapAnimation = getStartAdditionalAnimation(specialSymbol, state.serverSpinAnswerSymbols);
            return {
                ...state,
                mapAnimation
            }
        }

        case actionTypes.SLOT_SHOW_INFO_WINDOW: {
            return {
                ...state,
                infoWindow: {
                    ...state.infoWindow,
                    isActive: true,
                    typeWindow: INFO_WINDOWS_STATUS[action.params.typeInfoWindow]
                }
            }
        }

        case actionTypes.SLOT_HIDE_INFO_WINDOW: {
            return {
                ...state,
                infoWindow: {
                    ...state.infoWindow,
                    isActive: false
                }
            }
        }

        case actionTypes.FREEGAME_GAME_SHOW: {
            const _winScoresList = getBonusGameWins(3, state.bonusTokens);
            return loop({
                ...state,
                    freegame: {
                        ...state.freegame,
                        activeAnimationCat: 'bowlCatsPassBall',
                        winScoresList: _winScoresList,
                        isActive: true,
                        isCanPickOnItem: true
                    },
                    infoWindow: {
                        ...state.infoWindow,
                        isActive: false,
                        typeWindow: undefined
                    }
                },
                Cmd.run(domain.handleOpenBonusGame, {
                    args: [Cmd.getState, Cmd.dispatch]
                })
            );
        }
        case actionTypes.FREEGAME_GAME_HIDE: {
            return loop({
                    ...state,
                    isButtonsDisabled: state.serverSpinAnswerLinesFreespins > 0,
                    serverSpinAnswerLinesFreegame: false,
                    freegame: {
                        ...state.freegame,
                        isActive: false,
                        isActivePickAnObject: false,
                        isCanPickOnItem: false,
                        activePin: undefined,
                        openedObjectsCount: 0,
                        bonusTokens: 0,
                        winScoresList: 0,
                        winScores: 0,
                        commonWin: 0,
                        availableItems: {...getAvailableItemsDefault(state.freegame.pinItemsCount)},
                        activeScores: {},
                        activeAnimationCat: 'bowlCatsPassBall'
                    },
                    infoWindow: {
                        ...state.infoWindow,
                        isActive: false,
                        typeWindow: undefined
                    }
                },
                Cmd.run(domain.handleCloseBonusGame, {
                    args: [Cmd.getState, Cmd.dispatch]
                })
            );
        }
        case actionTypes.FREEGAME_CLICK_ON_PIN: {
            const availableItems = {...state.freegame.availableItems};
            availableItems[action.params.pinID].animation = 'selected';
            return loop(
                {
                    ...state,
                    freegame: {
                        ...state.freegame,
                        isCanPickOnItem: false,
                        isActivePickAnObject: true,
                        availableItems: {...availableItems}
                    }
                },
                Cmd.run(
                    domain.handleFreegameClickOnPin, {
                        args: [Cmd.getState, Cmd.dispatch, {pinID: action.params.pinID}]
                    })
            );
        }
        case actionTypes.FREEGAME_START_HIT: {
            const { winScoresList, openedObjectsCount, commonWin} = state.freegame;
            const winScores = winScoresList[openedObjectsCount];
            return {
                ...state,
                sequence: state.sequence + 1,

                freegame: {
                    ...state.freegame,
                    winScores: winScores ? winScores : 0,
                    commonWin: winScores ? commonWin + Number(winScores) : commonWin,
                    activePin: action.params.pinID
                }
            }
        }

        case actionTypes.FREEGAME_HIT_ON_COMPLETE: {
            return loop(
                {
                    ...state,
                    freegame: {
                        ...state.freegame,
                        activeAnimationCat: 'bowlNoBall'
                    }
                },
                Cmd.run(
                    domain.handleHitOnComplete, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }

        case actionTypes.FREEGAME_SET_RESULT_HIT_ON_PIN: {
            const { activePin, availableItems, winScores, openedObjectsCount } = state.freegame;
            availableItems[activePin].isActive = false;
            const activeScores = {...state.freegame.activeScores};
            activeScores[activePin] = {value: winScores};

            return loop(
                {
                    ...state,
                    freegame: {
                        ...state.freegame,
                        winScores: 0,
                        activePin: undefined,
                        isActivePickAnObject: false,
                        openedObjectsCount: openedObjectsCount + 1,
                        activeAnimationCat: 'bowlCatsPassBall',
                        availableItems: {...availableItems},
                        activeScores,
                    }
                },
                Cmd.run(
                    domain.handleSetResultHitOnPin, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }

        case actionTypes.FREEGAME_UNLOCK_ITEMS_FOR_CLICK: {
            return {
                ...state,
                freegame: {
                    ...state.freegame,
                    isCanPickOnItem: true
                }
            }
        }

        case actionTypes.FREESPINS_START: {
            return loop(
                {
                    ...state,
                    freespins: {
                        ...state.freespins,
                        isActive: true
                    }
                },
                Cmd.run(
                    domain.handleFreespinsStart, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }

        case actionTypes.FREE_SPINS_SET_COUNT: {
            const freespinsCount = action.params.count;
            return {
                ...state,
                freespins: {
                    ...state.freespins,
                    commonCount: freespinsCount,
                    count: freespinsCount
                }
            }
        }

        case actionTypes.FREE_SPINS_HIDE_START_NOTIFICATION: {
            return loop(
                {...state},
                Cmd.run(
                    domain.handleHideFreespinsStartNotification, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }
        case actionTypes.FREE_SPINS_HIDE_END_NOTIFICATION: {
            return loop(
                {...state},
                Cmd.run(
                    domain.handleHideFreespinsEndNotification, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }
        case actionTypes.FREESPINS_END: {
            return {
                ...state,
                serverSpinAnswerLinesFreespins: 0,
                isButtonsDisabled: false,
                freespins: {
                    ...state.freespins,
                    winScoresSum: 0,
                    isActive: false,
                    commonCount: 0,
                    count: 0
                }
            };
        }
        case actionTypes.FREESPINS_CHANGE_COUNT: {
            const freespinsCount = state.freespins.count;
            return {
                    ...state,
                    freespins: {
                        ...state.freespins,
                        count: freespinsCount - 1
                    }
                }
        }

        default:
            return state;
    }
};

export default slot;
