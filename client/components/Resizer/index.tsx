import React from 'react';
import SplitPane from 'react-split-pane';

const DEFAULT_RESIZER = {
  width: '3px',
  backgroundColor: '#333',
  cursor: 'col-resize',
};

export default function Resizer({
  children,
  direction = 'vertical',
  minSize = 150,
  defaultSize = 200,
  maxSize = 250,
  resizerStyle = DEFAULT_RESIZER,
}) {
  return (
    <SplitPane
      split={direction}
      minSize={minSize}
      defaultSize={defaultSize}
      maxSize={maxSize}
      resizerStyle={resizerStyle}
    >
      {children}
    </SplitPane>
  );
}
