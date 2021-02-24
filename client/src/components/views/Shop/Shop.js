import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Shop.module.scss';
import {getAllCategory, fetchCategory} from '../../../redux/categoryRedux';
import {getAllProducts, fetchProducts} from '../../../redux/productRedux';
import BannerShop from './BannerShop/BannerShop';
import FeaturedProduct from './FeaturedProduct/FeaturedProduct';
import ProductList from './ProductList/ProductList';
import Advert from './Advert/Advert';

const Shop = () => {
  const categories = useSelector(getAllCategory);
  const products = JSON.parse(localStorage.getItem('products'));
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchCategory());
  },[dispatch]);

  return (
    <div className={styles.root}>
      <div className={styles.subMenu}>
        <div className={styles.list}>
          {categories && categories.data.map((category,index) => {
            return (
              <Link key={index} to='/'>{category.name}</Link>
            );
          })}
        </div>
      </div>
      <BannerShop />
      <div className={styles.featuresProd}>
        <FeaturedProduct products={products} title='Related Products'/>
      </div>
      <div className={styles.advert}>
        <Advert />
      </div>
      <div className={styles.productList}>
        <ProductList categories={categories} products={products}/>
      </div>
    </div>
  );
};

export default Shop;
