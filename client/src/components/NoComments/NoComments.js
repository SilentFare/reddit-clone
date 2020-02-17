import React from 'react';

import styles from './NoComments.module.css';
import { FaComments } from 'react-icons/fa';

export const NoComments = () => {
  return (
    <div className={styles.nocomments}>
      <FaComments className={styles.nocomments__icon} />
      <span>No Comments Yet</span>
      <span>Be the first to share what you think!</span>
    </div>
  );
};
