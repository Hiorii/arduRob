import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';
import Header from '../Header/Header';
import Alerts from '../../features/Alert/Alert';
import {fetchProducts, getAllProducts} from '../../../redux/productRedux';
import {fetchCategory} from '../../../redux/categoryRedux';
import {useDispatch} from 'react-redux';
import Popup from '../../features/Popup/Popup';

const MainLayout = ({children}) => {
  const location = useLocation();
  const dataProduct = JSON.parse(localStorage.getItem('products'));

  const dispatch = useDispatch();

  useEffect(()=> {
    if(!dataProduct) {
      dispatch(fetchProducts());
    }
    dispatch(fetchCategory());
  },[dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={styles.root}>
      <Alerts />
      <Popup />
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
