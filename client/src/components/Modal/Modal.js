import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

import styles from './Modal.module.css';

export const Modal = ({ show, close, children }) => {
  return show
    ? createPortal(
        <div
          className={styles.modal__background}
          onClick={event => {
            if (event.target === event.currentTarget) {
              close();
            }
          }}
        >
          <div className={styles.modal}>
            <div className={styles.modal__header}>
              <MdClose
                onClick={close}
                className={styles.modal__close__button}
              />
            </div>
            <div className={styles.modal__content}>{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
