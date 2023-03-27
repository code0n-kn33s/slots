import React from 'react';
import SlotCommonStage from "src/slots/common/components/SlotStage";
import Freegame from "src/slots/games/gypsyqueen/components/Freegame";


export default class SlotStage extends SlotCommonStage {
    getFreegameComponent() {
        const {
            slot: {
                resources,
                freegame
            },
            app,
            freegameClickOnPin,
            freegameHitOnComplete,
            slotPlaySound
        } = this.props;
        return <Freegame
            app={app}
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
