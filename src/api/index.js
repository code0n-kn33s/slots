// http://clickfun.erzig.info//lobby/server/slotGameData.php?command=getServers&t=222&useProxy=false:
// https://clickfun.erzig.info/proxy/slots.php?command=proxy&data=128|HASH:6d1b6e87cca728cb1b241bc0bf52b20d:{%22userid%22:23128837,%22sequence%22:7,%22save%22:%22m_pin5Loop%22,%22gameid%22:1,%22command%22:%22bonusSavePoint%22}
import md5 from "md5";
const salt = '3578eba8-f484-11de-aa57-0018f319a7ae';
import {getHostQueryParams} from "src/helpers";

export function lobbyApi(query) {
    return  fetchMethod(`/lobby/server/${query}`)
}

export function serverApi(data) {
    const dataToString = JSON.stringify(data);
    const queryString = `HASH:${getMd5Summ(dataToString)}:${dataToString}`;
    const query = `/proxy/slots.php?command=proxy&data=${queryString.length}|${queryString}`;

    return fetchMethod(query);
}

export function getManifest(sysname = '') {
    var requestURL = `${window.location.origin}/games/${sysname}/manifest.json`;
    return fetchMethod(requestURL);
}

export function getUserCoockie(path) {
    return fetchMethod('/lobby/auth.php');
}

export function getSymbolsIdMap(slotID) {
    return fetchMethod(`/lobby/slots_symbols.php?slot_id=${slotID}`);
}

export function getSlotOptions(slotID) {
    return fetchMethod(`/lobby/slot_options.php?slot_id=${slotID}`);
}
export function getGamesList(slotID) {
    return fetchMethod(`/lobby/server/games.php?command=getGamesList_V2`);
}

export function setUserLevelUp(userId) {
    return fetchMethod(`/lobby/server/player.php?command=maxLevelUp&UserID=${userId}`);
}

const sessionID = getHostQueryParams('session_id');
export function fetchMethod(query, method = 'GET', data = {}) {
    let headers = {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if(sessionID) {
        headers['X-SESSION-ID'] = sessionID;
    }
    return fetch(query,
        {
            mode: 'cors', // no-cors, cors, *same-origin
            method,
            headers,
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            credentials: "include",
            data
        })
        .then( function( response ) {
            return response.json();
        }).then((response) => {
            const data = response;
            return response;
        });
}

function getMd5Summ(json) {
    return md5(json + salt);
}
