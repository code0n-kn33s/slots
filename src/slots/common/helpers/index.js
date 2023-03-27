import {random} from "lodash";

export const checkIntersection = (a1 = [], a2 = [], b1 = [], b2 = []) => {
    let d = (a1[0] - a2[0]) * (b2[1] - b1[1]) - (a1[1] - a2[1]) * (b2[0] - b1[0]);
    let da = (a1[0] - b1[0]) * (b2[1] - b1[1]) - (a1[1] - b1[1]) * (b2[0] - b1[0]);
    let db = (a1[0] - a2[0]) * (a1[1] - b1[1]) - (a1[1] - a2[1]) * (a1[0] - b1[0]);

    if (Math.abs(d) < Number.EPSILON) {
        return []; // segments on a parallel straight line
    } else {
        let ta = da / d;
        let tb = db / d;

        if (0 <= ta && ta <= 1 && 0 <= tb && tb <= 1) {
            let x = a1[0] + ta * (a2[0] - a1[0]);
            let y = a1[1] + ta * (a2[1] - a1[1]);
            return [Math.round(x), Math.round(y)];
        } else {
            return []; // segments do not intersect
        }
    }
};

export function getStartAdditionalAnimation(specialSymbol, serverSpinAnswerSymbols) {
    const mapAnimation = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]];
    serverSpinAnswerSymbols.forEach((reel, reelIndex) => {
        reel.forEach((symbol, symbolIndex) => {
            if(symbol === specialSymbol) {
                mapAnimation[reelIndex][symbolIndex] = 1
            }
        })
    });
    return mapAnimation
}

export function getActualMapAnimation(lines, linesLenght, serverSpinAnswerSymbols) {
    const mapAnimation = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]];
    const winLinesMapSymbols = window.SLOT_CONFIG.lines.winLinesMapSymbols;

    if(lines.length) {
        for(let i = 0; i < lines.length; i++) {
            if(lines[i] > 0) {
                const activeMapLine = winLinesMapSymbols[lines[i]];
                for(let j = 0; j < linesLenght[i]; j++) {
                    mapAnimation[j][activeMapLine[j]] = 1;
                }
            }
        }
    }
    return mapAnimation
}

export function getWinLinesInfo(payScheduleIDs, paySchedule) {
    const winLinesScores = [];

    payScheduleIDs.forEach(id => {
        if (typeof paySchedule[id] !== 'undefined') {
            winLinesScores.push(paySchedule[id]['pays_tokens']);
        } else {
            console.error('Wrong pays_tokens in payShedule ' + id);
        }
    });

    return { winLinesScores };
}

export function createNewSymbolsIdMap(symbolsIdMapFromServer) {
    const symbolsIdMap = {};
    if(symbolsIdMapFromServer) {
        symbolsIdMapFromServer.forEach((element) => {
            const symbolId = element['symbol_number'];
            element['id_list'].forEach((item) => {
                symbolsIdMap[item] = symbolId;
            });
        });
    }
    return symbolsIdMap;
}

export function createLinesMap(linesMapFromServer) {
    const linesMap = {};
    if(linesMapFromServer) {
        linesMapFromServer.forEach((element) => {
            const lineId = element['line'];
            let lineMap = [];
            element['positions'].forEach((position) => {
                lineMap.push(position['y']);
            });

            linesMap[lineId] = lineMap;
        });
    }
    return linesMap;
}

export function createPaySchedule(payScheduleFromServer) {
    const paySchedule = {};
    if(payScheduleFromServer) {
        payScheduleFromServer.forEach((item) => {
            paySchedule[item['pay_schedule_id']] = item;
        });
    }
    return paySchedule;
}

export function getMapSymbols(matrix, symbolsIdMap) {
    const mapSymbols = [[], [], [], [], []];
    matrix.forEach(({ReelNumber, Y, SymbolID}) => {
        mapSymbols[ReelNumber][Y] = symbolsIdMap[Number(SymbolID)];
    });
    return mapSymbols
}

export function getWinLines(winLinesFromServer = [], symbolsIdMap) {
    const winLines = [];
    const winLinesPayScheduleIDs = [];
    const winLinesScores = [];
    const linesLength = [];
    const winSymbols = [];

    winLinesFromServer.forEach(winLineInfo => {
        const { PayLineNumber, Count, SymbolID, PayScheduleID } = winLineInfo;
        winLines.push(PayLineNumber);
        winLinesPayScheduleIDs.push(PayScheduleID);
        winLinesScores.push(Count);
        linesLength.push(Count);
        winSymbols.push(symbolsIdMap[SymbolID]);
    });

    return {
        winLines,
        winLinesPayScheduleIDs,
        winLinesScores,
        linesLength,
        winSymbols
    }
}

//todo create correct processing win
//todo remove Math.round for this function
export function getBonusGameWins(countSteps, commonWin) {
    const isEqualWins = !!random(0, 1);
    // if(isEqualWins && commonWin % countSteps === 0) {
        return new Array(countSteps).fill(Math.round(commonWin / countSteps));
    // } else {
    //     const firstItem = commonWin / 2 - (commonWin % 2) / 2;
    //     const secondItem = firstItem % 2 === 0 ? firstItem / 2 : firstItem / 2 - (firstItem % 2) / 2;
    //     const thirdItem = firstItem - secondItem + commonWin % 2;
    //     return [firstItem, secondItem, thirdItem];
    // }
}

export function getAvailableItemsDefault(availableItemsCount) {
    let availableItems = {};
    for(let i = 1; i <= availableItemsCount; i++) {
        availableItems[i] = {
            isActive: true,
            animation: 'default'
        }
    }
    return availableItems;
}
