import React from 'react';
import './_game_icon.sass';
import {
  NavLink
} from "react-router-dom";

class GameIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classList: this.props.customDisabled ? 'game-icon disabled' : 'game-icon'
    };
  }

  render() {
    const { slotName, iconSrc, customDisabled } = this.props;

    return (
      <div className={this.state.classList} >
          {customDisabled ?
              <div>
                <img className="logo" src={iconSrc} alt=""/>
              </div> :
              <NavLink to={{pathname: `/${slotName}` }}>
                <img className="logo" src={iconSrc} alt=""/>
              </NavLink >
          }

      </div>
    )
  }
}

export default GameIcon;
