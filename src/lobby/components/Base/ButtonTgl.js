import React from 'react';

class ButtonTgl extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    trueValue: 'On',
    falseValue: 'Off',
    buttonId: ''
  };

  handleClick() {
    this.props.clickHandle({soundsIsActive: !this.props.soundsIsActive});
  }
 
  render() {
    return (
      <button id={this.props.buttonId} className="button" onClick={this.handleClick}>
        {this.props.soundsIsActive ? this.props.trueValue : this.props.falseValue }
      </button>
    );
  }
}

export default ButtonTgl;
