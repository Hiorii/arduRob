import React from 'react';
import styles from './ProductPage.module.scss';
import ProductMain from './ProductMain/ProductMain';
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import AdvertOne from './AdvertOne/AdvertOne';
import Feedback from './Feedback/Feedback';
import {useSelector} from 'react-redux';
import {getAllProducts} from '../../../../redux/productRedux';

const ProductPage = () => {
  const products = JSON.parse(localStorage.getItem('products'));
  return (
    <div className={styles.root}>
      <div className={styles.productMain}>
        <ProductMain />
      </div>
      <div className={styles.advertOne}>
        <AdvertOne />
      </div>
      <div className={styles.featured}>
        <FeaturedProduct products={products} title='Related Products'/>
      </div>
      <div className={styles.feedback}>
        <Feedback />
      </div>
    </div>
  );
};

export default ProductPage;
