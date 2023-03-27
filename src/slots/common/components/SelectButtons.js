import React from 'react';

export default class SelectButtons extends React.Component {
    getSelectItem(value, textButton, isDisabled, isChecked) {
        const selectElementAction = this.props.selectElementAction.bind(null, value);
        return (
            <label
                key={textButton}
                className={
                    "slot_select_buttons_item " +
                    (isDisabled ? 'slot_select_buttons_item--disabled' : '')
                }
            >
                <input
                    disabled={isDisabled}
                    checked={isChecked}
                    type="radio"
                    name="selectButtons"
                    value={value}
                    onChange={selectElementAction}
                />
                { textButton }
            </label>
        );
    }
    getAllSelects() {
        const { selectSteps, maxStep, textButtonsList } = this.props;
        const linesStepsCount = selectSteps.length;
        const items = [];
        for (let i = 0; i < linesStepsCount; i++) {
            const itemValue = selectSteps[i];
            const textButton = textButtonsList[itemValue > 1 ? 'plural' : 'singular'];

            items.unshift(this.getSelectItem(
                itemValue,
                `${itemValue} ${textButton}`,
                itemValue > maxStep,
                itemValue === this.props.activeElement
            ));
        }

        items.unshift(this.getSelectItem(
            maxStep,
            `${textButtonsList.maxValue}(${maxStep})`,
            false
        ));
        return items;
    }
    render() {
        const { styles } = this.props;
        const _styles = {
            left: styles.left,
            bottom: styles.bottom
        };
        return (
            <div className="slot_select_buttons" style={_styles}>
                { this.getAllSelects() }
            </div>
        )
    }
}