import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.css';

export const Input = ({ type, label, onChange, value }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className={styles.input__container} onClick={handleClick}>
      <input
        type={type}
        ref={inputRef}
        id={label}
        className={styles.input}
        onChange={onChange}
        value={value}
        placeholder=' '
        autoComplete='off'
      />
      <label htmlFor={label} className={styles.input__label}>
        {label}
      </label>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
