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

export default class PayOut extends React.Component {
    render() {
        return (
            <div className="slot_payTable" style={{backgroundImage: `url(${this.props.images['payTable.png'].url})`}}>
                <Swiper {...swiperParams}>
                    <div className="slot_payTable_item slot_payTable_item_page1">
                        <img
                            className="slot_payTable_item_image"
                            src={this.props.images['payTablePage1.png'].url}
                        />

                        <div className="slot_payTable_item_discription">
                            <div>
                                <h1>Free Spins scatter</h1>
                                <ul>
                                    <li>5 symbols <span>- 20 freespins</span></li>
                                    <li>4 symbols <span>- 15 freespins</span></li>
                                    <li>3 symbols <span>- 10 freespins</span></li>
                                </ul>
                            </div>

                            <div>
                                <h1>surprise bonus</h1>
                                <div>
                                    3 or more in an active pay line triggers the <br/>
                                    bowling bonus game!
                                </div>
                            </div>

                            <div>
                                <h1>wild card</h1>
                                <div>
                                    Subtitules for any symbol except scatter. <br/>
                                    5 symbols <span>- 2.000 coins</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="slot_payTable_item slot_payTable_item_page2">
                        <img
                            className="slot_payTable_item_image"
                            src={this.props.images['payTablePage2.png'].url}
                        />

                        <div className="slot_payTable_item_discription">
                            <div className="slot_payTable_item_discription_row slot_payTable_item_discription_row1">
                                <ul>
                                    <li>5 <span>- 4.100</span></li>
                                    <li>4 <span>- 80</span></li>
                                    <li>3 <span>- 20</span></li>
                                    <li>2 <span>- 5</span></li>
                                </ul>
                                <ul>
                                    <li>5 <span>- 2.900</span></li>
                                    <li>4 <span>- 60</span></li>
                                    <li>3 <span>- 13</span></li>
                                    <li>2 <span>- 4</span></li>
                                </ul>
                                <ul>
                                    <li>5 <span>- 1.500</span></li>
                                    <li>4 <span>- 40</span></li>
                                    <li>3 <span>- 10</span></li>
                                    <li>2 <span>- 3</span></li>
                                </ul>
                                <ul>
                                    <li>5 <span>- 300</span></li>
                                    <li>4 <span>- 25</span></li>
                                    <li>3 <span>- 8</span></li>
                                </ul>
                            </div>
                            <div className=" slot_payTable_item_discription_row slot_payTable_item_discription_row2">
                                <ul>
                                    <li>5 <span>- 100</span></li>
                                    <li>4 <span>- 20</span></li>
                                    <li>3 <span>- 7</span></li>
                                </ul>
                                <ul>
                                    <li>5 <span>- 70</span></li>
                                    <li>4 <span>- 15</span></li>
                                    <li>3 <span>- 6</span></li>
                                </ul>
                                <ul>
                                    <li>5 <span>- 40</span></li>
                                    <li>4 <span>- 15</span></li>
                                    <li>2 <span>- 5</span></li>
                                </ul>
                                <ul>
                                    <li>5 <span>- 20</span></li>
                                    <li>4 <span>- 10</span></li>
                                    <li>3 <span>- 3</span></li>
                                </ul>
                                <ul>
                                    <li>5 <span>- 15</span></li>
                                    <li>4 <span>- 5</span></li>
                                    <li>3 <span>- 2</span></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </Swiper>
                <button className="button slot_payTable_resume" onClick={this.props.controlsResumeGame}>Resume</button>
            </div>
        )
    }
}
