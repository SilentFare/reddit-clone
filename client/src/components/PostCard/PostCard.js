import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { MdChatBubble } from 'react-icons/md';

import styles from './PostCard.module.css';

export const PostCard = () => {
  return (
    <div className={styles.post__card}>
      <div className={styles.post__card__aside}>
        <div className={styles.post__card__votes}>
          <FaArrowUp />
          <span className={styles.post__card__upvotes}>7k</span>
          <FaArrowDown />
        </div>
      </div>
      <div className={styles.post__card__main}>
        <div className={styles.post__card__header}>
          <Link className={styles.post__card__community}>r/Askreddit</Link>
          <span className={styles.post__card__author}>
            Posted by <Link className={styles.post__card__user}>u/Dollar</Link>
          </span>
          <Link className={styles.post__card__time}>2 hours ago</Link>
        </div>
        <div className={styles.post__card__content}>
          <span className={styles.post__card__title}>
            A married Irishman went into the confessional and said to his
            priest, 'I almost had an affair with another woman.'
          </span>
          <span className={styles.post__card__text}>
            The priest said, 'What do you mean, almost?' The Irishman said,
            'Well, we got undressed and rubbed together, but then I stopped.'
            The priest said, 'Rubbing together is the same as putting it in.
            You're not to see that woman again. For your penance, say five Hail
            Mary's and put £50 in the poor box.' The Irishman left the
            confessional, said his prayers, and then walked over to the poor
            box. He paused for a moment and then started to leave. The priest,
            who was watching, quickly ran over to him saying, 'I saw that. You
            didn't put any money in the poor box!' The Irishman replied, 'Yeah,
            but I rubbed the £50 on the box, and according to you, that's the
            same as putting it in!'
          </span>
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
