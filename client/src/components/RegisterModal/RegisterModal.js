import React from 'react';

import styles from './RegisterModal.module.css';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

export const RegisterModal = ({ show }) => {
  const handleFormSubmit = event => {
    event.preventDefault();
  };

  return (
    <Modal show={show}>
      <form onSubmit={handleFormSubmit} className={styles.register__form}>
        <Input label='Name' />
        <Input label='E-mail address' />
        <Input type='password' label='Password' />
        <Input type='password' label='Confirm Password' />
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
