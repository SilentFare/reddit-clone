import React from 'react';
import { Link } from 'react-router-dom';
import { FaCanadianMapleLeaf } from 'react-icons/fa';

import styles from './Header.module.css';
import Button from '../Button';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Link to='/' className={styles.header__logo__link}>
          <FaCanadianMapleLeaf className={styles.header__logo} />
        </Link>
      </div>
      <div className={styles.header__right}>
        <Button label='Register' />
        <Button label='Log In' />
      </div>
    </div>
  );
};
