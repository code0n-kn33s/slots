import React from 'react';
import './_room_menu.sass';

const RoomMenu = () => (
  <ul className="room__menu">
    <li className="active">
      <img src={icon_tab_play} alt="" className="menu-icon" />
      <span className="text">Games</span>
    </li>
    <li>
      <img src={icon_tab_gift} alt="" className="menu-icon" />
      <span className="text">Gifts</span>
    </li>
    <li>
      <img src={icon_tab_cup} alt="" className="menu-icon" />
      <img src={icon_tab_life_tournaments} alt=""/>
    </li>
    <li>
      <img src={icon_tab_buy} alt="" className="menu-icon" />
      <span className="text">Buy Coins</span>
      <img src={icon_tab_sale} alt="" className="icon-sale" />
    </li>
    <li>
      <img src={icon_tab_share} alt="" className="menu-icon" />
      <span className="text">Invite</span>
    </li>
  </ul>
)

var icon_tab_play = require('../../../assets/img/mainmenu_icons/iconTabPlay.png');
var icon_tab_gift = require('../../../assets/img/mainmenu_icons/iconTabGift.png');
var icon_tab_cup = require('../../../assets/img/mainmenu_icons/iconTabTrophy.png');
var icon_tab_life_tournaments = require('../../../assets/img/mainmenu_icons/liveTournaments_low.png');
var icon_tab_buy = require('../../../assets/img/mainmenu_icons/iconTabAddCoins.png');
var icon_tab_share = require('../../../assets/img/mainmenu_icons/iconTabMegaphone.png');
var icon_tab_sale = require('../../../assets/img/header_icons/iconSale.png');

export default RoomMenu;
