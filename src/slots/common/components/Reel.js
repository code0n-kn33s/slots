import React from 'react';
import PropTypes from 'prop-types';
import { Sprite } from "react-pixi-fiber";

export default class Reel extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);
    }
    getSymbol (index) {
        const { width, height } = this.context.config.cell;
        const params = {
            key: index,
            texture: this.props.images[`symbol_${this.props.symbols[index]}.png`].texture,
            width: width,
            height: height,
            x: this.props.x,
            y: height * index + this.props.y
        };
        return <Sprite {...params} />
    }

    getAllElements () {
        const listSymbols = [];
        for(let i = 0; i < 5; i++) {
            listSymbols.push(this.getSymbol(i))
        }
        return listSymbols;
    }

    render() {
        return this.getAllElements();
    }
}