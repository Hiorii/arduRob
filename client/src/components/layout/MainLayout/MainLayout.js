import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';
import Header from '../Header/Header';
import Alerts from '../../features/Alert/Alert';

const MainLayout = ({children}) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={styles.root}>
      <Alerts />
      <Header />
      <div className={styles.child}>
        {children}
      </div>
      {/*<div className={styles.footer}>*/}
      {/*  <Footer />*/}
      {/*</div>*/}
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
