import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
export const behavior = {
    customDisplayObject: () => new PIXI.Graphics(),
    customApplyProps: function(instance, oldProps, newProps) {
        const { fill, x, y, width, height, alpha, radius } = newProps;
        instance.clear();
        instance.beginFill(fill);
        if(radius) {
            instance.drawRoundedRect(x, y, width, height, radius);
        } else {
            instance.drawRect(x, y, width, height);
        }

        instance.alpha = alpha;
        instance.endFill();
    }
};
export default CustomPIXIComponent(behavior, TYPE);