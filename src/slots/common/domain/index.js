import LoaderConstructor from "../loader";
import {INFO_WINDOWS_STATUS} from 'src/slots/common/constants/infoWindows';
import {createLinesMap, createNewSymbolsIdMap, createPaySchedule} from "src/slots/common/helpers";
import {actions} from "../actions";
import {getManifest, getSlotOptions, serverApi} from "src/api";
import _SoundController from "../soundController";

const globalEventTypes = EventController.getTypes();
let SoundController = new _SoundController();

export async function handleInitSlotStart(getState, dispatch, params) {
    const {slotName} = getState().slot;
    getManifest(slotName).then((data) => {
        const loader = new LoaderConstructor(data, dispatch);
        loader.init();
    });
    EventController.dispatch(null, globalEventTypes.SLOT_INIT);
}

export async function handleSlotGetSettings(getState, dispatch) {
    const {
        slot: {
            gameId
        }
    } = getState();
    const slotOptions = await getSlotOptions(gameId);
    const newSymbolsIdMap = createNewSymbolsIdMap(slotOptions.symbols);
    const linesMap = createLinesMap(slotOptions.lines);
    const pay_schedule = createPaySchedule(slotOptions.pay_schedule);
    dispatch(actions.setSymbolsIdMap(newSymbolsIdMap));
    dispatch(actions.setPaySchedule(pay_schedule));
}

export async function handleSlotSoundsToggle(params, getState, dispatch) {
    if (params.soundsIsActive) {
        SoundController.unmuteAllSounds();
    } else {
        SoundController.muteAllSounds();
    }
}

export async function handleSlotPlaySound({soundName}) {
    SoundController.playSound(soundName);
}

export async function handleCloseSlot() {
    SoundController.destroy();
}

export function handleSlotLoadComplete(getState, dispatch) {
    const {resources, soundsIsActive} = getState().slot;
    EventController.dispatch(null, globalEventTypes.SLOT_LOAD_COMPLETE);
    SoundController.initSoundManifest(resources, soundsIsActive);
    SoundController.playSound('music_base_01.mp3', { loop: true});
}

export function handleControlsMaxLines(getState, dispatch) {
    //dispatch(actions.controlsSpiningStart());
}

// @todo remove this cheat
export function handleControlsStartBonusGame(getState, dispatch) {
    dispatch(actions.controlsSpiningStart());
}
export function handleControlsStartFreespins(getState, dispatch) {
    dispatch(actions.controlsSpiningStart());
}

export async function handleSlotSpinStart(getState, dispatch, state) {
    SoundController.playSound('reel_spin_01.mp3');
    dispatch(actions.reelSpin({reelIndex: 0}));
    const startTimer = new Date();
    const data = await serverApi({
        command: "spin",
        slotgameid: state.gameId,
        lines: state.lines,
        coins: state.coins,
        coinSize: 1,
        sequence: state.sequence,
        userid: state.userId
    });
    const awaitTimer = new Date() - startTimer;
    const timeForAwait = awaitTimer < 2000 ? 2000 - awaitTimer : 0;

    // @todo remove this cheat for production
    if (
        data.messages[0].MessageType === "SPIN_RESULT_MESSAGE"
    ) { //cheats
        if (state.cheatStartFreeSpins) {
            data.messages[0].freeSpins = 1
        }
        if (state.cheatStartBonusGame) {
            data.messages[0].bonusSeed = 1
        }
    }

    setTimeout(() => {
        dispatch(actions.controlsSpiningStop(data));
    }, timeForAwait);
}

export function handleSlotSpinStop(getState, dispatch, {userData}) {
    SoundController.stopSound('reel_spin_01.mp3');

    dispatch(actions.reelStop({reelIndex: 0}))

    EventController.dispatch({userData}, globalEventTypes.SPIN_STOP_CALLBACK);
}

export function handleSlotReelStartRotate(getState, dispatch, {reelIndex}) {
    if (reelIndex < 5) {
        setTimeout(() => {
            dispatch(actions.reelSpin({reelIndex: ++reelIndex}));
        }, 100)
    }
}

export function handleSlotReelStopRotate(getState, dispatch, {reelIndex}) {
    if (reelIndex < 5) {
        setTimeout(() => {
            SoundController.playSound(`reel_stop_0${reelIndex + 1}.mp3`);
            // SoundController.playSound(`stop.mp3`);
            dispatch(actions.reelStop({reelIndex: ++reelIndex}));
        }, 400)
    } else {
        dispatch(actions.reelsStopped());
    }
}

export function handleSlotReelsStopped(getState, dispatch) {
    dispatch(actions.startShowingLines());
}

