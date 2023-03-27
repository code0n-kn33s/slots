import React from 'react';
import PropTypes from 'prop-types';
import { Sprite, Container } from "react-pixi-fiber";
import { splitToDigit } from "../../../helpers/index";

export default class ScoresWin extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };
    constructor (props, context) {
        super(props, context);
    }

    getItem(itemID, value) {
        const { images } = this.props;
        const itemName = `score${itemID}`;
        const scoresConfig = this.context.config.freegame.scores;
        const stepForDigitX = scoresConfig.stepForDigitX;
        const configParams = scoresConfig[itemName];
        const digitList = [];
        const digitsList = splitToDigit(value);

        for(let index in digitsList) {
            const digit = digitsList[index];
            digitList.push(<Sprite
                key={`${itemName}${index}`}
                y={configParams.y}
                x={configParams.x + index * stepForDigitX}
                texture={images[`digit_${digit}.png`].texture}
            />);
        }
        return digitList
    }
    getAllActiveItems() {
        const activeScores = this.props.activeScores;
        const itemsList = [];
        for (let item in activeScores) {
            if(activeScores[item].value > 0) {
                itemsList.push(this.getItem(item, activeScores[item].value));
            }
        }
        return itemsList;
    }

    render() {
        return <Container>
            {this.getAllActiveItems()}
        </Container>;
    }
}
