import React from 'react';
import PropTypes from 'prop-types';
import { random } from "lodash";
import { Container, Sprite, withApp } from "react-pixi-fiber";
import Reel from "./Reel";
import Rectangle from "./Rectangle";

class ReelContainer extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.app.ticker.add(() => {
            this.startAnimation();
        });
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextProps.rotating && nextProps.rotating !== this.props.rotating) {
            this.startPreview();
        }

        if(nextProps.rotating && nextProps.rotating !== this.props.rotating) {
            this.setState({
                rotating: true,
                countSymbolsFromServerInReel: 0
            });
        }
    }

    startPreview() {
        this.setState({
            previewStart: true
        });
    }

    stopPreview() {
        this.setState({
            previewStart: false
        });
    }

    state = {
        rotating: false,
        previewStart: false,
        listSymbols: this.getStartSymbols(),
        countSymbolsFromServerInReel: 3,
        y: 0,
        offset: 32
    };

    getStartSymbols() {
        const newSymbols = [];
        for(let i = 1; i <= 5; i++) {
            newSymbols.push(random(1, 12))
        }
        return newSymbols;
    }

    setNewSymbol() {
        let newListSymbols = [...this.state.listSymbols].slice(0, 4);
        newListSymbols.unshift(random(1,12));

        this.setState({listSymbols: [...newListSymbols]})
    }

    setNewSymbolFromServer() {
        let newListSymbols = [...this.state.listSymbols].slice(0, 4);
        const newSymbol = this.props.symbolsFromServer[2 - this.state.countSymbolsFromServerInReel];

        newListSymbols.unshift(newSymbol ? newSymbol : random(1,12));

        this.setState({
            listSymbols: [...newListSymbols],
            countSymbolsFromServerInReel: this.state.countSymbolsFromServerInReel + 1
        })
    }

    startAnimation() {
        if(this.state.previewStart) {
            let newY = this.state.y - 2;
            if(newY <= -80) {
                newY = this.state.y;
                setTimeout(() => {
                    this.stopPreview();
                }, 200)
            }
            this.setState({y: newY});
        } else if(this.state.rotating) {
            let newY = this.state.y + this.state.offset;
            if(newY >= 120) {
                newY = 0;
                if(!this.props.rotating) {
                    this.setNewSymbolFromServer()
                } else {
                    this.setNewSymbol();
                }
            }
            if(!this.props.rotating && newY > 80 && this.state.countSymbolsFromServerInReel === 4) {
                this.setState({
                    rotating: false
                });
            }
            this.setState({y: newY})
        } else {
            if (this.state.y > 0) {
                let newY = this.state.y - this.state.offset / 3;
                if(newY < 0) {
                    newY = 0;
                }
                this.setState({
                    y: newY
                })
            }
        }
    }

    render() {
        const { cell } = this.context.config;
        return <Container x={this.props.x}>
            { this.props.reelFillColor.image ?
                <Sprite
                    texture={this.props.images[this.props.reelFillColor.image].texture}
                    x={0} y={0}
                    width={cell.width} height={cell.height * 5}
                />
            :
                <Rectangle
                    x={0} y={0}
                    width={cell.width} height={cell.height * 5}
                    fill={this.props.reelFillColor}
                    alpha={1}
                />
            }
            <Reel x={0} y={this.state.y} offsetY={cell.offsetY} symbols={this.state.listSymbols} images={this.props.images}/>
        </Container>
    }
}

export default withApp(ReelContainer);