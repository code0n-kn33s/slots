import React from 'react';

import Swiper from 'react-id-swiper';
import 'src/lobby/components/Base/SimpleSlider/_simple_slider.sass';

import 'src/lobby/components/TestNavigationBar/GamesList/_games_list.sass';
import GameIcon from 'src/lobby/components/GameIcon/GameIcon';

export default class GamesList extends React.Component {
  constructor(props) {
    super(props);

    this.swiperParams = {
      containerClass: 'swiper-container-simple swiper-container',
      navigation: {
        nextEl: '.next.swiper-btn',
        prevEl: '.prev.swiper-btn'
      },
      width: 638,
      height: 372,
      speed: 1000,
      spaceBetween: 10,
      on: {
        slideChangeTransitionStart: this.slideInfoChange,
        init: this.slideInfoChange,
      }
    }
  }

  slideInfoChange() {
    var subclass = document.querySelector('.swiper-slide-active').getAttribute('data-subclass');

    document.querySelector('.games-list').classList.remove('bronze', 'silver');
    document.querySelector('.games-list').classList.add(subclass);

    var current_name = document.querySelector('.swiper-slide-active').getAttribute('data-name');
    var current_levels = document.querySelector('.swiper-slide-active').getAttribute('data-levels');

    var title_tag = document.querySelector('.games-list__head').querySelector('.title');
    var subtitle_tag = document.querySelector('.games-list__head').querySelector('.subtitle');

    title_tag.style.opacity = 0;
    subtitle_tag.style.opacity = 0;

    setTimeout(() => {
      title_tag.innerHTML =  current_name;

      subtitle_tag.getElementsByTagName('span')[0].innerHTML = current_levels;
    }, 300);

    setTimeout(() => {
      title_tag.style.opacity = 1;
      subtitle_tag.style.opacity = 1;
    }, 500);
  }

  getGameIcon({GameName, LogoURL}) {
    const sysname = GameName
        .replace(/\s/g, '')
        .replace('\'', '')
        .toLowerCase();

    return <GameIcon
        key={sysname}
        slotName={sysname}
        iconSrc={LogoURL}
        customDisabled={this.props.listAvailableGames.indexOf(sysname) < 0}
    />
  }

  getGamesList(roomInfo) {
    const _gamesList = [];
    roomInfo.Games.forEach(item => {
      _gamesList.push(this.getGameIcon(item));
    });
    return _gamesList
  }

  getRooms() {
    let _roomsList = [];
    for(let room in this.props.roomsList) {
      _roomsList.push(<div
          key={room}
          className="games-list__list"
          data-name="Bronze room"
          data-levels="1-9"
          data-subclass="bronze"
      >
        {this.getGamesList(this.props.roomsList[room])}
      </div>);
    }
    return _roomsList;
  }

  render() {
    return (
        <div className="bronze games-list">
          <div className="games-list__head">
            <p className="title"></p>
            <p className="subtitle">Levels <span></span></p>
          </div>
          <div className="games-list__body">
            <Swiper {...this.swiperParams}>
              {this.getRooms()}
            </Swiper>
          </div>
        </div>
    )
  }
}