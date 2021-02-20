import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({children}) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.child}>
        {children}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MainLayout;
