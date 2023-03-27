import React from 'react';
import * as PIXI from "pixi.js";
import PropTypes from 'prop-types';
import {Container} from "react-pixi-fiber";

class AnimationJson extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.animation = {};
        this.containerWithAnimation = [];

        this.clickEvent = this.click.bind(this);

        this.animationSettings = context.config.animation;
    }

    state = {
        activeAnimation: '',
        containersWithAnimation: []
    };

    componentDidMount() {
        const {nameAnimation} = this.props;

        try {
            if (this.animationSettings[nameAnimation] > 0) {
                this.setAnimation();
            } else {
                this.setFewAnimation();
            }
        } catch(e) {
            console.log(`animation with name "${nameAnimation}" has wrong texture`);
        }

        this.setState({activeAnimation: this.props.typeAnimation});

    }

    setAnimation() {
        const {
            nameAnimation,
            images,
            scale,
            x,
            y
        } = this.props;
        const frames = [];

        for (let i = 1; i < this.animationSettings[nameAnimation]; i++) {
            const val = i < 10 ? `0${i}` : i;
            frames.push(images[`${nameAnimation}.json`].textures[`${nameAnimation}00${val}`]);
        }

        this.animatedSprite = new PIXI.AnimatedSprite(frames);
        this.animatedSprite.anchor = 'anchor' in this.props ? this.props.anchor : { x: 0, y: 0};
        this.animatedSprite.animationSpeed = 0.25;
        if (scale) {
            this.animatedSprite.scale = scale;
        }

        if ('playing' in this.props && typeof this.props.playing === 'undefined' ? this.props.playing : true) {
            this.animatedSprite.play();
        }

        this.refs[`animation${x}${y}`].addChild(this.animatedSprite)
    }

    setFewAnimation() {
        const {nameAnimation} = this.props;

        for (let typeAnimation in this.animationSettings[nameAnimation]) {
            this.createAnimation(typeAnimation);
        }
    }

    createAnimation(typeAnimation) {
        const {nameAnimation, width, height, scale, pivot} = this.props;
        const framesAnimation = this.animationSettings[nameAnimation][typeAnimation];

        const {from, to, loop, speed} = framesAnimation;
        const frames = [];

        for (let i = from; i < to; i++) {
            let val = i;

            if (val < 10) {
                val = `000${i}`
            } else if (val >= 10 && val <= 99) {
                val = `00${i}`
            } else if (val > 99 && val < 1000) {
                val = `0${i}`
            }

            frames.push(this.props.images[`${nameAnimation}.json`].textures[`${nameAnimation}${val}`]);
        }

        this.animation[typeAnimation] = new PIXI.AnimatedSprite(frames);
        if (scale) {
            this.animation[typeAnimation].scale = scale;
        }
        if (pivot) {
            this.animation[typeAnimation].pivot = pivot;
        }
        this.animation[typeAnimation].anchor = 'anchor' in this.props ? this.props.anchor : { x: 0, y: 0};
        this.animation[typeAnimation].animationSpeed = speed || 0.25;
        this.animation[typeAnimation].alpha = 0;
        this.animation[typeAnimation].loop = loop;

        if (width) {
            this.animation[typeAnimation].width = width;
            this.animation[typeAnimation].height = height;
        }

        const handleOnComplete = this.props.handleOnComplete;

        this.animation[typeAnimation].onComplete = () => {
            if ('removeOnComplete' in this.props && typeof this.props.removeOnComplete !== 'undefined' && this.props.removeOnComplete === false) {
                this.animation[typeAnimation].gotoAndStop(this.animation[typeAnimation].totalFrames - 1)
            }

            if (handleOnComplete) {
                handleOnComplete(typeAnimation)
            }
        };

        if (typeAnimation === this.props.typeAnimation) {
            this.animation[typeAnimation].alpha = 1;

            if ('playing' in this.props && typeof this.props.playing !== 'undefined' ? this.props.playing : true) {
                this.animation[typeAnimation].play();
            } else {
                this.animation[typeAnimation].stop()
            }
        }

        this.refs[`animation${this.props.x}${this.props.y}${typeAnimation}`].addChild(this.animation[typeAnimation])
    }

    stopAllAnimation() {
        for (let animation in this.animation) {
            this.animation[animation].alpha = 0;
            this.animation[animation].stop();
        }
    }

    removeAllAnimation() {
        for (let animation in this.animation) {
            this.animation[animation].removeChildren()
        }
    }

    componentWillUnmount() {
        this.stopAllAnimation();
        this.removeAllAnimation();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.typeAnimation && prevProps.typeAnimation !== this.props.typeAnimation) {
            this.stopAllAnimation();
            this.animation[this.props.typeAnimation].alpha = 1;

            if ('playing' in this.props && typeof this.props.playing === 'undefined' ? this.props.playing : true) {
                this.animation[this.props.typeAnimation].play();
            }
        }
    }

    getAnimationContainers(typeAnimation) {
        const {x, y} = this.props;
        return <Container key={`animation${typeAnimation}`} ref={`animation${x}${y}${typeAnimation}`}/>
    }

    createContainersForAnimation() {
        const {nameAnimation} = this.props;
        if (this.containerWithAnimation.length === 0) {
            for (let typeAnimation in this.animationSettings[nameAnimation]) {
                this.containerWithAnimation.push(this.getAnimationContainers(typeAnimation))
            }
        }

        return this.containerWithAnimation;
    }

    click() {
        if (this.props.clickHandler) {
            this.props.clickHandler(this.props.idForClickHandler)
        }
    }

    render() {
        const {x, y, cursor} = this.props;
        return <Container
            x={x}
            y={y}
            interactive={'interactive' in this.props && typeof this.props.interactive !== 'undefined' ? this.props.interactive : true}
            cursor={cursor ? cursor : 'default'}
            mousedown={this.clickEvent}
            touchstart={this.clickEvent}
        >
            {this.createContainersForAnimation()}
        </Container>
    }
}


export default AnimationJson;
