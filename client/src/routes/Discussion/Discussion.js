import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import styles from './Discussion.module.css';
import Post from '../../components/Post';
import CommentEditor from '../../components/CommentEditor';
import Comment from '../../components/Comment';

export const Discussion = ({ fetchDiscussion, posts }) => {
  const { post_id } = useParams();

  useEffect(() => {
    fetchDiscussion(post_id);
  }, [fetchDiscussion, post_id]);

  if (posts && posts[post_id]) {
    const { post } = posts[post_id];

    return (
      <div className={styles.discussion}>
        <div className={styles.discussion__content}>
          <Post
            key={post.title}
            id={post.id}
            user={post.user}
            community={post.community}
            title={post.title}
            text={post.text}
            upvotes={post.upvotes}
            upvotePercent={post.upvote_percent}
            vote={post.vote}
            created={post.created_at}
          />
          <CommentEditor />
          <Comment />
        </div>
      </div>
    );
  }
  return <span>Loading</span>;
};

Discussion.propTypes = {
  fetchDiscussion: PropTypes.func.isRequired
};
