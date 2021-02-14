import React from 'react';
import styles from './ProductBox.module.scss';
import PropTypes from 'prop-types';
import {BsPlusSquare} from 'react-icons/bs';

const ProductBox = ({product}) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.photo}>
          <img src={product.image} alt={product.name}/>
        </div>
        <div className={styles.data}>
          <h3>{product.name}</h3>
          <div className={styles.dataInner}>
            <p>{product.price} EUR</p>
            <BsPlusSquare />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductBox.propTypes = {
  product: PropTypes.object,
};

export default ProductBox;
