import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getAllCart} from '../../../redux/cartRedux';
import PropTypes from 'prop-types';
import styles from './Cart.module.scss';
import {Link} from 'react-router-dom';
import {MdKeyboardArrowRight} from 'react-icons/md/index';
import {BiMinus} from 'react-icons/bi/index';
import {BsPlus, BsArrowRightShort, BsArrowDown} from 'react-icons/bs';

const Cart = () => {
  const getProductFromCart = useSelector(getAllCart);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(()=> {
    setCartProducts(getProductFromCart);
  },[]);
  console.log(cartProducts);
  return (
    <div className={styles.root}>
      <div className={styles.navigation}>
        <p>
          <Link to='/'>
            Home
          </Link>
          <MdKeyboardArrowRight />
          Shoping Cart
        </p>
      </div>
      <div className={styles.container}>
        <h1>Shopping Cart</h1>
        <div className={styles.productsContainer}>
          <table>
            <thead>
              <tr>
                <td>image</td>
                <td>product name</td>
                <td>categoty</td>
                <td>quantity</td>
                <td>special discount</td>
                <td>total</td>
              </tr>
            </thead>
            <tbody>
              {cartProducts && cartProducts.map((product,index) => {
                return (
                  <tr key={index}>
                    <td><img src={product.image} alt={product.name}/></td>
                    <td className={styles.name}>{product.name}</td>
                    <td>{product.subCategoryId.name}</td>
                    <td className={styles.quantity}>
                      <div className={styles.quantityContainer}>
                        <div className={styles.inputContainer}>
                          <input
                            type="number"
                            id='quantity'
                            defaultValue='1'
                          />
                          <div>
                            <span> <BsPlus /> </span>
                            <span> <BiMinus /> </span>
                          </div>
                        </div>
                        <div className={styles.btnContainer}>
                          <button> X </button>
                        </div>
                      </div>
                    </td>
                    <td>special discount</td>
                    <td>total</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.summarizing}>
          <div className={styles.containerSum}>
            <div className={styles.item}>
              <p>use coupon code</p>
              <span>
                <button>
                  <BsArrowRightShort/>
                </button>
              </span>
            </div>
            <div className={styles.final}>
              <div>
                <p>Sub-Total</p>
                <p>price</p>
              </div>
              <div>
                <p>Discount Value</p>
                <p>price</p>
              </div>
              <div>
                <p>Total:</p>
                <p>price</p>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Link to='/shop'>
                <button>Continue Shopping</button>
              </Link>
              <Link to='/'>
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {

};

export default Cart;
