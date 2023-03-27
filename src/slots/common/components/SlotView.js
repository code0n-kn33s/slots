import React from 'react';
import {Stage} from "react-pixi-fiber";
import Loader from "src/slots/common/components/Loader";
import SlotStage from "src/slots/common/components/SlotStage";
import Paytable from "src/slots/common/components/Paytable";
import SelectButtons from "src/slots/common/components/SelectButtons";
import 'src/assets/styles/common.sass';
import device from 'current-device';
import PayOut from "src/slots/common/components/_deprecated/PayOut";

class SlotView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.sysname = props.match.params.sysname;
        this.config = {};
    }

    componentDidMount() {
        this.props.slotInit({
            sysname: this.sysname,
            config: this.config
        });
    }

    getSlotStage(paytableComponent) {
        return <Stage
            width={760}
            height={570}
            options={{
                backgroundColor: 0x5b57a6
            }}
        >
            <SlotStage {...this.props}/>
            {paytableComponent}
        </Stage>
    }

    render() {
        if (!this.props.slot.isLoadComplete) {
            return <Loader progress={this.props.slot.progressLoading}/>
        } else {
            let paytableComponent = <PayOut
                images={this.props.slot.resources}
                controlsResumeGame={this.props.controlsResumeGame}
            />;

            let isNewPaytable = false;

            // FIXME: костыль чтобы не поломать совместимость со старым пейаутом
            if (
                this.config.infoWindows &&
                'paytable' in this.config.infoWindows
            ) {
                if (this.config.infoWindows.paytable.isNew) {
                    paytableComponent = <Paytable
                        images={this.props.slot.resources}
                        controlsResumeGame={this.props.controlsResumeGame}
                        config={this.config.infoWindows.paytable}
                    />;
                    isNewPaytable = true
                }
            }

            return (
                <div id="gameLayout" className={`gameLayout ${device.mobile() ? 'gameLayout-mobile' : ''}`}>
                    <div  className={'gameItem'}>
                        {!isNewPaytable && this.props.slot.payloadIsShow
                            ? paytableComponent : null
                        }

                        {/*@todo remove this cheat*/}
                        <div className={'cheatButtons_wrapper'}>
                            <button className="button" onClick={this.props.controlsCheatStartBonusGame}>BonusGame</button>
                            <button className="button" onClick={this.props.controlsCheatStartFreespins}>FreeSpins</button>
                        </div>

                        {this.props.slot.selectLinesIsShow
                            ? <SelectButtons
                                selectSteps={this.props.slot.linesSteps}
                                maxStep={this.props.slot.maxLines}
                                activeElement={this.props.slot.lines}
                                textButtonsList={{
                                    plural: 'lines',
                                    singular: 'line',
                                    maxValue: 'MAX LINES'
                                }}
                                selectElementAction={this.props.controlsSelectLine}
                                styles={this.config.controls.selectList.lines}
                            /> : null
                        }
                        {this.props.slot.selectCoinsIsShow
                            ? <SelectButtons
                                selectSteps={this.props.slot.coinsSteps}
                                maxStep={this.props.slot.maxCoins}
                                activeElement={this.props.slot.coins}
                                textButtonsList={{
                                    plural: 'coins',
                                    singular: 'coin',
                                    maxValue: 'MAX COINS'
                                }}
                                selectElementAction={this.props.controlsSelectCoin}
                                styles={this.config.controls.selectList.coins}
                            /> : null
                        }
                        {/*@todo rewrite connection paytableComponent need use slotStage*/}
                        {this.getSlotStage(
                            isNewPaytable && this.props.slot.payloadIsShow && this.sysname !== 'spikesniteout'
                                ? paytableComponent
                                : null
                        )}
                    </div>
                </div>
            )
        }
    }
}

export default SlotView;
