import {getUserCoockie, lobbyApi, getGamesList, setUserLevelUp} from "src/api";
const globalEventTypes = EventController.getTypes();
import { AUTH_STATUS } from "src/lobby/consts/auth";
import {actions} from "src/lobby/actions";
import {getHostQueryParams} from "src/helpers";
import * as actionTypes from "src/lobby/actionTypes";

export async function handleInitLobbyStart(getState, dispatch) {
    await getGamesList().then(response => {
        EventController.dispatch(response, globalEventTypes.SET_GAMES_LIST);
    });

    if(!getHostQueryParams('session_id')) {
        await getUserCoockie();
    }

    lobbyApi('player.php?command=getInitialPlayerDataV2').then((data) => {
        lobbyApi('coinBundles.php?command=getSaleInfo');
        lobbyApi('coinBundles.php?command=getCoinBundles3');
        lobbyApi('appParams.php?command=getLoglevelWeb');
        lobbyApi('games.php?command=getGamesList_V2');
        lobbyApi('levelsTable.php?command=getPartialLevelTable').then((data) => {
            dispatch({
                type: actionTypes.LOBBY_PARSE_LEVELS,
                data,
            })
        });
        lobbyApi('slotGameData.php?command=getServers&useProxy=false');

        EventController.dispatch(data, globalEventTypes.AUTH_FACEBOOK_SUCCESS);
        dispatch(actions.setUserInfo(data))
    }).catch(() => {
        console.log('Ошибка получения куки для Facebook');
    });
}

export async function handleSlotInit(params) {
    EventController.dispatch(params, globalEventTypes.SLOT_GET_SETTINGS);
}

export async function handleUserLevelUp(getState, dispatch, params) {
    if (params.levelXp > params.levelMaxProgress) {
       setUserLevelUp(params.userId)

        EventController.dispatch({

        }, actionTypes.LOBBY_SET_USER_LEVEL_UP);
    }
}

export async function handleSetGamesList(getState, dispatch, { roomsList }) {
    let gamesInfoList = {};
    for(let room in roomsList) {
        roomsList[room].Games.forEach(item => {
            const sysname = item
                .GameName
                .replace(/\s/g, '')
                .replace('\'', '')
                .toLowerCase();
            gamesInfoList[sysname] = item;
        });
    }
    dispatch(actions.setGamesInfoList(gamesInfoList))
}

export async function handleAuthFacebook(params, dispatch) {
    switch (params.authStatus) {
        case AUTH_STATUS.success: console.log('Успешная авторизация'); break;
        case AUTH_STATUS.error: console.log('Не удалось авторизоваться'); break;
    }
}
export async function handleSetUserId(params) {
    EventController.dispatch(params, globalEventTypes.SLOT_GET_SETTINGS);
}

export async function handleLobbySoundsToggle(params) {
    EventController.dispatch(params, globalEventTypes.SOUNDS_TOGGLE);
}

