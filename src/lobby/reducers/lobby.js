import * as actionTypes from 'src/lobby/actionTypes';
import * as domain from "src/lobby/domain";
import {getHostQueryParams} from "src/helpers";
import {Cmd, loop} from 'redux-loop';
import {isNull} from "lodash";
import {AUTH_STATUS} from 'src/lobby/consts/auth';
import device from 'current-device';

const globalEventTypes = EventController.getTypes();

function getInitialState() {
    return {
        openGameWithLobby: false,
        userId: 0,
        userInfo: {
            balance: 0,
            level: 0,
            levelXp: 0,
            levelMaxProgress: 0,
        },
        isHaveReadyNavigationBar: false,
        soundsIsActive: false,
        authStatus: AUTH_STATUS.noAuth,
        slotIsLoadComplete: false,
        slotIsOpen: false,
        roomsList: {},
        gamesInfoList: {},
        listAvailableGames: [
            'alleycats',
            'kingsandqueens',
            'snowhoneys',
            "spikesniteout",
            "lovepotion",
            "stashofthetitans",
            "luckyshot",
            "thegrandcircus",
            "gypsyqueen",
            "polarbash",
            "reelbarons",
            "sirwinsalot"
        ],
        levelsMap: {},
    }
}
const itsWebView = !isNull(getHostQueryParams('session_id'));

