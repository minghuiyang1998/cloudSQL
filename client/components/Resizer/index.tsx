import React from 'react';
import SplitPane from 'react-split-pane';

const DEFAULT_RESIZER = {
  width: '3px',
  backgroundColor: '#333',
  cursor: 'col-resize',
};

const DEFAULT_STYLE = {
  height: 'auto',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

export default function Resizer({
  children,
  direction = 'vertical',
  minSize = 200,
  defaultSize = 250,
  maxSize = 300,
  resizerStyle = DEFAULT_RESIZER,
  style = DEFAULT_STYLE,
}) {
  return (
    <SplitPane
      split={direction}
      minSize={minSize}
      defaultSize={defaultSize}
      maxSize={maxSize}
      resizerStyle={resizerStyle}
      style={style}
    >
      {children}
    </SplitPane>
  );
}
