import React from 'react';
import styles from './Footer.module.scss';
import {AiFillTwitterCircle, AiFillInstagram} from 'react-icons/ai';
import {FaFacebook} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div>
          <p>© 2021 ArduRob™</p>
        </div>
        <div>
          <p><FaFacebook />Facebook</p>
          <p><AiFillTwitterCircle />Twitter</p>
          <p><AiFillInstagram />Instagram</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
