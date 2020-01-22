import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Posts.module.css';
import PostCard from '../../components/PostCard';

export const Posts = ({ fetchPosts, posts }) => {
  const { community } = useParams();

  useEffect(() => {
    fetchPosts(community);
  }, [community]);

  if (community && posts.byCommunity[community]) {
    return (
      <div className={styles.posts}>
        {Object.values(posts.byCommunity[community].byId).map(post => (
          <PostCard
            key={post.id}
            community={post.community}
            user={post.user}
            title={post.title}
            text={post.text}
            created={post.created_at}
          />
        ))}
      </div>
    );
  }

  if (posts.all) {
    return (
      <div className={styles.posts}>
        {Object.values(posts.all.byId).map(post => (
          <PostCard
            key={post.id}
            community={post.community}
            user={post.user}
            title={post.title}
            text={post.text}
            created={post.created_at}
          />
        ))}
      </div>
    );
  }

  return <span>Loading</span>;
};
