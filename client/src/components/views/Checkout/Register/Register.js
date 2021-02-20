import React from 'react';
import styles from './Register.module.scss';

const Register = () => {
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
      <h3>Delivery data</h3>
      <label htmlFor="adress">Address</label>
      <input
        id='adress'
        type="text"
        placeholder='Adress'
      />
      <label htmlFor="city">City</label>
      <input
        id='city'
        type="text"
        placeholder='City'
      />
      <label htmlFor="postCode">Post Code</label>
      <input
        id='postCode'
        type="text"
        placeholder='Post Code'
      />
      <label htmlFor="country">Country</label>
      <input
        id='country'
        type="text"
        placeholder='Country'
      />
    </div>
  );
};

export default Register;
