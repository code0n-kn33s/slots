import React from 'react';
import './_lang.sass';

const Lang = () => (
  <div className="lang">
    <img src={icon_lang} alt=""/>
    
    <select name="lang" id="lang">
      <option value="eng">English</option>
      <option value="ger">German</option>
      <option value="rus">Russian</option>
    </select>
  </div>
)

var icon_lang = require('../../assets/img/mainmenu_icons/iconLanguage.png');


export default Lang;
