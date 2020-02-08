import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import styles from './Discussion.module.css';
import Post from '../../components/Post';

export const Discussion = ({ fetchDiscussion }) => {
  const { post_id } = useParams();

  useEffect(() => {
    fetchDiscussion(post_id);
  }, [fetchDiscussion, post_id]);

  return (
    <div className={styles.discussion}>
      <div className={styles.discussion__content}>
        <Post />
      </div>
    </div>
  );
};

Discussion.propTypes = {
  fetchDiscussion: PropTypes.func.isRequired
};
