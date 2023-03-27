import {getManifest} from "../api";
import React, { Component } from 'react';

export function splitToDigit(n){
    return [...n + ''].map(Number)
}

export function getHostQueryParams(searchParams){
    const params = (new URL(document.location)).searchParams;
    return params.get(searchParams)
}

export function asyncComponent(importComponent) {
    return class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = { Component: null };
        }
        async componentDidMount() {
            const { default: Component } = await importComponent();
            this.setState({ Component });
        }
        render() {
            const { Component } = this.state;
            return Component && <Component {...this.props} />
        }
    }
}