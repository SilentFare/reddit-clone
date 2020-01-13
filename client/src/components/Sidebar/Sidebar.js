import React from 'react';

import styles from './Sidebar.module.css';
import HamburgerButton from '../HamburgerButton';
import Logo from '../Logo';

export const Sidebar = ({ show, toggleSidebar }) => {
  return (
    <aside className={`${styles.sidebar} ${show && styles.sidebar_show}`}>
      <div className={styles.sidebar__header}>
        <HamburgerButton onClick={toggleSidebar} show={show} />
        <Logo />
      </div>
    </aside>
  );
};
