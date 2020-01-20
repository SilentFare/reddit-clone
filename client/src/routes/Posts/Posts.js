import React, { useEffect } from 'react';

import styles from './Posts.module.css';
import PostCard from '../../components/PostCard';

export const Posts = ({ fetchPosts }) => {
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className={styles.posts}>
      <PostCard />
    </div>
  );
};
