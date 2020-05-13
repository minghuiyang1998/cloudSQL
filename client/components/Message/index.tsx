import React from 'react';
import style from './index.scss';
import { genHashID } from '../../utils/common';

const MAIN = 'Message';

export const Message = () => (
  <div id={MAIN} className="message-wrapper">
    <style jsx>{style}</style>
  </div>
);

export const error = ({ content = '', duration = 5000 }) => {
  const $main = document.getElementById(MAIN);
  const $msg = document.createElement('div');
  $msg.textContent = content;
  $msg.classList.add('error', 'message');
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

export const startLoading = () => {
  const $main = document.getElementById(MAIN);
  const $msg = document.createElement('div');
  const lid = genHashID();
  $msg.textContent = 'Loading';
  $msg.id = lid;
  $msg.classList.add('Loading', 'message');
  setTimeout(() => {
    $msg.classList.add('show');
  }, 250);
  $main.appendChild($msg);
  return {
    lid,
  };
};

export const endLoading = ({ lid = '' }) => {
  const $msg = document.getElementById(lid);
  $msg.classList.remove('show');
  setTimeout(() => {
    $msg.parentNode.removeChild($msg);
  }, 250);
};
