import React from 'react';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count_time: new Date()
    };
  }

  componentDidMount() {
    this.countdownID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.countdownID);
  }

  /**
   * --------------------------------------------------
   * System methods
   * --------------------------------------------------
   */

  /**
   * Ежесекундное обновление обратного отсчета
   */
  tick() {
    this.setState((state, props) => ({
      count_time: new Date(props.count_time - new Date())
    }));
  }

  /**
   * --------------------------------------------------
   * Render
   * --------------------------------------------------
   */

  render() {
    return (
      <span>{this.state.count_time.toLocaleTimeString()}</span>
    );
  }
}

export default Countdown;
