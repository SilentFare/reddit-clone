import React from 'react';

import styles from './Header.module.css';
import Button from '../Button';
import HamburgerButton from '../HamburgerButton';
import Logo from '../Logo';

export const Header = ({ toggleRegister, toggleLogin, toggleSidebar }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <HamburgerButton onClick={toggleSidebar} />
        <Logo />
      </div>
      <div className={styles.header__right}>
        <Button label='Register' onClick={toggleRegister} />
        <Button label='Log In' onClick={toggleLogin} />
      </div>
    </div>
  );
};
