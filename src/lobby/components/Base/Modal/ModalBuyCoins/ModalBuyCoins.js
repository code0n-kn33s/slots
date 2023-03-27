import React from 'react';
import './_modal_buy_coins.sass';
import '../../Form/Radio/_radio.sass';

import Radio from './CoinsRadio';
import TooltipFool from '../../TooltipFool/TooltipFool';

const icon_coins = require('../../../../assets/img/header_icons/iconHeaderCoins.png');

const fb_coins = require('../../../../assets/img/payment_methods/fb_coins.png');
const paypal = require('../../../../assets/img/payment_methods/paypal.png');
const visa = require('../../../../assets/img/payment_methods/visa.png');
const mastercard = require('../../../../assets/img/payment_methods/mastercard.png');
const american_express = require('../../../../assets/img/payment_methods/american_express.png');
const discover = require('../../../../assets/img/payment_methods/discover.png');
const jcb = require('../../../../assets/img/payment_methods/jcb.png');
const mobile = require('../../../../assets/img/payment_methods/mobile.png');

const ModalBuyCoins = () => (
  <div className="modal-buy-coins">
    <p className="title">Select a Coin Bundle to buy</p>

    <div className="buy-coins__table">
      <div className="head">
        <div className="col-coins col">Coins</div>
        <div className="col-free col"><span>Free</span></div>
        <div className="col-get col">You get</div>
        <div className="col-price col">Price</div>
      </div>

      <div className="body">
        <div className="line">
          <Radio
            id="coin_01"
            name="buy-coins"
            isChecked="true"
          >
            <span className="col-coins col">
              3,000,000
              <img className="coin-img" src={icon_coins} alt="" />
              <span className="plus"></span>
            </span>
            <span className="col-free col"><span>733%</span></span>
            <span className="col-get col">
              <span className="equals"></span>
              25,000,000
              <span className="arr-right"></span>
            </span>
            <span className="col-price col">$ 200 USD</span>
          </Radio>
          <TooltipFool color="yellow">Best Value</TooltipFool>
        </div>

        <div className="line">
          <Radio
            id="coin_02"
            name="buy-coins"
          >
            <span className="col-coins col">
              1,500,000
              <img className="coin-img" src={icon_coins} alt="" />
              <span className="plus"></span>
            </span>
            <span className="col-free col"><span>726%</span></span>
            <span className="col-get col">
              <span className="equals"></span>
              12,400,000
              <span className="arr-right"></span>
            </span>
            <span className="col-price col">$ 100 USD</span>
          </Radio>
        </div>

        <div className="line">
          <Radio
            id="coin_03"
            name="buy-coins"
          >
            <span className="col-coins col">
              750,000
              <img className="coin-img" src={icon_coins} alt="" />
              <span className="plus"></span>
            </span>
            <span className="col-free col"><span>713%</span></span>
            <span className="col-get col">
              <span className="equals"></span>
              6,100,000
              <span className="arr-right"></span>
            </span>
            <span className="col-price col">$ 50 USD</span>
          </Radio>
          <TooltipFool color="green">Most Popular</TooltipFool>
        </div>

        <div className="line">
          <Radio
            id="coin_04"
            name="buy-coins"
          >
            <span className="col-coins col">
              375,000
              <img className="coin-img" src={icon_coins} alt="" />
              <span className="plus"></span>
            </span>
            <span className="col-free col"><span>700%</span></span>
            <span className="col-get col">
              <span className="equals"></span>
              3,000,000
              <span className="arr-right"></span>
            </span>
            <span className="col-price col">$ 25 USD</span>
          </Radio>
        </div>

        <div className="line">
          <Radio
            id="coin_05"
            name="buy-coins"
          >
            <span className="col-coins col">
              150,000
              <img className="coin-img" src={icon_coins} alt="" />
              <span className="plus"></span>
            </span>
            <span className="col-free col"><span>633%</span></span>
            <span className="col-get col">
              <span className="equals"></span>
              1,100,000
              <span className="arr-right"></span>
            </span>
            <span className="col-price col">$ 10 USD</span>
          </Radio>
        </div>

        <div className="line">
          <Radio
            id="coin_06"
            name="buy-coins"
          >
            <span className="col-coins col">
              75,000
              <img className="coin-img" src={icon_coins} alt="" />
              <span className="plus"></span>
            </span>
            <span className="col-free col"><span>553%</span></span>
            <span className="col-get col">
              <span className="equals"></span>
              490,000
              <span className="arr-right"></span>
            </span>
            <span className="col-price col">$ 5 USD</span>
          </Radio>
        </div>
      </div>

      <div className="foot">
        <button className="button button-green">Buy Coins</button>
      </div>
    </div>

    <div className="payment_methods">
      <img src={fb_coins} alt="facebook"/>
      <img src={paypal} alt="PayPal"/>
      <img src={visa} alt="Visa"/>
      <img src={mastercard} alt="Mastercard"/>
      <img src={american_express} alt="American Express"/>
      <img src={discover} alt="Discover"/>
      <img src={jcb} alt="JCB"/>
      <img src={mobile} alt="mobile"/>
    </div>
  </div>
);

export default ModalBuyCoins;
