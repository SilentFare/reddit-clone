import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import styles from './Discussion.module.css';
import Post from '../../components/Post';
import CommentEditor from '../../components/CommentEditor';
import Comment from '../../components/Comment';
import NoComments from '../../components/NoComments';

export const Discussion = ({
  fetchPostDiscussion,
  postsById,
  commentsByPost,
  fetchPostComments
}) => {
  const { post_id } = useParams();

  useEffect(() => {
    fetchPostDiscussion(post_id);
    fetchPostComments(post_id);
  }, [fetchPostDiscussion, fetchPostComments, post_id]);

  if (postsById[post_id] && commentsByPost[post_id]) {
    const { post } = postsById[post_id];
    const { comments } = commentsByPost[post_id];

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
          {comments.length ? <Comment /> : <NoComments />}
        </div>
      </div>
    );
  }
  return <span>Loading</span>;
};

Discussion.propTypes = {
  fetchPostDiscussion: PropTypes.func.isRequired
};
