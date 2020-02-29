import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';
import { MdChatBubble } from 'react-icons/md';

import styles from './UserComment.module.css';

const Comment = ({ user, parent_comment_id, created, upvotes, text }) => {
  const contentState = convertFromRaw(JSON.parse(text));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div className={styles.comment__container}>
      <div className={styles.comment__line} />
      {parent_comment_id && <div className={styles.comment__line} />}
      <div className={styles.comment}>
        <div className={styles.comment__header}>
          <Link to={`/u/${user}/posts`} className={styles.comment__user}>
            {user}
          </Link>
          <span className={styles.comment__upvotes}>
            {upvotes} point{upvotes !== 1 && 's'}
          </span>
          <span className={styles.comment__time}>
            {moment(created).fromNow()}
          </span>
        </div>
        <div className={styles.comment__text}>
          <Editor editorState={editorState} readOnly={true} />
        </div>
        <div className={styles.comment__footer}>
          <span className={styles.comment__reply}>Reply</span>
        </div>
      </div>
    </div>
  );
};

export const UserComment = ({
  user,
  postTitle,
  community,
  postUser,
  comments
}) => {
  return (
    <div className={styles.user__comment}>
      <div className={styles.user__post}>
        <MdChatBubble className={styles.comment__icon} />
        <span className={styles.post__title}>
          <Link to={`/u/${user}`} className={styles.link}>
            {user}
          </Link>{' '}
          commented on '{postTitle}'
        </span>
        <Link to={`/r/${community}`} className={styles.link}>
          /r/{community}
        </Link>
        <span className={styles.post__author}>
          Posted by{' '}
          <Link to={`/u/${postUser}`} className={styles.link}>
            /u/{postUser}
          </Link>
        </span>
      </div>
      {comments.map(comment => (
        <Comment
          parent_comment_id={comment.parent_comment_id}
          user={comment.user}
          upvotes={comment.upvotes}
          text={comment.text}
          created={comment.created_at}
        />
      ))}
    </div>
  );
};

UserComment.propTypes = {};
