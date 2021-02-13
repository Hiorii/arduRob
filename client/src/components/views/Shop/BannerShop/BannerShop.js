import React from 'react';
import styles from './BannerShop.module.scss';

const BannerShop = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span>Arduino for everyone</span>
        <h1>Buy whatever you need</h1>
        <p>Arduino boards, sensors and shields.</p>
        <p>All Arduino connected mechanical and electrical parts.</p>
        <p>Preparation of electrical wiring, mechanical constructions or codding.</p>
      </div>
      <div className={styles.images}>
        <img src='images/arduino.png' alt=""/>
      </div>
    </div>
  );
};

export default BannerShop;
