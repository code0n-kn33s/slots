import {createStore, compose} from "redux";
import {combineReducers, install} from 'redux-loop';
import lobby from "src/lobby/reducers/lobby";

const reducers = {
    lobby
};

let store1;
function wrapReducer(reducer) {
    return (state, action) => reducer(state, action, store1 ? store1.getState() : null);
}

const rootReducer = combineReducers(
    Object.keys(reducers).reduce((acc, name) => {
        acc[name] = wrapReducer(reducers[name]);
        return acc;
    }, {})
);

const enhancer = compose(install());

export const store = createStore(
    rootReducer,
    {},
    enhancer
);