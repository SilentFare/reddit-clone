import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import styles from './Posts.module.css';
import PostCard from '../../components/PostCard';

export const Posts = ({ fetchPosts, posts }) => {
  const { community } = useParams();

  useEffect(() => {
    fetchPosts(community);
  }, [community, fetchPosts]);

  if (community && posts.byCommunity[community]) {
    return (
      <div className={styles.posts}>
        {Object.values(posts.byCommunity[community].byId).map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            community={post.community}
            user={post.user}
            title={post.title}
            text={post.text}
            upvotes={post.upvotes}
            vote={post.vote}
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
            id={post.id}
            community={post.community}
            user={post.user}
            title={post.title}
            text={post.text}
            vote={post.vote}
            upvotes={post.upvotes}
            created={post.created_at}
          />
        ))}
      </div>
    );
  }

  return <span>Loading</span>;
};

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};
