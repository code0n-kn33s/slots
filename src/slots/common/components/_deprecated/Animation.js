import React from 'react';
import * as PIXI from "pixi.js";
import PropTypes from 'prop-types';
import { Container } from "react-pixi-fiber";

class Animation extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.setAnimation()
    }

    setAnimation() {
        const { nameAnimation } = this.props;
        let framesCount = this.context.config.symbolAnimation.framesCount[`sym_${nameAnimation}`];
        let textureArray = [];

        for (let i = 1; i <= framesCount; i++) {
            let texture = this.props.images[`sym_${nameAnimation < 10 ? '0' : ''}${nameAnimation}_${i < 10 ? '0' : ''}${i}`].texture;
            textureArray.push(texture);
        }

        this.animatedSprite = new PIXI.AnimatedSprite(textureArray);
        // this.animatedSprite.width = width;
        // this.animatedSprite.height = height;
        this.animatedSprite.animationSpeed = 0.35;
        this.animatedSprite.play();
        this.refs[`animation${this.props.x}${this.props.y}`].addChild(this.animatedSprite)
    }

    componentWillUnmount() {
        this.animatedSprite.stop();
        this.animatedSprite.removeChild();
    }

    render() {
        const {x, y} = this.props;
        return <Container ref={`animation${x}${y}`} x={x} y={y} />
    }
}


export default Animation;