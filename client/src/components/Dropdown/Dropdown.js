import React, { useState, useRef } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import styles from './Dropdown.module.css';

export const Dropdown = ({ options, placeholder, selected, setSelected }) => {
  const [show, setShow] = useState(false);

  const inputRef = useRef();

  return (
    <div className={styles.dropdown}>
      <input
        type='text'
        ref={inputRef}
        placeholder={placeholder}
        className={styles.dropdown__input}
        onFocus={() => setShow(true)}
        onBlur={() => {
          setShow(false);
        }}
        value={selected}
        onChange={event => setSelected(event.target.value)}
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
          {options
            .filter(opt =>
              opt.name.toUpperCase().includes(selected.toUpperCase())
            )
            .map(opt => (
              <li
                key={opt.name}
                className={styles.dropdown__option}
                onMouseDown={() => {
                  setSelected(opt.name);
                  setShow(false);
                }}
              >
                {opt.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
