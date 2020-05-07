import React from 'react';
import style from './index.scss';

export default function Error({ errorMsg = '' }) {
  return (
    <div className="error">
      <style jsx>{style}</style>
      <div className="msg">
        {errorMsg}
      </div>
    </div>
  );
}
