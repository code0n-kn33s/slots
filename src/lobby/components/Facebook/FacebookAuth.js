import React from 'react';
import {fb_login} from "src/authFacebook";
import {AUTH_STATUS} from "src/lobby/consts/auth";

class FacebookAuth extends React.Component {
    getElementAuth() {
        switch (this.props.authStatus) {
            case AUTH_STATUS.demo:
            case AUTH_STATUS.noAuth: return (
                <a className="fb_login_btn" onClick={fb_login}>
                    <img src={require('src/assets/img/fbLogin.png')} border="0" alt=""/>
                </a>
            );
            case AUTH_STATUS.pending: return <img className="facebook_auth_element_loading" src={require('src/assets/img/loader.gif')} border="0" alt=""/>;
            case AUTH_STATUS.success: return null;
            case AUTH_STATUS.error: return <span>Ошибка авторизации</span>
        }
    }
    render() {
        return <div className="facebook_auth_element">
            {this.getElementAuth()}
        </div>
    }
}

export default FacebookAuth;
