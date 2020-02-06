import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { MdChatBubble } from 'react-icons/md';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import styles from './PostCard.module.css';

export const PostCard = ({
  id,
  community,
  user,
  title,
  text,
  upvotes,
  vote,
  created,
  upvote,
  downvote
}) => {
  const contentState = convertFromRaw(JSON.parse(text));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div className={styles.post__card}>
      <div className={styles.post__card__aside}>
        <div className={styles.post__card__votes}>
          <button
            className={`${styles.post__card__vote} ${vote && styles.vote_red}`}
            onClick={() => upvote(id, community)}
          >
            <FaArrowUp />
          </button>
          <span
            className={`${styles.post__card__upvotes} ${vote &&
              styles.vote_red} ${vote === false && styles.vote_blue}`}
          >
            {upvotes || 0}
          </span>
          <button
            className={`${styles.post__card__vote} ${vote === false &&
              styles.vote_blue}`}
            onClick={() => downvote(id, community)}
          >
            <FaArrowDown />
          </button>
        </div>
      </div>
      <div className={styles.post__card__main}>
        <div className={styles.post__card__header}>
          <Link to={`/r/${community}`} className={styles.post__card__community}>
            {`r/${community}`}
          </Link>
          <span className={styles.post__card__author}>
            Posted by{' '}
            <Link to={`/u/${user}`} className={styles.post__card__user}>
              {`u/${user}`}
            </Link>
          </span>
          <Link to='/' className={styles.post__card__time}>
            {moment(created).fromNow()}
          </Link>
        </div>
        <div className={styles.post__card__content}>
          <span className={styles.post__card__title}>{title}</span>
          <Editor editorState={editorState} readOnly={true} />
        </div>
        <div className={styles.post__card__footer}>
          <button className={styles.post__card__button}>
            <MdChatBubble className={styles.comment__icon} />
            <span className={styles.post__card__comments}>26 comments</span>
          </button>
        </div>
      </div>
    </div>
  );
};
