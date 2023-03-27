import React from "react";
import PropTypes from 'prop-types';
import SlotView from "src/slots/common/components/SlotView";
import config from 'src/slots/games/spikesniteout/config'
import 'src/assets/styles/common.sass';
import { withRouter } from "react-router";
import {Stage} from "react-pixi-fiber";
import SlotStage from "src/slots/games/spikesniteout/components/SlotStage";

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

    getSlotStage() {
        return <Stage
            width={760}
            height={570}
            options={{
                backgroundColor: 0x5b57a6
            }}
        >
            <SlotStage {...this.props}/>
        </Stage>
    }

}

export default withRouter(Slot);
