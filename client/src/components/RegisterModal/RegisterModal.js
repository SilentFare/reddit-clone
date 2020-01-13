import React, { useState } from 'react';

import styles from './RegisterModal.module.css';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

export const RegisterModal = ({ show, toggleRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const update = fn => event => fn(event.target.value);

  const handleFormSubmit = event => {
    event.preventDefault();
  };

  return (
    <Modal show={show} close={toggleRegister}>
      <form onSubmit={handleFormSubmit} className={styles.register__form}>
        <Input label='Name' onChange={update(setName)} value={name} />
        <Input
          label='E-mail address'
          onChange={update(setEmail)}
          value={email}
        />
        <Input
          type='password'
          label='Password'
          onChange={update(setPassword)}
          value={password}
        />
        <Input
          type='password'
          label='Confirm Password'
          onChange={update(setConfirmPassword)}
          value={confirmPassword}
        />
        <Button
          type='submit'
          label='Register'
          className={styles.register__button}
        />
        <span className={styles.register__login}>
          Already have an account?{' '}
          <button className={styles.register__login__link}>Log In</button>
        </span>
      </form>
    </Modal>
  );
};
