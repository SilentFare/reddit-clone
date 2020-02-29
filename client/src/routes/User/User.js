import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './User.module.css';
import UserHeader from './components/UserHeader';
import PostCard from '../../components/PostCard';
import UserComment from './components/UserComment';

const groupCommentsByPost = comments => {
  return comments.reduce((obj, comment) => {
    (obj[comment.post_id] = obj[comment.post_id] || []).push(comment);
    return obj;
  }, {});
};

export const User = ({
  fetchUserPosts,
  fetchUserComments,
  postsByUser,
  commentsByUser
}) => {
  const { userName, userSection } = useParams();

  useEffect(() => {
    if (!userSection || userSection === 'posts') {
      fetchUserPosts(userName);
    }
    if (!userSection || userSection === 'comments') {
      fetchUserComments(userName);
    }
  }, [fetchUserPosts, fetchUserComments, userName, userSection]);

  return (
    <div className={styles.user}>
      <UserHeader userName={userName} userSection={userSection} />
      {userSection === 'posts' &&
        postsByUser[userName] &&
        Object.values(postsByUser[userName].byId).map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            community={post.community}
            user={post.user}
            title={post.title}
            text={post.text}
            upvotes={post.upvotes}
            comments={post.comments}
            vote={post.vote}
            created={post.created_at}
          />
        ))}
      {userSection === 'comments' &&
        commentsByUser[userName] &&
        Object.values(
          groupCommentsByPost(Object.values(commentsByUser[userName].comments))
        ).map(postComments => {
          const firstComment = postComments[0];
          return (
            <UserComment
              key={firstComment.post_id}
              user={firstComment.user}
              community={firstComment.community}
              postTitle={firstComment.post_title}
              postUser={firstComment.post_user_name}
              comments={postComments}
            />
          );
        })}
    </div>
  );
};

User.propTypes = {
  fetchUserPosts: PropTypes.func.isRequired,
  fetchUserComments: PropTypes.func.isRequired
};
