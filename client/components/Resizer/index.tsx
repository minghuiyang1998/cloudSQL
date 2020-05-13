import React from 'react';
import SplitPane from 'react-split-pane';

const DEFAULT_RESIZER = {
  width: '3px',
  backgroundColor: '#252526',
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
  minSize = 250,
  defaultSize = 250,
  maxSize = 300,
  resizerStyle = DEFAULT_RESIZER,
  pane1Style = {},
  pane2Style = {},
  style = DEFAULT_STYLE,
}) {
  return (
    <SplitPane
      split={direction}
      minSize={minSize}
      defaultSize={defaultSize}
      maxSize={maxSize}
      resizerStyle={resizerStyle}
      pane1Style={pane1Style}
      pane2Style={pane2Style}
      style={style}
    >
      {children}
    </SplitPane>
  );
}
