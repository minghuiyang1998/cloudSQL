import React from 'react';
import style from './index.scss';

export default function Tooltip({ children, label, custom }) {
  return (
    <div className="tooltip-container">
      <style jsx>{style}</style>
      <div className="tooltip" style={custom}>{label}</div>
      {children}
    </div>
  );
}
