import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

export const Button = ({ to, href, label, type, className }) => {
  if (to) {
    return (
      <Link to={to} className={`${styles.button} ${className}`}>
        {label}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${styles.button} ${className}`}>
        {label}
      </a>
    );
  }

  return (
    <button type={type} className={`${styles.button} ${className}`}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  href: PropTypes.string
};
