import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { MdChatBubble } from 'react-icons/md';
import { FaArrowUp, FaArrowDown, FaPlusCircle } from 'react-icons/fa';

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
  const [showComment, setShowComment] = useState(true);
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
        {showComment ? (
          <>
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
            <div
              className={styles.comment__collapse}
              onClick={() => setShowComment(false)}
            />
          </>
        ) : (
          <FaPlusCircle
            className={styles.comment__expand}
            onClick={() => setShowComment(true)}
          />
        )}
      </div>
      <div className={styles.comment__main}>
        <div className={styles.comment__header}>
          <Link to={`/u/${user}`} className={styles.comment__user}>
            {user}
          </Link>
          <span className={styles.comment__points}>
            {upvotes || 0} point{upvotes !== 1 && 's'}
          </span>
          <span className={styles.comment__created}>
            {moment(created).fromNow()}
          </span>
        </div>
        {showComment && (
          <>
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
            <ReplyEditor
              show={showEditor}
              post_id={post_id}
              parentCommentId={id}
            />
            {nestedComments}
          </>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  post_id: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  upvotes: PropTypes.number,
  children: PropTypes.array,
  vote: PropTypes.bool
};
