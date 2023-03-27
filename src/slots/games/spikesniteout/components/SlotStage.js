import React from 'react';
import SlotCommonStage from "src/slots/common/components/SlotStage";
import Freegame from "src/slots/games/spikesniteout/components/Freegame";
import Paytable from "src/slots/common/components/_updated/Paytable";

export default class SlotStage extends SlotCommonStage {
    getFreegameComponent() {
        const {
            slot: {
                resources,
                freegame
            },
            freegameClickOnPin,
            freegameHitOnComplete
        } = this.props;
        return <Freegame
            images={resources}
            freegame={freegame}
            actions={{
                freegameClickOnPin,
                freegameHitOnComplete
            }}
        />
    }

    getPayTable() {
        const resources = this.props.slot.resources;
        return <Paytable
            images={resources}
            controlsResumeGame={this.props.controlsResumeGame}
            config={this.infoWindowsContent.paytable}
        />
    }
}
