import React, { forwardRef } from 'react';

const Tooltips: React.ForwardRefRenderFunction<HTMLDivElement, {}> = (
  props,
  ref
) => {
  return (
    <div
      ref={ref}
      style={{
        width: '350px',
        position: 'fixed',
        padding: '3px 5px',
        fontSize: '12px',
        height: 'auto',
        borderRadius: '3px',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        boxShadow: '-3px 6px 19px -4px rgba(0, 0, 0, 0.54)',
      }}
    ></div>
  );
};

export const WrapperTooltips = forwardRef(Tooltips);
