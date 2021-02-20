import React from 'react';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.root}>
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
    </div>
  );
};

export default Login;
