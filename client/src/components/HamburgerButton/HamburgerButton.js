import React from 'react';

import styles from './HamburgerButton.module.css';

export const HamburgerButton = ({ onClick }) => {
  return (
    <button className={styles.hamburger__button} onClick={onClick}>
      <div className={styles.hamburger__bun} />
      <div className={styles.hamburger__bun} />
      <div className={styles.hamburger__bun} />
    </button>
  );
};
