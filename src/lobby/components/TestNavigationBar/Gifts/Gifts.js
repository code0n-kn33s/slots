import React from 'react';

import './_gifts.sass';

var icon_gift = require('../../../assets/img/room_icons/gift.png');
var icon_friends = require('../../../assets/img/room_icons/friends.png');
var icon_message = require('../../../assets/img/room_icons/message.png');

export default class Gifts extends React.Component {
    render() {
        return (
          <div className="gifts">
            <div className="col col-left">
              <p className="first">Oh No! You have no gifts.</p>

              <div className="second">
                <img src={icon_friends} alt=""/>

                <p>Join the <a href="">Friend Finder</a>, make friends, and never run out of gifts again.</p>
              </div>
            </div>

            <div className="col col-right">
              <button className="gifts-button gift">
                <img src={icon_gift} alt=""/>
                <span className="txt">Send free gifts to your friends</span>
              </button>

              <button className="gifts-button friends">
                <img src={icon_friends} alt=""/>
                <span className="txt">Friend Finder</span>
              </button>

              <button className="gifts-button message">
                <img src={icon_message} alt=""/>
                <span className="txt">Ask for gifts<br/>(Post to Wall)</span>
              </button>
            </div>
          </div>
        );
    }
}
