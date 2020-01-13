import React from 'react';
import { Link } from 'react-router-dom';
import { FaCanadianMapleLeaf } from 'react-icons/fa';

import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <Link to='/' className={styles.logo__link}>
      <FaCanadianMapleLeaf className={styles.logo} />
    </Link>
  );
};
