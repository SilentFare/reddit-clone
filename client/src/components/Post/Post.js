import React from 'react';
import PropTypes from 'prop-types';

import styles from './Post.module.css';

export const Post = () => {
  return (
    <div className={styles.post}>
      <span>Post</span>
    </div>
  );
};

Post.propTypes = {};
