import * as actionTypes from '../actionTypes';

export const slotPlaySound = params => {
    return ({
        type: actionTypes.SLOT_PLAY_SOUND,
        params
    });
};
export const setSymbolsIdMap = params => {
    return ({
        type: actionTypes.SLOT_SET_ID_SYMBOLS_MAP,
        params
    });
};
export const setPaySchedule = params => {
    return ({
        type: actionTypes.SLOT_SET_PAY_SCHEDULE,
        params
    });
};

export const reelSpin = params => {
    return ({
        type: actionTypes.SLOT_REEL_START_ROTATE,
        params
    });
};

export const reelStop = params => {
    return ({
        type: actionTypes.SLOT_REEL_STOP_ROTATE,
        params
    });
};

export const reelsStopped = params => {
    return ({
        type: actionTypes.SLOT_REELS_STOPPED,
        params
    });
};

export const startShowingLines = params => {
    return ({
        type: actionTypes.SLOT_START_SHOWING_LINES,
        params
    });
};

export const showingLinesLoop = params => {
    return ({
        type: actionTypes.SLOT_SHOWING_LINES_LOOP,
        params
    });
};

export const showingLines = params => {
    return ({
        type: actionTypes.SLOT_SHOWING_LINES,
        params
    });
};
export const showedLines = params => {
    return ({
        type: actionTypes.SLOT_LINES_SHOWED,
        params
    });
};

export const openBonusGame = params => {
    return ({
        type: actionTypes.FREEGAME_GAME_SHOW,
        params
    });
};

export const startSpecialSymbolsAnimation = params => {
    return ({
        type: actionTypes.SLOT_START_SPECIAL_SYMBOLS_ANIMATION,
        params
    });
};