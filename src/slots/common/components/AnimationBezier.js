import React from 'react';
import PropTypes from 'prop-types';
import {Container, Sprite} from "react-pixi-fiber";
import * as PIXI from "pixi.js";

export default class AnimationBezier extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        imageTexture: PropTypes.instanceOf(PIXI.Texture),
        bezierValue: PropTypes.array,
        defaultPosition: PropTypes.object.isRequired,
        scalingParams: PropTypes.object,
        handleOnComplete: PropTypes.func,
        duration: PropTypes.number,
        bezierType: PropTypes.oneOf(['thru', 'soft', "quadratic", "cubic"])
    };

    startMovingElement() {
        const { bezierValue, duration, bezierType } = this.props;

        this.tween = TweenMax.to(this.refs.sprite, duration || 1, {
            bezier: {
                type: bezierType || "soft",
                values: bezierValue,
            },
            ease: Power1.easeInOut,
            onComplete: () => this.onCompleteMovingAction(),
            onUpdate: () => this.onUpdateMovingAction()
        });
        this.tween.invalidate();
        this.tween.play(0);
    }

    onCompleteMovingAction() {
        this.props.handleOnComplete && this.props.handleOnComplete();
    }

    onUpdateMovingAction() {
        const { scalingParams } = this.props;
        if(scalingParams) {
            const { progress, scale } = scalingParams;
            const progressMoving = this.tween.progress();
            if(progressMoving * 100 > progress.from) {
                const newScaleValue = scale.from - progressMoving + scale.to;
                this.refs.sprite.scale.x = newScaleValue;
                this.refs.sprite.scale.y = newScaleValue;
            }
        }
    }

    setDefaultParams() {
        const { defaultPosition } = this.props;
        Object.assign(this.refs.sprite, defaultPosition);
    }

    componentDidMount() {
        this.setDefaultParams();
        this.startMovingElement()
    }
    componentWillUnmount() {
        this.tween.kill();
    }

    render() {
        const {imageTexture, children} = this.props;
        if (imageTexture) {
            return <Container>
                <Sprite texture={imageTexture} ref={'sprite'}/>
            </Container>
        } else {
            return <Container ref={'sprite'}>
                { children }
            </Container>
        }
    }
}
