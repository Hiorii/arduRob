import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Shop.module.scss';
import BannerShop from './BannerShop/BannerShop';
import {getAll, fetchCategory} from '../../../redux/categoryRedux';

const Shop = () => {
  const categories = useSelector(getAll);
  const dispatch = useDispatch();

  useEffect(()=> {
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
    </div>
  );
};

export default Shop;
