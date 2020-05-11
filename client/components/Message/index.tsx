import React from 'react';
import style from './index.scss';

const MAIN = 'Message';

export const Message = () => (
  <div id={MAIN} className="message-wrapper">
    <style jsx>{style}</style>
  </div>
);

export const error = ({ type = 'error', content = '', duration = 5000 }) => {
  const $main = document.getElementById(MAIN);
  const $msg = document.createElement('div');
  $msg.textContent = content;
  $msg.classList.add(type, 'message');
  setTimeout(() => {
    $msg.classList.add('show');
  }, 250);
  setTimeout(() => {
    $msg.classList.remove('show');
  }, duration);
  setTimeout(() => {
    $msg.parentNode.removeChild($msg);
  }, duration + 250);
  $main.appendChild($msg);
};