const lobby = (state = getInitialState(), action) => {

    switch (action.type) {
        case actionTypes.LOBBY_INIT: {

            //TODO получать значение из хренилища
            let soundsIsActive = 1;
            if (getHostQueryParams('sounds') !== null) {
                const soundsIsActive = Boolean(getHostQueryParams('sounds') === '1');
            }

            return loop(
                {
                    ...state,
                    initStarted: true,
                    openGameWithLobby: !itsWebView,
                    soundsIsActive
                },
                Cmd.run(
                    domain.handleInitLobbyStart, {
                        args: [Cmd.getState, Cmd.dispatch]
                    })
            );
        }

        case actionTypes.LOBBY_PARSE_LEVELS: {
            if (typeof action.data[0].m_data == "undefined") {
                return {
                    ...state
                }
            }

            let levelsMap = {};
            const serverLevels = action.data[0].m_data;
            serverLevels.forEach((item) => {
                levelsMap[ item.m_levelNum ] = item;
            });

            return {
                ...state,
                levelsMap
            }
        }

        case actionTypes.LOBBY_SET_USER_INFO: {
            const {m_userID, m_coins, m_level, m_xp, m_maxProgress } = action.params[0]['m_data'];
            // const levelProgressStatus = m_maxProgress > 0 ? (m_xp * 100 / m_maxProgress) : 0;
            let levelProgressStatus = 0
            if (m_maxProgress > 0) {
                if (typeof state.levelsMap[ state.userInfo.level ] != "undefined") {
                    const levelStartPoint = parseInt(state.levelsMap[state.userInfo.level].m_minProgress)
                    levelProgressStatus = (state.userInfo.levelXp - levelStartPoint) * 100 / (state.userInfo.levelMaxProgress - levelStartPoint)
                }
            }
            console.log(levelProgressStatus)

            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    userId: m_userID,
                    balance: m_coins,
                    levelXp: m_xp,
                    levelMaxProgress: m_maxProgress,
                    levelProgressStatus,
                    level: parseInt(m_level)
                }
            }
        }
        case actionTypes.LOBBY_SET_USER_LEVEL_UP: {
            state.userInfo.level++;
            // делаем еще раз +1 т.к. макс.значение текущего уровня с сервера отдается не с текущего уровня а у следующего
            // у первого уровня макс.экспа стоит 0
            // Так же мы отнимаем единицу у макс.значения экспы (там зачем-то оно увеличеное?)
            const newLevelMaxProgress = parseInt(state.levelsMap[ state.userInfo.level + 1 ].m_minProgress) - 1;

            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    levelMaxProgress: newLevelMaxProgress,
                }
            }
        }
        case globalEventTypes.SLOT_INIT: {
            return loop(
                {
                    ...state,
                    slotIsOpen: true,
                    openGameWithLobby: itsWebView || device.mobile() ? false : state.openGameWithLobby
                },
                Cmd.run(
                    domain.handleSlotInit, {
                        args: [{
                            userId: state.userInfo.userId,
                            balance: state.userInfo.balance,
                            gamesInfoList: state.gamesInfoList,
                            soundsIsActive: state.soundsIsActive
                        }, Cmd.getState, Cmd.dispatch]
                    })
            );
        }
        case globalEventTypes.SPIN_STOP_CALLBACK: {
            const {Coins, XP} = action.params.userData;
            const { levelMaxProgress } = state.userInfo;
            const levelProgressStatus = levelMaxProgress > 0 ? (XP * 100 / levelMaxProgress) : 0;
            return loop(
                {
                    ...state,
                    userInfo: {
                        ...state.userInfo,
                        balance: Coins,
                        levelXp: XP,
                        levelProgressStatus
                    }
                },
                Cmd.run(
                    domain.handleUserLevelUp, {
                        args: [Cmd.getState, Cmd.dispatch, {
                            userId: state.userInfo.userId,
                            levelXp: XP,
                            levelMaxProgress: state.userInfo.levelMaxProgress,
                        }]
                    })
            );
        }
        case globalEventTypes.SLOT_LOAD_COMPLETE: {
            return {
                ...state,
                slotIsLoadComplete: true
            }
        }
        case globalEventTypes.SLOT_CLOSE: {
            return {
                ...state,
                slotIsLoadComplete: false,
                slotIsOpen: false,
                openGameWithLobby: !itsWebView
            }
        }
        case actionTypes.LOBBY_SOUNDS_TOOGLE: {
            const soundsIsActive = !state.soundsIsActive;
            return loop(
                {
                    ...state,
                    soundsIsActive
                },
                Cmd.run(
                    domain.handleLobbySoundsToggle, {
                        args: [{soundsIsActive}, Cmd.getState, Cmd.dispatch]
                    })
            );
        }

        case globalEventTypes.SET_GAMES_LIST: {
            const roomsList = action.params[0].Rooms;
            return loop({
                    ...state,
                    isHaveReadyNavigationBar: true,
                    roomsList
                },
                Cmd.run(
                    domain.handleSetGamesList, {
                        args: [Cmd.getState, Cmd.dispatch, {roomsList}]
                    })
            );
        }

        case actionTypes.LOBBY_SET_GAMES_INFO_LIST: {
            return {
                ...state,
                gamesInfoList: action.params
            }
        }

        case globalEventTypes.AUTH_FACEBOOK_SUCCESS: {
            return loop({
                    ...state,
                    authStatus: action.params[0].m_data.m_FBUID
                        ? AUTH_STATUS.success
                        : AUTH_STATUS.demo
                },
                Cmd.run(
                    domain.handleAuthFacebook, {
                        args: [{authStatus: AUTH_STATUS.success}, Cmd.dispatch]
                    })
            );
        }
        case globalEventTypes.AUTH_FACEBOOK_ATTEMPT: {
            return loop({
                    ...state,
                    authStatus: AUTH_STATUS.pending
                },
                Cmd.run(
                    domain.handleAuthFacebook, {
                        args: [{authStatus: AUTH_STATUS.pending}, Cmd.dispatch]
                    })
            );
        }
        case globalEventTypes.AUTH_FACEBOOK_ERROR: {
            return loop({
                    ...state,
                    authStatus: AUTH_STATUS.error
                },
                Cmd.run(
                    domain.handleAuthFacebook, {
                        args: [{authStatus: AUTH_STATUS.error}, Cmd.dispatch]
                    })
            );
        }

        default:
            return state;
    }
};

export default lobby;
