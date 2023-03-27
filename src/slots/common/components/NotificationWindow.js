import React from 'react';
import PropTypes from 'prop-types';
import {Container, Sprite, Text} from "react-pixi-fiber";
import Rectangle from "src/slots/common/components/Rectangle";

export default class NotificationWindow extends React.Component {
    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        const {content} = this.props;

        this.elements = this.getElements();

        this.containerStyle = {
            ...content.container,
            cursor: 'pointer',
            interactive: true,
            mousedown: this.interactiveDown.bind(this),
            touchstart: this.interactiveDown.bind(this)
        };
    }

    getElements() {
        const {images, count, coins, content} = this.props;
        const elementConfigs = content.elements;

        const elements = [];

        for (let i = 0; i < elementConfigs.length; i++) {
            const config = elementConfigs[i];
            const type = config.type;

            if (type === 'text') {
                let text = config.text;

                if (text.includes('%spins')) {
                    text = text.replace('%spins', count);
                } else if (text.includes('%coins')) {
                    text = text.replace('%coins', coins);
                }

                elements.push(<Text {...config} text={text}/>);

            } else if (type === 'sprite') {
                let texture = config.image in images ? images[config.image].texture : null;

                if (!texture) {
                    console.warn('NotificationWindow::getElements() - texture not found', config.image)
                }

                elements.push(<Sprite {...config} texture={texture}/>);
            }
        }
        return elements;
    }

    getBackground() {
        const {
            images,
            content: {
                background
            }
        } = this.props;

        return background.type === 'rectangle' ?
            <Rectangle {...background}/> :
            <Sprite {...background} texture={images[background.image].texture}/>
    }

    interactiveDown() {
        this.props.action();
    }

    render() {
        return <Container {...this.containerStyle}>
            {this.getBackground()}
            {this.elements}
        </Container>;
    }
}
