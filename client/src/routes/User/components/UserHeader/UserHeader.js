import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './UserHeader.module.css';

export const UserHeader = ({ userName, userSection }) => {
  return (
    <div className={styles.user__header}>
      <NavLink
        exact={true}
        to={`/u/${userName}`}
        className={styles.user__header__section}
        activeClassName={styles.section_underline}
      >
        Overview
      </NavLink>
      <NavLink
        to={`/u/${userName}/posts`}
        className={styles.user__header__section}
        activeClassName={styles.section_underline}
      >
        Posts
      </NavLink>
      <NavLink
        to={`/u/${userName}/comments`}
        className={styles.user__header__section}
        activeClassName={styles.section_underline}
      >
        Comments
      </NavLink>
      <NavLink
        to={`/u/${userName}/upvoted`}
        className={styles.user__header__section}
        activeClassName={styles.section_underline}
      >
        Upvoted
      </NavLink>
      <NavLink
        to={`/u/${userName}/downvoted`}
        className={styles.user__header__section}
        activeClassName={styles.section_underline}
      >
        Downvoted
      </NavLink>
    </div>
  );
};

UserHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  userSection: PropTypes.string
};
