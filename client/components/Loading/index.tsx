import React from 'react';
import style from './index.scss';

export default function Loading() {
  return (
    <div className="loading">
      <style jsx>{style}</style>
      <div className="loader" />
    </div>
  );
}
