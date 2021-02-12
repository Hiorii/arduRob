import React from 'react';
import styles from './Homepage.module.scss';
import Banner from '../Banner/Banner';
import Feedback from '../Feedback/Feedback';
import WhyUs from '../WhyUs/WhyUs';

const Homepage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.banner}>
        <Banner />
      </div>
      <div className={styles.banner}>
        <Feedback />
      </div>
      <div className={styles.us}>
        <WhyUs />
      </div>
    </div>
  );
};

export default Homepage;
