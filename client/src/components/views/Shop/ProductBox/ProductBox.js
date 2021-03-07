import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {PopupContext} from '../../../../context/popupContext';
import {addToCart} from '../../../../redux/productRedux';
import PropTypes from 'prop-types';
import styles from './ProductBox.module.scss';
import {FaCartPlus} from 'react-icons/fa';

const ProductBox = ({product}) => {
  const dispatch = useDispatch();
  const popup = useContext(PopupContext);

  const closePop = () => {
    popup.closePopup();
  };

  const quickAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
    popup.showPopup(
      'Product added to cart',
      <div className={styles.addCart}>
        <img src={product.image} alt={product.name}/>
        <div className={styles.name}>
          <p>{product.name}</p>
          <p>€{product.price}</p>
        </div>
        <div className={styles.popBtn}>
          <Link to='/shop'>
            <p onClick={closePop}>back to shop</p>
          </Link>
          <Link to='/cart'>
            <button onClick={closePop}>Go to Cart</button>
          </Link>
        </div>
      </div>
    );
  };

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
            <div onClick={(e)=>quickAddToCart(e, product)}>
              <FaCartPlus />
            </div>
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
