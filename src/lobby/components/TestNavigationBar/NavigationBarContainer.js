import React from 'react';
import Lang from '../Lang/Lang';
import Games from './GamesList/GamesList';
import Gifts from './Gifts/Gifts';
import Tournaments from './Tournaments/Tournaments';
import BuyCoins from './BuyCoins';
import Invite from './Invite';
import '../Room/_room.sass';
import '../Base/Tabs/_tabs.sass';

var icon_tab_play = require('../../assets/img/mainmenu_icons/iconTabPlay.png');
var icon_tab_gift = require('../../assets/img/mainmenu_icons/iconTabGift.png');
var icon_tab_cup = require('../../assets/img/mainmenu_icons/iconTabTrophy.png');
var icon_tab_buy = require('../../assets/img/mainmenu_icons/iconTabAddCoins.png');
var icon_tab_share = require('../../assets/img/mainmenu_icons/iconTabMegaphone.png');
var icon_tab_sale = require('../../assets/img/header_icons/iconSale.png');

export default class NavigationBarContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        activeTab: 'Games',
        content: {
            Games: {
                title: 'Games',
                iconUrl: icon_tab_play,
                component: <Games
                    roomsList={this.props.roomsList}
                    listAvailableGames={this.props.listAvailableGames}
                />
            },
            Gifts: {
                title: 'Gifts',
                iconUrl: icon_tab_gift,
                component: <Gifts />
            },
            Tournaments: {
                title: 'Tournaments',
                iconUrl: icon_tab_cup,
                component: <Tournaments />
            },
            BuyCoins: {
                title: 'Buy Coins',
                iconUrl: icon_tab_buy,
                subicon: icon_tab_sale,
                component: <BuyCoins />
            },
            Invite: {
                title: 'Invite',
                iconUrl: icon_tab_share,
                component: <Invite />
            }
        }
    };

    setNewTab(activeTab, nameId) {
        nameId !== 'BuyCoins' ? this.setState({activeTab}) : this.props.showModalBuyCoins(true);
    }

    getElementTab(iconUrl, title, subicon, nameId) {
        return (
            <li
                className={nameId === this.state.activeTab ? 'active' : ''}
                onClick={this.setNewTab.bind(this, nameId, nameId)}
                key={title}
            >
                <span>
                    <img src={iconUrl} alt="" className="menu-icon" />
                    <span className="text">{title}</span>

                    {subicon &&
                      <img src={subicon} alt="" className="icon-sale" />
                    }
                </span>
            </li>
        )
    }

    getAllTabs() {
        const contentList = this.state.content;
        const tabsList = [];

        for(let element in contentList) {
            const {
                iconUrl,
                subicon,
                title
            } = contentList[element];

            tabsList.push(
                this.getElementTab(iconUrl, title, subicon, element)
            );
        }

        return tabsList
    }

    render() {
        const {content, activeTab} = this.state;

        return <div className="room">

          <div className="room__head">
            <div className="room__title">
              <span className="triangle left"></span>
              <span className="text">Select a game</span>
              <span className="triangle right"></span>
            </div>

            <Lang />
          </div>

            <div className="room__body">
                <div className="tabs__outer">
                    <ul className="tabs__nav room__menu">
                        {this.getAllTabs()}
                    </ul>

                    <div className="tabs">
                        <div className="tabs__content">
                            {content[activeTab].component}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
