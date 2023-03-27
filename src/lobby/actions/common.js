import * as actionTypes from "src/lobby/actionTypes";

export const globalEvent = (params, type) => ({
    type: type,
    params
});

export const lobbyInit = params => {
    return ({
        type: actionTypes.LOBBY_INIT,
        params
    });
};

export const setGamesInfoList = params => {
    return ({
        type: actionTypes.LOBBY_SET_GAMES_INFO_LIST,
        params
    });
};

export const setUserInfo = params => {
    return ({
        type: actionTypes.LOBBY_SET_USER_INFO,
        params
    });
};

export const lobbySoundsToggle = params => {
    return ({
        type: actionTypes.LOBBY_SOUNDS_TOOGLE,
        params
    });
};
