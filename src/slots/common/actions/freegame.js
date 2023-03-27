import * as actionTypes from "../actionTypes";

export const freegameShow = params => {
    return ({
        type: actionTypes.FREEGAME_GAME_SHOW,
        params
    });
};

export const freegameHide = params => {
    return ({
        type: actionTypes.FREEGAME_GAME_HIDE,
        params
    });
};

export const freegameClickOnPin = params => {
    return ({
        type: actionTypes.FREEGAME_CLICK_ON_PIN,
        params
    });
};


export const freegameStartHit = params => {
    return ({
        type: actionTypes.FREEGAME_START_HIT,
        params
    });
};

export const freegameSetResultHitOnPick = params => {
    return ({
        type: actionTypes.FREEGAME_SET_RESULT_HIT_ON_PIN,
        params
    });
};

export const freegameHitOnComplete = params => {
    return ({
        type: actionTypes.FREEGAME_HIT_ON_COMPLETE,
        params
    });
};
