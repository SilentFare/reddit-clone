import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { MdChatBubble } from 'react-icons/md';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import styles from './Comment.module.css';
import ReplyEditor from '../ReplyEditor';
import CommentContainer from './CommentContainer';

export const Comment = ({
  id,
  user,
  text,
  vote,
  upvotes,
  upvote,
  downvote,
  post_id,
  created,
  children
}) => {
  const [showEditor, setShowEditor] = useState(false);
  const contentState = convertFromRaw(JSON.parse(text));
  const editorState = EditorState.createWithContent(contentState);

  const nestedComments = (children || []).map(comment => (
    <CommentContainer
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
  ));

  return (
    <div className={styles.comment}>
      <div className={styles.comment__sidebar}>
        <div className={styles.comment__votes}>
          <button
            className={`${styles.comment__vote} ${vote && styles.vote_red}`}
            onClick={() => upvote(id, post_id)}
          >
            <FaArrowUp />
          </button>
          <button
            className={`${styles.comment__vote} ${vote === false &&
              styles.vote_blue}`}
            onClick={() => downvote(id, post_id)}
          >
            <FaArrowDown />
          </button>
        </div>
        <div className={styles.comment__collapse} />
      </div>
      <div className={styles.comment__header}>
        <span className={styles.comment__user}>{user}</span>
        <span className={styles.comment__points}>
          {upvotes || 0} point{upvotes !== 1 && 's'}
        </span>
        <span className={styles.comment__created}>
          {moment(created).fromNow()}
        </span>
      </div>
      <Editor editorState={editorState} readOnly={true} />
      <div className={styles.comment__footer}>
        <button
          className={styles.comment__button}
          onClick={() => setShowEditor(!showEditor)}
        >
          <MdChatBubble className={styles.comment__reply__icon} />
          Reply
        </button>
      </div>
      <div className={styles.comment__children}>
        <ReplyEditor show={showEditor} post_id={post_id} parentCommentId={id} />
        {nestedComments}
      </div>
    </div>
  );
};

Comment.propTypes = {};
