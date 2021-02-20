import React from 'react';
import styles from './AdvertOne.module.scss';

const AdvertOne = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img src='/images/arduBack.png' alt=""/>
        <div>
          <div className={styles.empty}> </div>
          <div className={styles.empty}> </div>
          <div className={styles.empty}> </div>
          <div className={styles.empty}> </div>
          <img src='/images/shop/robo3d90d.png' alt=""/>
        </div>
      </div>
    </div>
  );
};

export default AdvertOne;
