import {fetchMethod, getUserCoockie, lobbyApi} from "src/api";
let globalEventTypes = EventController.getTypes();
import * as actionTypes from "src/lobby/actionTypes";
import {getHostQueryParams} from "src/helpers";
let numberOfAttempt = 0;
const maxNumberOfAttempt = 4;
const delayTime = 1000;

function handle_fb_data(response){
    FB.api('/me', async function (response) {
        console.log('Successful login for: ' + response.name);
        console.log('Прилитело из ФБ: ' + JSON.stringify(response));

        if(!getHostQueryParams('session_id')) {
            await getUserCoockie();
        }

        lobbyApi('player.php?command=getInitialPlayerDataV2').then((data) => {
            EventController.dispatch(data, actionTypes.LOBBY_SET_USER_INFO);
            EventController.dispatch(data, globalEventTypes.AUTH_FACEBOOK_SUCCESS);
        }).catch(() => {
            if(numberOfAttempt < maxNumberOfAttempt) {
                setTimeout(fb_login, delayTime);
            } else {
                EventController.dispatch(null, globalEventTypes.AUTH_FACEBOOK_ERROR);
            }
            console.log('Ошибка получения куки для Facebook');
        });
    });
}

export function fb_login() {
    numberOfAttempt++;

    EventController.dispatch(null, globalEventTypes.AUTH_FACEBOOK_ATTEMPT);
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            handle_fb_data(response);
        } else {
            console.log('Юзер был не залогинен в самом ФБ, запускаем окно логинизирования');
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    handle_fb_data(response);
                } else {
                    console.log('Походу пользователь передумал логиниться через ФБ');
                }
            });
        }
    }, {
        scope: 'email,id'
    });
}

window.fbAsyncInit = function() {
    if(window.location.protocol == 'https:') {
        FB._https = true;
    }
    FB.init({
        appId: '697035654100874',
        status: true,
        cookie: true,
        xfbml: true,
        version    : 'v2.3'
    });
};
    // Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));