import React, { useEffect } from 'react';

import styles from './Posts.module.css';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';

export const Posts = () => {
  return (
    <div className={styles.posts}>
      <PostCard />
    </div>
  );
};
