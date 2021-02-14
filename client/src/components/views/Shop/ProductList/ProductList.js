import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import Filters from '../Filters/Filters';
import ProductBox from '../ProductBox/ProductBox';
import {Link} from 'react-router-dom';

const ProductList = ({products, categories}) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(()=> {
    console.log(products.data.data);
    products.data && setAllProducts(products.data.data);
  },[]);
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>All products</h1>
          <p>ArduRob products for great projects.</p>
        </div>
        <div className={styles.filters}>
          <Filters categories={categories} products={products}/>
        </div>
        <div className={styles.productList}>
          {allProducts && allProducts.map((product,index) => {
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

ProductList.propTypes = {
  categories: PropTypes.object,
  products: PropTypes.object,
};

export default ProductList;
