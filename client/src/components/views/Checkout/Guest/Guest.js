import React from 'react';
import styles from './Guest.module.scss';

const Guest = () => {
  return (
    <div className={styles.root}>
      <label htmlFor="firstName">First Name</label>
      <input
        id='firstName'
        type="text"
        placeholder='First Name'
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id='lastName'
        type="text"
        placeholder='Last Name'
      />
      <label htmlFor="telephone">Telephone</label>
      <input
        id='telephone'
        type="text"
        placeholder='Telephone'
      />
      <label htmlFor="email">E-mail</label>
      <input
        id='email'
        type="text"
        placeholder='E-mail'
      />
      <label htmlFor="password">Password</label>
      <input
        id='password'
        type="password"
        placeholder='Password'
      />
      <label htmlFor="confirmPassword">Password Confirm</label>
      <input
        id='confirmPassword'
        type="password"
        placeholder='Password Confirm'
      />
    </div>
  );
};

export default Guest;
