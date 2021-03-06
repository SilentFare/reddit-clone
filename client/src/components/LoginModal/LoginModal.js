import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './LoginModal.module.css';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

export const LoginModal = ({
  show,
  toggleLogin,
  toggleRegister,
  login,
  location
}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const update = fn => event => fn(event.target.value);

  const handleChangeModal = () => {
    toggleLogin();
    toggleRegister();
  };

  const clearForm = () => {
    setName('');
    setPassword('');
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    login(
      {
        name,
        password
      },
      clearForm,
      location.pathname
    );
  };

  return (
    <Modal show={show} close={toggleLogin}>
      <form onSubmit={handleFormSubmit} className={styles.login__form}>
        <Input
          type='text'
          label='Name'
          onChange={update(setName)}
          value={name}
        />
        <Input
          type='password'
          label='Password'
          onChange={update(setPassword)}
          value={password}
        />
        <Button type='submit' label='Log In' className={styles.login__button} />
      </form>
      <span className={styles.login__register}>
        Need an account?{' '}
        <button
          className={styles.login__register__link}
          onClick={handleChangeModal}
        >
          Register
        </button>
      </span>
    </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};
