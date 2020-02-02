import React, { useState, useRef } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import styles from './Dropdown.module.css';

export const Dropdown = () => {
  const [show, setShow] = useState(false);

  const inputRef = useRef();

  return (
    <div className={styles.dropdown}>
      <input
        ref={inputRef}
        className={styles.dropdown__input}
        onBlur={() => setShow(false)}
        onFocus={() => setShow(true)}
      />
      {show ? (
        <IoMdArrowDropup
          className={styles.dropdown__icon}
          onClick={() => inputRef.current.blur()}
        />
      ) : (
        <IoMdArrowDropdown
          className={styles.dropdown__icon}
          onClick={() => inputRef.current.focus()}
        />
      )}
      {show && (
        <ul className={styles.dropdown__list}>
          <li>Jokes</li>
          <li>Askreddit</li>
          <li>Javascript</li>
        </ul>
      )}
    </div>
  );
};
