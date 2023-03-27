import * as actionTypes from "../actionTypes";

export const globalEvent = (params, type) => ({
    type: type,
    params
});

export const slotInit = params => {
    return ({
        type: actionTypes.SLOT_INIT,
        params
    });
};

export const loadingProcess = params => {
    return ({
        type: actionTypes.SLOT_LOADING,
        params
    });
};

export const loadComplete = params => {
    return ({
        type: actionTypes.SLOT_LOAD_COMPLETE,
        params
    });
};