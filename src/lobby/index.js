import React from 'react';
import ReactDOM from 'react-dom';
import 'src/assets/styles/index.css';
import App from 'src/lobby/App';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { store } from "src/lobby/store";
import { actions } from "src/lobby/actions";

const ConnectedApp = connect(
    (state) => state,
    (dispatch) => {
        return bindActionCreators(actions, dispatch)
    }
)(App);

EventController.subscribe((...params) => {
    store.dispatch(actions.globalEvent(...params));
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={ConnectedApp} />
        </Router>
    </Provider>,
    document.getElementById('root')
);