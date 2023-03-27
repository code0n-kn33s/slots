import React from 'react';
import PropTypes from 'prop-types';
import { Container } from "react-pixi-fiber";
import AnimationJson from './AnimationJson'

class SymbolAnimationContainer extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);
    }
    getAnimation(props) {
        return <AnimationJson {...props}/>
    }

    getAllAnimation() {
        const animationList = [];
        const {
            cell: {
                width,
                height
            },
            reel: {
                offsetX
            }
        } = this.context.config;
        if (this.props.isShowAnimation && this.props.symbols.length > 0) {

            for(let symbolReel = 0; symbolReel < this.props.symbols.length - 1; symbolReel++) {
                for(let symbolNumber = 0; symbolNumber < this.props.symbols[symbolReel].length; symbolNumber++) {
                    if(this.props.mapAnimation[symbolReel][symbolNumber] > 0) {
                        const x = width * symbolReel + offsetX * symbolReel;
                        const y = height * symbolNumber;
                        animationList.push(this.getAnimation({
                            key: `${x}_${y}_${symbolReel}_${symbolNumber}`,
                            x,
                            y,
                            width,
                            height,
                            nameAnimation: `symbol_${this.props.symbols[symbolReel][symbolNumber]}_anim`,
                            typeAnimation: 'default',
                            images: this.props.images
                        }))
                    }
                }
            }

        }

        return animationList
    }

    render() {
        const {
            symbolAnimation: {
                container: {
                    x, y
                }
            }
        } = this.context.config;
        return <Container x={x} y={y}>
            {this.getAllAnimation()}
        </Container>
    }
}


export default SymbolAnimationContainer;