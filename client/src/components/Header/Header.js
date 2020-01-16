import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.css';
import Button from '../Button';
import HamburgerButton from '../HamburgerButton';
import Logo from '../Logo';
import Placeholder from '../Placeholder';

export const Header = ({
  toggleRegister,
  toggleLogin,
  toggleSidebar,
  auth,
  fetching,
  logout
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <HamburgerButton onClick={toggleSidebar} />
        <Logo />
      </div>
      {!fetching && (
        <div className={styles.header__right}>
          {auth ? (
            <Button label='Logout' onClick={logout} />
          ) : (
            <>
              <Button label='Register' onClick={toggleRegister} />
              <Button label='Log In' onClick={toggleLogin} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
};
