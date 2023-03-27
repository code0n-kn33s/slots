import * as actionTypes from "src/slots/common/actionTypes";

export const freespinsHideStartNotification = params => {
    return ({
        type: actionTypes.FREE_SPINS_HIDE_START_NOTIFICATION,
        params
    });
};

export const freespinsHideEndNotification = params => {
    return ({
        type: actionTypes.FREE_SPINS_HIDE_END_NOTIFICATION,
        params
    });
};