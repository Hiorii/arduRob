import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './Shop.module.scss';
import {getAllCategory, getAllSubCategory, fetchCategory, fetchSubCategory} from '../../../redux/categoryRedux';
import BannerShop from './BannerShop/BannerShop';
import FeaturedProduct from './FeaturedProduct/FeaturedProduct';
import ProductList from './ProductList/ProductList';
import Advert from './Advert/Advert';

const Shop = () => {
  const categories = useSelector(getAllCategory);
  const subCategories = useSelector(getAllSubCategory)?.data;
  const products = JSON.parse(localStorage.getItem('products'));
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchCategory());
    dispatch(fetchSubCategory());
  },[dispatch]);

  return (
    <div className={styles.root}>
      <BannerShop />
      <div className={styles.featuresProd}>
        <FeaturedProduct products={products} title='Feature Products'/>
      </div>
      <div className={styles.advert}>
        <Advert />
      </div>
      <div className={styles.productList}>
        <ProductList categories={categories} subCategories={subCategories} products={products}/>
      </div>
    </div>
  );
};

export default Shop;
