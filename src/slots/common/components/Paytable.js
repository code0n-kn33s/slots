import React from 'react';

import {Container, Sprite, Text} from "react-pixi-fiber";

export default class Paytable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0,
            pageMax: 1,
        }
    }

    render() {
        const {page} = this.state;
        const {images, config} = this.props;

        const scatterPays = [];
        const bonusPays = [];
        const wildPays = [];
        const symbolPays = [];

        config.scatterPays.forEach((o, index) => scatterPays.push(<Text key={index} {...o}/>));
        config.bonusPays.forEach((o, index) => bonusPays.push(<Text key={index} {...o}/>));
        config.wildPays.forEach((o, index) => wildPays.push(<Text key={index} {...o}/>));
        config.symbolPays.forEach((o, index) => symbolPays.push(<Text key={index} {...o}/>));

        const page1 = <Container>
            <Sprite texture={images[config.page1.image].texture} anchor={{x: 0.5, y: 0.5}} x={config.page1.x} y={config.page1.y}/>

            <Container>
                <Text {...config.scatterTitle}/>
                {scatterPays}
            </Container>

            <Container>
                <Text {...config.bonusTitle}/>
                {bonusPays}
            </Container>

            <Container>
                <Text {...config.wildTitle}/>
                {wildPays}
            </Container>
        </Container>

        const page2 = <Container>
            <Sprite texture={images[config.page2.image].texture} anchor={{x: 0.5, y: 0.5}} x={config.page2.x} y={config.page2.y}/>
            <Container>
                {symbolPays}
            </Container>
        </Container>

        const buttons = <Container>
            <Text {...config.pageTitle} text={(this.state.page + 1) + ' / ' + (this.state.pageMax + 1)}/>
            <Sprite texture={images[config.previousButton.image].texture} {...config.previousButton} mousedown={this.onPreviousDown.bind(this)}/>
            <Sprite texture={images[config.nextButton.image].texture} {...config.nextButton} mousedown={this.onNextDown.bind(this)}/>
            <Sprite texture={images[config.backButton.image].texture} {...config.backButton} mousedown={this.onBackDown.bind(this)}/>
        </Container>;

        return <Container interactive={true}>
            <Sprite texture={images['payTable.png'].texture}/>
            {page === 0 ? page1 : page2}
            {buttons}
        </Container>
    }

    onPreviousDown() {
        this.setState({page: this.state.page === this.state.pageMax ? --this.state.page : this.state.pageMax})
    }

    onNextDown() {
        this.setState({page: this.state.page < this.state.pageMax ? ++this.state.page : 0})
    }

    onBackDown() {
        this.props.controlsResumeGame()
    }
}
