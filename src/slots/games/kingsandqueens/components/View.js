import PropTypes from 'prop-types';
import SlotView from "src/slots/common/components/SlotView";
import config from 'src/slots/games/kingsandqueens/config'
import 'src/assets/styles/common.sass';
import { withRouter } from "react-router";

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
}

export default withRouter(Slot);