import React from 'react';
import './_tooltip.sass';

const Tooltip = (props) => (
    <div className={(props.position) ? 'tooltip ' + props.position : 'tooltip'}>
      <div className={(props.triangle) ? 'triangle ' + props.triangle : 'triangle'}></div>
      <div className="tooltip__inner">
        {props.children}
      </div>
    </div>
  )

export default Tooltip;
