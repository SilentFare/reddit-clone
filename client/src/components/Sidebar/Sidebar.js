import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.css';
import HamburgerButton from '../HamburgerButton';
import Logo from '../Logo';
import CommunityLink from './components/CommunityLink';

export const Sidebar = ({
  show,
  toggleSidebar,
  fetchCommunities,
  communities
}) => {
  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return (
    <aside className={`${styles.sidebar} ${show && styles.sidebar_show}`}>
      <div className={styles.sidebar__header}>
        <HamburgerButton onClick={toggleSidebar} show={show} />
        <Logo />
      </div>
      <div className={styles.sidebar__communities}>
        {Object.values(communities).map(community => (
          <CommunityLink key={community.name} name={community.name} />
        ))}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  fetchCommunities: PropTypes.func.isRequired,
  communities: PropTypes.object.isRequired
};
