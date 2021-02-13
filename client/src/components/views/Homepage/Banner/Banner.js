import React from 'react';
import styles from './Banner.module.scss';

const Banner = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span>Arduino for everyone</span>
        <h1>Great arduino solutions for everyone</h1>
        <p>Do you need any Arduino based solution?</p>
        <p>Or do you maybe start some project and stuck?</p>
        <p>We can make your need come true.</p>
      </div>
      <div className={styles.images}>
        <img src='images/banner1.png' alt=""/>
        <img src='images/banner2.png' alt=""/>
        <img src='images/banner3.png' alt=""/>
      </div>
    </div>
  );
};

export default Banner;
