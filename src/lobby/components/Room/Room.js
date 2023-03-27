import React from 'react';
import Tabs from '../Base/Tabs/Tabs';
import GamesList from '../GamesList/GamesList';
import Lang from '../Lang/Lang';
import './_room.sass';

const Room = () => (
  <div className="room">

    <div className="room__head">
      <div className="room__title">
        <span className="triangle left"></span>
        <span className="text">Select a game</span>
        <span className="triangle right"></span>
      </div>

      <Lang />
    </div>


    <div className="room__body">
      <Tabs navClass="room__menu"
        navigation={[
          [<span><img src={icon_tab_play} alt="" className="menu-icon" /><span className="text">Games</span></span>, '#tab_01', 'active'],
          [<span><img src={icon_tab_gift} alt="" className="menu-icon" /><span className="text">Gifts</span></span>, '#tab_02', ''],
          [<span><img src={icon_tab_cup} alt="" className="menu-icon" /><img src={icon_tab_life_tournaments} alt=""/></span>, '#tab_03', ''],
          [<span><img src={icon_tab_buy} alt="" className="menu-icon" /><span className="text">Buy Coins</span><img src={icon_tab_sale} alt="" className="icon-sale" /></span>, '#tab_04', ''],
          [<span><img src={icon_tab_share} alt="" className="menu-icon" /><span className="text">Invite</span></span>, '#tab_05', '']
        ]}
        content={[
          [<GamesList />, 'tab_01'],
          ['qwe', 'tab_02'],
          ['asd', 'tab_03'],
          ['zxc', 'tab_04'],
          ['123', 'tab_05']
        ]}
       />
    </div>
  </div>
)

var icon_tab_play = require('../../assets/img/mainmenu_icons/iconTabPlay.png');
var icon_tab_gift = require('../../assets/img/mainmenu_icons/iconTabGift.png');
var icon_tab_cup = require('../../assets/img/mainmenu_icons/iconTabTrophy.png');
var icon_tab_life_tournaments = require('../../assets/img/mainmenu_icons/liveTournaments_low.png');
var icon_tab_buy = require('../../assets/img/mainmenu_icons/iconTabAddCoins.png');
var icon_tab_share = require('../../assets/img/mainmenu_icons/iconTabMegaphone.png');
var icon_tab_sale = require('../../assets/img/header_icons/iconSale.png');

export default Room;
