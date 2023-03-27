import React from 'react';
import 'src/assets/styles/App.css';
import 'src/lobby/assets/sass/styles.sass';
import { lobbyApi } from "src/api";
import { asyncComponent } from "src/helpers";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const globalEventTypes = EventController.getTypes();

import Header from 'src/lobby/components/Header/Header';
import FacebookAuth from 'src/lobby/components/Facebook/FacebookAuth';
import NavigationBarContainer from 'src/lobby/components/TestNavigationBar/NavigationBarContainer';

import {AUTH_STATUS} from 'src/lobby/consts/auth';

lobbyApi('slotGameData.php?command=getUserSlotGameDataByID_V2&t=256');

class App extends React.Component {
    constructor() {
        super();
        document.addEventListener('closeGame', () => {
            EventController.dispatch(null, globalEventTypes.SLOT_CLOSE);
        });

        this.AsyncComponent = asyncComponent(() => import('src/slots/common/components/SlotApp'));
    }

    state = {
        isFullScreen: false,
        buyCoinsOpened: false,
        playerBalance: '...',
        playerNexCoinsDelay: 0,
        windowHeight: 0
    };

    showModalBuyCoins = (status) => {
        this.setState({buyCoinsOpened: status});
    }
    hideModalBuyCoins = (status) => {
        this.setState({buyCoinsOpened: status});
    }

    getFullScreenState = (status) => {
        this.setState({isFullScreen: status});
        this.toggleFullScreen();
    }
    toggleFullScreen = () => {
        this.state.isFullScreen ? this.cancelFullscreen() : this.launchFullScreen(document.documentElement);
    }
    launchFullScreen = (element) => {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }
    cancelFullscreen = () => {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }

        if (this.state.isFullScreen) {
            this.setState({isFullScreen: false});
        }
    };

    isAuth() {
        const authStatus = this.props.lobby.authStatus;
        return authStatus === AUTH_STATUS.success || authStatus === AUTH_STATUS.demo;
    }

    componentDidMount() {
        this.props.lobbyInit();

        this.setState({windowHeight: window.innerHeight});

        window.onresize = () => {
            this.setState({windowHeight: window.innerHeight});
        }
    }

    render() {
        var bg_image = require('src/lobby/assets/img/lobby_bg.jpg');
        var wrapper_style = {
            backgroundImage: 'url(' + bg_image + ')'
        };
        const {
            openGameWithLobby,
            roomsList,
            isHaveReadyNavigationBar,
            listAvailableGames,
            authStatus,
            userInfo,
            soundsIsActive,
            slotIsOpen,
            levelsMap,
        } = this.props.lobby;

        const AsyncComponent = this.AsyncComponent;
        return (
            <Router className="App">
                <div
                    className="outer"
                    style={{height:this.state.windowHeight}}
                >
                    <div>
                        <Header
                            userInfo={userInfo}
                            playerBalance={this.state.playerBalance}
                            isShowGame={slotIsOpen}
                            isMobileGameMode={slotIsOpen && !openGameWithLobby }
                            isFullScreen={this.state.isFullScreen}
                            getFullScreenState={this.getFullScreenState}
                            showModalBuyCoins={this.showModalBuyCoins}
                            soundsIsActive={soundsIsActive}
                            soundsToggleAction={this.props.lobbySoundsToggle}
                            levelsMap={levelsMap}
                        />
                        {isHaveReadyNavigationBar && openGameWithLobby ?
                            <FacebookAuth authStatus={authStatus}/>
                        : null}
                    </div>

                    <div className="wrapper" style={wrapper_style}>

                        {isHaveReadyNavigationBar && openGameWithLobby ?
                            <NavigationBarContainer
                                showModalBuyCoins={this.showModalBuyCoins}
                                roomsList={ roomsList }
                                listAvailableGames={ listAvailableGames }
                            /> : null}
                        <Switch>
                            {this.isAuth() ? <Route path='/:sysname' component={AsyncComponent}/> : null}
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
