import React from 'react';
import loader from 'src/assets/img/loader.svg'

export default class Loader extends React.Component {
    render() {
        return (
            <div className="loader_wrap">
                <div className="loader">
                    <img src={loader} />
                    {Math.round(this.props.progress * 100) / 100}%
                </div>
            </div>
        );
    }
}