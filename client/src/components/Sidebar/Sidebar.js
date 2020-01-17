import React, { useEffect } from 'react';

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
  }, []);

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
