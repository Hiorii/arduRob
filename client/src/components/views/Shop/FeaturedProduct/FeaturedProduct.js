import React from 'react';
import {Link} from 'react-router-dom';
import styles from './FeaturedProduct.module.scss';
import PropTypes from 'prop-types';
import ProductBox from '../ProductBox/ProductBox';

const FeaturedProduct = ({title, products}) => {
  const productsList = products.data;
  const featuredProducts = productsList && productsList.data.filter(product => product.featured === true);
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{title}</h1>
          <p>Checkout for our best products.</p>
        </div>
        <div className={styles.featureProductsContainer}>
          {featuredProducts && featuredProducts.map((product, index) => {
            return (
              <div key={index} className={styles.featureProductsContainerInner}>
                <Link to='/' >
                  <ProductBox product={product}/>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

FeaturedProduct.propTypes = {
  products: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  title: PropTypes.string,
};

export default FeaturedProduct;