export function handleSlotShowingLines(getState, dispatch, {indexActiveLine, winSymbols, activeLines, isShowLines}) {
    const {
        serverSpinAnswerLinesFreegame,
        serverSpinAnswerLinesFreespins
    } = getState().slot;
    const _indexActiveLine = indexActiveLine !== undefined ? ++indexActiveLine : 0;

    if (isShowLines && activeLines.length - 1 >= _indexActiveLine) {
        const delay = _indexActiveLine > 0 ? 4500 : 0;
        setTimeout(() => {
            const winSymbol = winSymbols[_indexActiveLine];
            SoundController.playSound(`sym_${Number(winSymbol) < 10 ? '0' : ''}${winSymbol}.mp3`);
            dispatch(actions.showingLines({indexActiveLine: _indexActiveLine}));
        }, delay);
    } else {
        if (
            isShowLines &&
            activeLines.length > 1 &&
            !serverSpinAnswerLinesFreegame &&
            serverSpinAnswerLinesFreespins === 0
        ) {
            dispatch(actions.showingLinesLoop());
        }
        dispatch(actions.showedLines());
    }
}

export function handleShowingLinesLoop(getState, dispatch, {indexActiveLine, activeLines}) {
    const _indexActiveLine = indexActiveLine !== undefined ? ++indexActiveLine : 0;
    if (activeLines.length - 1 >= _indexActiveLine) {
        setTimeout(() => {
            dispatch(actions.showingLines({indexActiveLine: _indexActiveLine}));
        }, 4500);
    } else {
        dispatch(actions.showingLinesLoop());
    }
}

let _enableFreeSpins = false;
let _enableBonusGame = false;

export function handleSlotLinesShowed(getState, dispatch) {
    const state = getState();

    let bonusGameIsHave = _enableBonusGame ? _enableBonusGame : state.slot.serverSpinAnswerLinesFreegame;

    if (_enableBonusGame) {
        _enableBonusGame = false;
    }

    if (bonusGameIsHave) {
        dispatch(actions.startSpecialSymbolsAnimation({specialSymbol: 11}));
        setTimeout(() => {
            dispatch(actions.freegameShow());
        }, 2000);
        return
    }

    dispatch(actions.continueAfterSpin());
}

export function handleContinueAfterSpin(getState, dispatch) {
    const state = getState();
    const freespinsCount = _enableFreeSpins ? 10 : state.slot.serverSpinAnswerLinesFreespins;

    if (_enableFreeSpins) {
        _enableFreeSpins = false;
    }

    if (freespinsCount > 0) {
        dispatch(actions.startSpecialSymbolsAnimation({specialSymbol: 12}));
        setTimeout(() => {
            dispatch(actions.setFreespinsCount({count: freespinsCount}));
            dispatch(actions.slotShowInfoWindow({
                typeInfoWindow: INFO_WINDOWS_STATUS.freeSpinsStart
            }));
        }, 2000);
        return
    }

    if (state.slot.freespins.isActive) {
        if (state.slot.freespins.count > 0) {
            dispatch(actions.controlsSpiningStart());
            dispatch(actions.changeCountFreespins());
        } else {
            dispatch(actions.slotShowInfoWindow({
                typeInfoWindow: INFO_WINDOWS_STATUS.freeSpinsEnd
            }));
        }
    }
}

export function handleOpenBonusGame() {
    SoundController.stopSound(`music_base_01.mp3`);
    SoundController.playSound(`bonus_music.mp3`);
}

export function handleCloseBonusGame(getState, dispatch) {
    SoundController.stopSound(`bonus_music.mp3`);
    SoundController.playSound(`bonus_music_end.mp3`);

    dispatch(actions.continueAfterSpin());
}

export async function handleFreegameClickOnPin(getState, dispatch, params) {
    const {
        userId,
        gameId,
        sequence
    } = getState().slot;
    const startTimer = new Date();

    SoundController.playSound(`selectionBonus.mp3`);

    const data = await serverApi({
        command: "bonusSavePoint", 
        gameid: gameId,
        userid: userId,
        save: `m_pin${params.pinID}Loop`,
        sequence
    });
    const awaitTimer = new Date() - startTimer;
    const timeForAwait = awaitTimer < 2000 ? 2000 - awaitTimer : 0;


    dispatch(actions.freegameStartHit({
        ...params,
        ...data
    }));
}

export function handleHitOnComplete(getState, dispatch) {
    dispatch(actions.freegameSetResultHitOnPick());
}

export function handleSetResultHitOnPin(getState, dispatch) {
    const {openedObjectsCount, maxBonusGameSteps} = getState().slot.freegame;
    if (openedObjectsCount >= maxBonusGameSteps) {
        setTimeout(() => {
            dispatch(actions.slotShowInfoWindow({
                typeInfoWindow: INFO_WINDOWS_STATUS.bonusGameEnd
            }));
        }, 2000);
    } else {
        dispatch(actions.freegameUnlockItemsForClick());
    }
}

export function handleFreespinsStart(getState, dispatch) {
    dispatch(actions.controlsSpiningStart());
    dispatch(actions.changeCountFreespins());
}

export function handleHideFreespinsStartNotification(getState, dispatch) {
    dispatch(actions.slotHideInfoWindow());
    dispatch(actions.startFreespins());
}

export function handleHideFreespinsEndNotification(getState, dispatch) {
    dispatch(actions.slotHideInfoWindow());
    dispatch(actions.endFreespins());
}
