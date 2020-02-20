import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { MdChatBubble } from 'react-icons/md';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import styles from './Post.module.css';

export const Post = ({
  vote,
  upvote,
  downvote,
  id,
  community,
  upvotes,
  upvotePercent,
  title,
  text,
  user,
  comments,
  created
}) => {
  const contentState = convertFromRaw(JSON.parse(text));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div className={styles.post}>
      <div className={styles.post__aside}>
        <div className={styles.post__votes}>
          <button
            className={`${styles.post__vote} ${vote && styles.vote_red}`}
            onClick={() => upvote(id, community)}
          >
            <FaArrowUp />
          </button>
          <span
            className={`${styles.post__upvotes} ${vote &&
              styles.vote_red} ${vote === false && styles.vote_blue}`}
          >
            {upvotes || 0}
          </span>
          <button
            className={`${styles.post__vote} ${vote === false &&
              styles.vote_blue}`}
            onClick={() => downvote(id, community)}
          >
            <FaArrowDown />
          </button>
        </div>
      </div>
      <div className={styles.post__main}>
        <div className={styles.post__header}>
          <Link
            onClick={event => event.stopPropagation()}
            to={`/r/${community}`}
            className={styles.post__community}
          >
            {`r/${community}`}
          </Link>
          <span className={styles.post__author}>
            Posted by{' '}
            <Link
              onClick={event => event.stopPropagation()}
              to={`/u/${user}`}
              className={styles.post__user}
            >
              {`u/${user}`}
            </Link>
          </span>
          <Link to='/' className={styles.post__time}>
            {moment(created).fromNow()}
          </Link>
        </div>
        <div className={styles.post__content}>
          <span className={styles.post__title}>{title}</span>
          <Editor editorState={editorState} readOnly={true} />
        </div>
        <div className={styles.post__footer}>
          <button className={styles.post__button}>
            <MdChatBubble className={styles.comment__icon} />
            <span className={styles.post__comments}>
              {comments || 0} comment{comments !== '1' && 's'}
            </span>
          </button>
          <span className={styles.post__upvote__percent}>{`${Math.round(
            upvotePercent * 100
          )}% Upvoted`}</span>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  community: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  comments: PropTypes.number.isRequired,
  vote: PropTypes.bool,
  text: PropTypes.string
};
