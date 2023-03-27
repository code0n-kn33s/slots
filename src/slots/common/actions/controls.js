import * as actionTypes from "../actionTypes";

// @todo remove this cheat
export const controlsCheatStartBonusGame = params => {
    return ({
        type: actionTypes.CONTROLS_CHEAT_START_BONUSGAME,
        params
    });
};
// @todo remove this cheat
export const controlsCheatStartFreespins = params => {
    return ({
        type: actionTypes.CONTROLS_CHEAT_START_FREESPINS,
        params
    });
};
export const controlsCoinsChange = params => {
    return ({
        type: actionTypes.CONTROLS_COINS_CHANGE,
        params
    });
};
export const controlsChangeActiveLinesCount = params => {
    return ({
        type: actionTypes.CONTROLS_CHANGE_ACTIVE_LINES,
        params
    });
};
export const controlsToggleSelectLines = params => {
    return ({
        type: actionTypes.CONTROLS_TOGGLE_SELECT_LINES,
        params
    });
};
export const controlsToggleSelectCoins = params => {
    return ({
        type: actionTypes.CONTROLS_TOGGLE_SELECT_COINS,
        params
    });
};
export const controlsSelectLine = params => {
    return ({
        type: actionTypes.CONTROLS_SELECT_LINE,
        params
    });
};
export const controlsSelectCoin = params => {
    return ({
        type: actionTypes.CONTROLS_SELECT_COIN,
        params
    });
};
export const controlsMaxLines = params => {
    return ({
        type: actionTypes.CONTROLS_MAX_LINES,
        params
    });
};
export const controlsPayload = params => {
    return ({
        type: actionTypes.CONTROLS_PAYLOAD,
        params
    });
};
export const controlsResumeGame = params => {
    return ({
        type: actionTypes.CONTROLS_RESUME_GAME,
        params
    });
};
export const controlsSpiningStart = params => {
    return ({
        type: actionTypes.CONTROLS_SPIN_START,
        params
    });
};
export const controlsSpiningStop = params => {
    return ({
        type: actionTypes.CONTROLS_SPIN_STOP,
        params
    });
};
export const continueAfterSpin = params => {
    return ({
        type: actionTypes.SLOT_CONTINUE_AFTER_SPIN,
        params
    });
};
export const changeCountFreespins = params => {
    return ({
        type: actionTypes.FREESPINS_CHANGE_COUNT,
        params
    });
};
export const startFreespins = params => {
    return ({
        type: actionTypes.FREESPINS_START,
        params
    });
};
export const setFreespinsCount = params => {
    return ({
        type: actionTypes.FREE_SPINS_SET_COUNT,
        params
    })
};

export const slotShowInfoWindow = params => {
    return ({
        type: actionTypes.SLOT_SHOW_INFO_WINDOW,
        params
    })
};

export const slotHideInfoWindow = params => {
    return ({
        type: actionTypes.SLOT_HIDE_INFO_WINDOW,
        params
    })
};

export const endFreespins = params => {
    return ({
        type: actionTypes.FREESPINS_END,
        params
    });
};

export const freegameUnlockItemsForClick = params => {
    return ({
        type: actionTypes.FREEGAME_UNLOCK_ITEMS_FOR_CLICK,
        params
    });
};
