import React from 'react';
import Swiper from 'react-id-swiper';

const swiperParams = {
    containerClass: 'swiper-container-payTable swiper-container',
    loop: true,
    navigation: {
        prevEl: '.slot_payTable_prev',
        nextEl: '.slot_payTable_next'
    },
    renderPrevButton: () => <button className="button slot_payTable_prev">Prev</button>,
    renderNextButton: () => <button className="button slot_payTable_next">Next</button>,
    width: 760,
    height: 570,
    speed: 1000,
    spaceBetween: 10
};

export default class PayOutCustom extends React.Component {
    render() {
        return (
            <div
                className="slot_payTable customPayTable"
                style={
                    {backgroundImage: `url(${this.props.images['payTable.png'].url})`}
                }>
                <Swiper {...swiperParams}>
                    <div className="slot_payTable_item slot_payTable_item_page1">
                        <img
                            className="slot_image_asset"
                            src={this.props.images['bonusAsset.png'].url}
                        />
                    </div>
                    <div className="slot_payTable_item slot_payTable_item_page2">
                        <img
                            className="slot_image_asset"
                            src={this.props.images['rulesAsset.png'].url}
                        />
                    </div>
                </Swiper>
                <button className="button slot_payTable_resume_img" onClick={this.props.controlsResumeGame}>
                    <img
                        src={this.props.images['resumeButton.png'].url} />
                </button>
            </div>
        )
    }
}
