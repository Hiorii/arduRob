import React from 'react';
import styles from './Guest.module.scss';
import PropTypes from 'prop-types';
import Login from '../Login/Login';

const Guest = ({handleChange}) => {
  return (
    <div className={styles.root}>
      <label htmlFor="firstName">First Name</label>
      <input
        id='firstName'
        name='firstName'
        type="text"
        placeholder='First Name'
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id='lastName'
        name='lastName'
        type="text"
        placeholder='Last Name'
        onChange={handleChange}
      />
      <label htmlFor="telephone">Telephone</label>
      <input
        id='telephone'
        name='telephone'
        type="text"
        placeholder='Telephone'
        onChange={handleChange}
      />
      <label htmlFor="email">E-mail</label>
      <input
        id='email'
        name='email'
        type="text"
        placeholder='E-mail'
        onChange={handleChange}
      />

      <h3>Delivery data</h3>
      <label htmlFor="adress">Address</label>
      <input
        id='adress'
        name='adress'
        type="text"
        placeholder='Adress'
        onChange={handleChange}
      />
      <label htmlFor="city">City</label>
      <input
        id='city'
        name='city'
        type="text"
        placeholder='City'
        onChange={handleChange}
      />
      <label htmlFor="postCode">Post Code</label>
      <input
        id='postCode'
        name='postCode'
        type="text"
        placeholder='Post Code'
        onChange={handleChange}
      />
      <label htmlFor="country">Country</label>
      <input
        id='country'
        name='country'
        type="text"
        placeholder='Country'
        onChange={handleChange}
      />
    </div>
  );
};

Guest.propTypes = {
  handleChange: PropTypes.func,
};

export default Guest;
