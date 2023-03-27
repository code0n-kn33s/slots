import React from 'react';
import './_tooltip_fool.sass';

const TooltipFool = (props) => (
  <div className={'tooltip-fool ' + props.color}>
    <div className="inner">
      {props.children}
    </div>
  </div>
)

export default TooltipFool;
