import React from 'react';
import style from './index.scss';

const Modal = ({ title = '', visible = false, children = null, onClose = null }) => (
  <>
    { visible ? (
      <div className="modal-container">
        <style jsx>{style}</style>
        <div className="modal-main">
          <div>
            {title}
            {onClose ? <span onClick={onClose}>x</span> : null}
          </div>
          { children }
        </div>
      </div>
    ) : null }
  </>
);

export default Modal;
