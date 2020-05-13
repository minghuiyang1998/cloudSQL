import React from 'react';
import style from './index.scss';

export default function Error({ msg = '' }) {
  return (
    <div className="error-container">
      <style jsx>{style}</style>
      <div className="error-msg">{msg}</div>
    </div>
  );
}
