import {createStore, compose, bindActionCreators} from "redux";
import {combineReducers, install} from "redux-loop";
import {connect} from "react-redux";

export const createSlotStore = (_reducers, _actions) => {
    const enhancer = compose(install());

    let _store;
    function wrapReducer(reducer) {
        return (state, action) => {
            return reducer(state, action, _store ? _store.getState() : null);
        }
    }
    const rootReducer = combineReducers(
        Object.keys(_reducers).reduce((acc, name) => {
            acc[name] = wrapReducer(_reducers[name]);
            return acc;
        }, {})
    );

    const store = createStore(rootReducer, {}, enhancer);

    EventController.subscribe((...params) => {
        store.dispatch(_actions.globalEvent(...params));
    });

    return store;
};

export const createContainer = (_actions, _component) => {

    const mapDispatchToProps = (dispatch) => {
        return bindActionCreators(_actions, dispatch)
    };
    return connect(
        (state) => state,
        mapDispatchToProps
    )(_component)
}