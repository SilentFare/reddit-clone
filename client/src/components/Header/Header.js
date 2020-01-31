import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import Button from '../Button';
import HamburgerButton from '../HamburgerButton';
import Logo from '../Logo';
import { FaEdit, FaUser } from 'react-icons/fa';

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
            <>
              <Link to='/submit'>
                <FaEdit className={styles.header__icon} />
              </Link>
              <Link to='/user'>
                <FaUser className={styles.header__icon} />
              </Link>
              <Button label='Logout' onClick={logout} />
            </>
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
