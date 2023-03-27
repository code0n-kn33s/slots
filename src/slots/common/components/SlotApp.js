import React from 'react';
import 'src/assets/styles/common.sass';
import { Provider } from "react-redux";

import slot from 'src/slots/common/reducers/slot';
import { actions }  from 'src/slots/common/actions';

import { asyncComponent } from "src/helpers";
import { createSlotStore, createContainer } from "src/slots/common/helpers/store";

class SlotApp extends React.Component {
    constructor(props) {
        super(props);

        this.sysname = props.match.params.sysname;
        this.ViewComponent = asyncComponent(() => import(`src/slots/games/${this.sysname}/components/View`));
        this.init();
    }

    init() {
        this.Container = createContainer(actions, this.ViewComponent);

        this.store = createSlotStore({ slot }, actions);

        this.closeGameEvent = new CustomEvent("closeGame", {
            detail: {}
        });
    }

    componentWillUnmount() {
        document.dispatchEvent(this.closeGameEvent);
    }

    render() {
        return (
            <Provider store={this.store}>
                <this.Container />
            </Provider>
        )
    }
}
export default SlotApp;
