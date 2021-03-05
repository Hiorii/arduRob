import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img src='/images/notFound.png' alt='page_not_found'/>
      </div>
    </div>
  );
};

export default NotFound;
