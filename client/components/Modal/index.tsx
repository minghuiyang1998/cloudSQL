import React from 'react';
import style from './index.scss';
import CloseIcon from '../../assets/close.svg';

const Modal = ({ width = 500, title = '', visible = false, children = null, onClose = null }) => (
  <>
    { visible ? (
      <div className="modal-container">
        <style jsx>{style}</style>
        <div className="modal-main" style={{ width: `${width}px` }}>
          <div className="top">
            {title}
            {onClose ? (
              <span onClick={onClose} className="close-btn">
                <CloseIcon />
              </span>
            ) : null}
          </div>
          <div className="modal-body">
            { children }
          </div>
        </div>
      </div>
    ) : null }
  </>
);

export default Modal;
