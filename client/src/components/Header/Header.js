import React from 'react';
import { Link } from 'react-router-dom';
import { FaCanadianMapleLeaf } from 'react-icons/fa';

import styles from './Header.module.css';
import Button from '../Button';

export const Header = ({ toggleRegister, toggleLogin }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Link to='/' className={styles.header__logo__link}>
          <FaCanadianMapleLeaf className={styles.header__logo} />
        </Link>
      </div>
      <div className={styles.header__right}>
        <Button label='Register' onClick={toggleRegister} />
        <Button label='Log In' onClick={toggleLogin} />
      </div>
    </div>
  );
};
