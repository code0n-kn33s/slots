import React from 'react';

class CoinsRadio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let input;

    if (this.props.isChecked) {
      input = <input type="radio" id={this.props.id} name={this.props.name} checked />
    } else {
      input = <input type="radio" id={this.props.id} name={this.props.name} />
    }

    return (
      <div className="form-element">
        <div className="radio">
          {input}

          <label htmlFor={this.props.id}>
            {this.props.children}
          </label>
        </div>
      </div>
    );
  }
}

export default CoinsRadio;
