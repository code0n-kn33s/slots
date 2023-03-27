import React from 'react';
import { Sprite, Container } from "react-pixi-fiber";
import { splitToDigit } from "src/helpers/index";

export default class ImageOfNumbers extends React.Component {
    getItem(value) {
        const { images, stepsForDigit = 20 } = this.props;
        const digitList = [];
        const digitsList = splitToDigit(value);

        for(let index in digitsList) {
            const digit = digitsList[index];
            digitList.push(<Sprite
                key={`score${index}`}
                x={index * stepsForDigit}
                texture={images[`digit_${digit}.png`].texture}
            />);
        }
        return digitList
    }
    getActiveItem() {
        const {value} = this.props;
        return value > 0 ? this.getItem(value) : null;
    }

    render() {
        const {x, y} = this.props;
        return <Container x={x} y={y}>
            {this.getActiveItem()}
        </Container>;
    }
}