import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './CommunityLink.module.css';

export const CommunityLink = ({ name }) => (
  <NavLink
    className={styles.community__link}
    activeClassName={styles.community__link_active}
    to={`/r/${name}`}
  >
    {name}
  </NavLink>
);
