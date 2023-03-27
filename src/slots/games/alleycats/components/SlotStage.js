import React from 'react';
import SlotCommonStage from "src/slots/common/components/SlotStage";
import Freegame from "src/slots/games/alleycats/components/Freegame";


export default class SlotStage extends SlotCommonStage {
    getFreegameComponent() {
        const {
            slot: {
                resources,
                freegame
            },
            freegameClickOnPin,
            freegameHitOnComplete,
            slotPlaySound
        } = this.props;
        return <Freegame
            images={resources}
            freegame={freegame}
            actions={{
                freegameClickOnPin,
                freegameHitOnComplete,
                slotPlaySound
            }}
        />
    }
}
