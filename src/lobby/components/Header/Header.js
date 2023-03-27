import React from 'react';
import Countdown from '../Base/Countdown';
import ButtonTgl from '../Base/ButtonTgl';
import Tooltip from '../Base/Tooltip/Tooltip';
import './_header.sass';
import {NavLink} from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCloseWebView() {
    if(typeof Android !== "undefined" && Android !== null) {
      Android.backToMenu();
    } else {
      window.location.assign('inapp://close');
    }
  }

  render() {
    const props = this.props;
    const {
      levelProgressStatus,
      level,
      levelXp,
      levelMaxProgress
    } = props.userInfo;
    const currentLevelData = props.levelsMap[ level ]
    const nextLevelData = props.levelsMap[ level+1 ]

    return (
        <header className={"header " + (props.isMobileGameMode ? 'ingame' : '') }>
          <div className="line_first header__line">
            { props.isMobileGameMode ?
            <button onClick={this.handleCloseWebView.bind(this)} id="header__btn-play" className="button">Back</button>
            : null}


            <div className="header__coins_outer btn__outer-black">
              <img src={icon_coins} alt="" className="header__icon icon-coins"/>

              <div className="header__coins">{props.userInfo.balance}</div>

              <button id="header__btn-buy" className={"header__btn-buy button " + (!props.isMobileGameMode ? 'button-green'  : '')} onClick={props.showModalBuyCoins.bind(true, true)}>Buy Coins
                <img src={icon_sale} alt="" className="header__icon icon-sale"/>
              </button>
            </div>

            <div className="header__bonuses_outer btn__outer-black  tooltip__outer">
              <img src={icon_bonus} alt="" className="header__icon icon-bonus"/>

              <div className="header__bonuses"><Countdown count_time={new Date()}/></div>

              <Tooltip position="bottom" triangle="center">
                <div className="flex miw250 maw100p">
                  <img src={icon_bonus} alt=""/>
                  <div className="pl15 fs16 fw700">Get 350 free coins every hour, and spin the Super Bonus Wheel once a day,
                    every day!
                  </div>
                </div>
              </Tooltip>
            </div>

            <div className="header__exp_outer btn__outer-black tooltip__outer">
              <img src={icon_star} alt="" className="header__icon icon-star"/>

              <div className="line" style={ {width: `${levelProgressStatus}%` } }/>

              <div className="value">Level {level} - {levelXp} / {levelMaxProgress}</div>

              {/*<img src={icon_medal} alt="" className="header__icon icon-medal"/>*/}

              { currentLevelData && nextLevelData ?
              <Tooltip position="bottom">
                <div className="flex miw250 maw100p">
                  <div className="level_tooltip">
                    <p className="subtitle">You're on <span className="orange">Level {level}</span>, <br/>whitch has these benefits:
                    </p>
                    <div className="tooltip_line">
                      <span className="icon"><img src={tltp_icon_maxbet} alt=""/></span>
                      <p className="text">Max bet per line = { currentLevelData.m_maxCoinsPerLine } coins</p>
                    </div>
                    <div className="tooltip_line">
                      <span className="icon"><img src={tltp_icon_maxlines} alt=""/></span>
                      <p className="text">Max Lines = { currentLevelData.m_maxLinesPerBet } lines</p>
                    </div>
                    <div className="tooltip_line">
                      <span className="icon"><img src={tltp_icon_gifts} alt=""/></span>
                      <p className="text">Gift you receive = { currentLevelData.m_bonusCoins } coins</p>
                    </div>

                    <p className="subtitle">Reach <span className="orange">Level {level+1}</span> and you'll get:</p>

                    <div className="tooltip_line">
                      <span className="icon"><img src={tltp_icon_coins} alt=""/></span>
                      <p className="text">Level-up bonus = { nextLevelData.m_bonusCoins } coins</p>
                    </div>
                    <div className="tooltip_line">
                      <span className="icon"><img src={tltp_icon_maxbet} alt=""/></span>
                      <p className="text">Max bet per line = { nextLevelData.m_maxCoinsPerLine } coins</p>
                    </div>
                    <div className="tooltip_line">
                      <span className="icon"><img src={tltp_icon_maxlines} alt=""/></span>
                      <p className="text">Max Lines = { nextLevelData.m_maxLinesPerBet} lines</p>
                    </div>
                    { nextLevelData.m_bonusUnlockKeys > 0 ?
                    <div className="tooltip_line">
                      <span className="icon"><img src={tltp_icon_unlock} alt=""/></span>
                      <p className="text">Unlock { nextLevelData.m_bonusUnlockKeys } game</p>
                    </div>
                    : null }
                    <div className="tooltip_line">
                      <span className="icon"><img src={tltp_icon_gifts} alt=""/></span>
                      <p className="text">Gift you receive = { nextLevelData.m_bonusCoins } coins</p>
                    </div>

                    <div className="fs14 blue-light mt10">Reach the next level by playing Clickfun Casino Slots. The amount
                      that you bet on each spin is added to this counter. When the counter reaches { nextLevelData.m_minProgress - 1 } you'll go up to Level { level+1 }
                    </div>
                  </div>
                </div>
              </Tooltip>
              : null }

            </div>
          </div>

          <div className="line_second header__line">
            <NavLink to="/">
              <button id="header__btn-play" className="button">{props.isShowGame ? "Back To Lobby" : "Play"}</button>
            </NavLink>

            <div className="header__bottom_line">
              <img className="left" src={bottom_line_left} alt=""/>
              <img className="center" src={bottom_line_center} alt=""/>
              <img className="right" src={bottom_line_right} alt=""/>
            </div>

            <div className="header__bottom-buttons">
              <div className="tooltip__outer">
                <button id="header__btn-resize" className="button"
                        onClick={props.getFullScreenState.bind(true, !props.isFullScreen)}>{props.isFullScreen ?
                    <img src={icon_exit_fullscreen} alt=""/> : <img src={icon_go_fullscreen} alt=""/>}</button>

                <Tooltip position="bottom" triangle="center">
                  <div className="nowrap">Full screen</div>
                </Tooltip>
              </div>

              <div className="tooltip__outer">
                <ButtonTgl
                    buttonId="header__btn-sounds"
                    trueValue={<img src={icon_sounds_on} alt=""/>}
                    falseValue={<img src={icon_sounds_off} alt=""/>}
                    soundsIsActive={this.props.soundsIsActive}
                    clickHandle={this.props.soundsToggleAction}
                />

                <Tooltip position="bottom-right" triangle="right">
                  <div className="nowrap fs16 fw700 mb10">Sound is <span className="orange fs20">OFF</span></div>
                  <div className="fs14 blue-light">Click the button to unmute the sound.</div>
                </Tooltip>
              </div>
            </div>
          </div>
        </header>
    );
  }
}


