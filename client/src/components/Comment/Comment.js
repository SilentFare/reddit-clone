import React from 'react';
import PropTypes from 'prop-types';

import styles from './Comment.module.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { MdChatBubble } from 'react-icons/md';

export const Comment = ({
  id,
  user,
  community,
  text,
  vote,
  upvotes,
  upvote,
  downvote,
  created,
  children
}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__sidebar}>
        <div className={styles.comment__votes}>
          <button
            className={`${styles.comment__vote} ${vote && styles.vote_red}`}
            onClick={() => upvote(id, community)}
          >
            <FaArrowUp />
          </button>
          <span
            className={`${styles.comment__upvotes} ${vote &&
              styles.vote_red} ${vote === false && styles.vote_blue}`}
          >
            {upvotes || 0}
          </span>
          <button
            className={`${styles.comment__vote} ${vote === false &&
              styles.vote_blue}`}
            onClick={() => downvote(id, community)}
          >
            <FaArrowDown />
          </button>
        </div>
        <div className={styles.comment__collapse} />
      </div>
      <div className={styles.comment__header}>
        <span className={styles.comment__user}>{user}</span>
        <span className={styles.comment__points}>{upvotes} points</span>
        <span className={styles.comment__created}>{created}</span>
      </div>
      <span className={styles.comment__text}>{text}</span>
      <div className={styles.comment__footer}>
        <button className={styles.comment__button}>
          <MdChatBubble className={styles.comment__reply__icon} />
          Reply
        </button>
      </div>
      {children && (
        <div className={styles.comment__children}>
          <span>Comment</span>
          <span>Comment</span>
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {};
