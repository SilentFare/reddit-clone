import React from 'react';
import PropTypes from 'prop-types';

import styles from './Discussion.module.css';
import Post from '../../components/Post';

export const Discussion = () => {
  return (
    <div className={styles.discussion}>
      <div className={styles.discussion__content}>
        <Post />
      </div>
    </div>
  );
};

Discussion.propTypes = {};
