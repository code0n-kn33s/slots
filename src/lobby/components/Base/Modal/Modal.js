import React from 'react';
import './_modal.sass';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };
  }

  show() {
    this.setState(state => ({
      opened: true
    }));
  }

  hide() {
    this.setState(state => ({
      opened: false
    }));

    if (this.props.onCloseModal) {
      this.props.onCloseModal(this.state.opened);
    }
  }

  externalModalClose() {
    this.hide.bind(this);
  }

  render() {
    return (
      <div className={this.state.opened || this.props.statusOpened ? 'modal opened' : 'modal'}>
        <div className="before"></div>

        <div
          id={this.props.id ? this.props.id : null}
          className="modal__container"
          style={this.props.bgImage ? {backgroundImage: 'url(\'' + this.props.bgImage + '\')'} : null}
          // {return (if (this.props.bgImage) {
          //     var wrapper_style = {
          //       backgroundImage: 'url(' + this.props.bgImage + ')'
          //     }
          //     style={wrapper_style}
          //   }
          // )}
        >
          <button className="modal__close button button-red" type="button" onClick={this.hide.bind(this)}>&times;</button>

          {this.props.headTitle ? <div className="modal__head">{this.props.headTitle}</div> : null}

          <div className="modal__body">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
