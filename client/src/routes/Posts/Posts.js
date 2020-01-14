import React from 'react';

import styles from './Posts.module.css';
import Loading from '../../components/Loading';

export const Posts = () => {
  return (
    <div className={styles.posts}>
      <span>Posts</span>
      <Loading />
    </div>
  );
};
