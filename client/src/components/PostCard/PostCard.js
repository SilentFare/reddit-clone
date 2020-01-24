import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { MdChatBubble } from 'react-icons/md';

import styles from './PostCard.module.css';

export const PostCard = ({
  id,
  community,
  user,
  title,
  text,
  upvotes,
  created,
  upvote,
  downvote
}) => {
  return (
    <div className={styles.post__card}>
      <div className={styles.post__card__aside}>
        <div className={styles.post__card__votes}>
          <button
            className={styles.post__card__vote}
            onClick={() => upvote(id)}
          >
            <FaArrowUp />
          </button>
          <span className={styles.post__card__upvotes}>{upvotes}</span>
          <button
            className={styles.post__card__vote}
            onClick={() => downvote(id)}
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
          <span className={styles.post__card__text}>{text}</span>
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