var icon_coins = require('../../assets/img/header_icons/iconHeaderCoins.png');
var icon_sale = require('../../assets/img/header_icons/iconSale.png');

var icon_bonus = require('../../assets/img/header_icons/iconHeaderBonus.png');

var icon_star = require('../../assets/img/header_icons/iconHeaderLevel.png');
var icon_medal = require('../../assets/img/header_icons/iconHeaderPrize.png');

var bottom_line_left = require('../../assets/img/header_icons/tickerCapLeft.png');
var bottom_line_center = require('../../assets/img/header_icons/tickerTile.png');
var bottom_line_right = require('../../assets/img/header_icons/tickerCapRight.png');

var icon_go_fullscreen = require('../../assets/img/header_icons/iconEnterFullScreen.png');
var icon_exit_fullscreen = require('../../assets/img/header_icons/iconExitFullScreen.png');

var icon_sounds_on = require('../../assets/img/header_icons/iconSoundOn.png');
var icon_sounds_off = require('../../assets/img/header_icons/iconSoundOff.png');

var tltp_icon_bonus = require('../../assets/img/tooltip_new_lvl/iconSmallBonus.png');
var tltp_icon_maxbet = require('../../assets/img/tooltip_new_lvl/iconSmallBet.png');
var tltp_icon_maxlines = require('../../assets/img/tooltip_new_lvl/iconSmallLines.png');
var tltp_icon_gifts = require('../../assets/img/tooltip_new_lvl/iconSmallGift.png');
var tltp_icon_coins = require('../../assets/img/tooltip_new_lvl/iconSmallCoins.png');
var tltp_icon_unlock = require('../../assets/img/tooltip_new_lvl/iconSmallUnlock.png');
var tltp_icon_play = require('../../assets/img/tooltip_new_lvl/iconSmallPlay.png');
var tltp_icon_star = require('../../assets/img/tooltip_new_lvl/iconSmallLevel.png');
