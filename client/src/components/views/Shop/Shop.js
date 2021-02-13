import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Shop.module.scss';
import {getAllCategory, fetchCategory} from '../../../redux/categoryRedux';
import {getAllProducts, fetchProducts} from '../../../redux/productRedux';
import BannerShop from './BannerShop/BannerShop';
import FeaturedProduct from './FeaturedProduct/FeaturedProduct';

const Shop = () => {
  const categories = useSelector(getAllCategory);
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
  },[]);

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
      <FeaturedProduct products={products}/>
    </div>
  );
};

export default Shop;
