import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
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
  comments,
  upvote,
  downvote
}) => {
  const contentState = convertFromRaw(JSON.parse(text));
  const editorState = EditorState.createWithContent(contentState);
  const history = useHistory();

  return (
    <div
      onClick={() => history.push(`/post/${id}`)}
      className={styles.post__card}
    >
      <div className={styles.post__card__aside}>
        <div className={styles.post__card__votes}>
          <button
            className={`${styles.post__card__vote} ${vote && styles.vote_red}`}
            onClick={event => {
              event.stopPropagation();
              upvote(id, community);
            }}
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
            onClick={event => {
              event.stopPropagation();
              downvote(id, community);
            }}
          >
            <FaArrowDown />
          </button>
        </div>
      </div>
      <div className={styles.post__card__main}>
        <div className={styles.post__card__header}>
          <Link
            onClick={event => event.stopPropagation()}
            to={`/r/${community}`}
            className={styles.post__card__community}
          >
            {`r/${community}`}
          </Link>
          <span className={styles.post__card__author}>
            Posted by{' '}
            <Link
              onClick={event => event.stopPropagation()}
              to={`/u/${user}/posts`}
              className={styles.post__card__user}
            >
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
            <span className={styles.post__card__comments}>
              {comments || 0} comment{comments !== 1 && 's'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  community: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  vote: PropTypes.bool,
  text: PropTypes.string
};
