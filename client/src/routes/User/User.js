import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './User.module.css';
import UserHeader from './components/UserHeader';

export const User = ({ fetchUserPosts, fetchUserComments }) => {
  const { userName, userSection } = useParams();

  useEffect(() => {
    if (!userSection || userSection === 'posts') {
      fetchUserPosts(userName);
    }
    if (!userSection || userSection === 'comments') {
      fetchUserComments(userName);
    }
  }, [fetchUserPosts, fetchUserComments, userName, userSection]);

  return (
    <div className={styles.user}>
      <UserHeader userName={userName} userSection={userSection} />
    </div>
  );
};

User.propTypes = {
  fetchUserPosts: PropTypes.func.isRequired,
  fetchUserComments: PropTypes.func.isRequired
};
