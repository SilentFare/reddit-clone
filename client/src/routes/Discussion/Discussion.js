import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import styles from './Discussion.module.css';
import Post from '../../components/Post';
import CommentEditor from '../../components/CommentEditor';
import Comment from '../../components/Comment';
import NoComments from '../../components/NoComments';
import { deepCopy } from '../../utilities/deepCopy';

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

  function nestComments(commentList) {
    const listCopy = deepCopy(commentList);
    const commentMap = {};

    // move all the comments into a map of id => comment
    listCopy.forEach(comment => (commentMap[comment.id] = comment));

    // iterate over the comments again and correctly nest the children
    listCopy.forEach(comment => {
      if (comment.parent_comment_id !== null) {
        const parent = commentMap[comment.parent_comment_id];
        (parent.children = parent.children || []).push(comment);
      }
    });

    // filter the list to return a list of correctly nested comments
    return Object.values(commentMap).filter(
      comment => comment.parent_comment_id === null
    );
  }

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
            comments={post.comments}
            created={post.created_at}
          />
          <CommentEditor post_id={post_id} community={post.community} />
          {Object.values(comments).length ? (
            nestComments(Object.values(comments)).map(comment => (
              <Comment
                key={comment.id}
                id={comment.id}
                post_id={post_id}
                user={comment.user}
                text={comment.text}
                vote={comment.vote}
                upvotes={comment.upvotes}
                children={comment.children}
                created={comment.created_at}
              />
            ))
          ) : (
            <NoComments />
          )}
        </div>
      </div>
    );
  }
  return <span>Loading</span>;
};

Discussion.propTypes = {
  fetchPostDiscussion: PropTypes.func.isRequired
};
