import React from 'react';
import style from './index.scss';

export default function Loading({ backgroundColor = '#fff' }) {
  return (
    <div className="loading" style={{ backgroundColor }}>
      <style jsx>{style}</style>
      <div className="loader" />
    </div>
  );
}
