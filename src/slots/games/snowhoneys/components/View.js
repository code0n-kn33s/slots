import PropTypes from 'prop-types';
import SlotView from "src/slots/common/components/SlotView";
import config from 'src/slots/games/snowhoneys/config'
import 'src/assets/styles/common.sass';
import { withRouter } from "react-router";
import {AppContext, Stage} from "react-pixi-fiber";
import SlotStage from "src/slots/games/snowhoneys/components/SlotStage";
import React from "react";

class Slot extends SlotView {
    static childContextTypes = {
        config: PropTypes.object
    };

    getChildContext() {
        return {
            config
        };
    };

    constructor(props, context) {
        super(props, context);
        this.config = config;
        window.SLOT_CONFIG = config;

    }

    getSlotStage(){
        return <Stage
            width={760}
            height={570}
            options={{
                backgroundColor: 0x5b57a6
            }}
        >
            <AppContext.Consumer>
                {app => (
                    <SlotStage {...this.props} app={app}/>
                )}
            </AppContext.Consumer>
        </Stage>
    }
}

export default withRouter(Slot);