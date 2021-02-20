import React, {useState} from 'react';
import styles  from './Checkout.module.scss';
import {Link} from 'react-router-dom';
import {MdKeyboardArrowRight} from 'react-icons/md/index';
import Login from './Login/Login';
import Register from './Register/Register';
import Guest from './Guest/Guest';

const Checkout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const activeLogin = () => {
    setIsLogin(true);
    setIsRegister(false);
    setIsGuest(false);
  };
  const activeRegister = () => {
    setIsLogin(false);
    setIsRegister(true);
    setIsGuest(false);
  };
  const activeGuest = () => {
    setIsLogin(false);
    setIsRegister(false);
    setIsGuest(true);
  };

  return (
    <div className={styles.root}>
      <div className={styles.navigation}>
        <p>
          <Link to='/'>
            Home
          </Link>
          <MdKeyboardArrowRight />
          <Link to='/cart'>
            Shoping Cart
          </Link>
          <MdKeyboardArrowRight />
          Checkout
        </p>
      </div>
      <div className={styles.title}>
        <h1>Checkout</h1>
      </div>
      <div className={styles.data}>
        <div className={styles.dataType}>
          <p
            onClick={()=>activeLogin()}
            className={isLogin ? styles.active : ''}
          >
            Login
          </p>
          <p
            onClick={()=>activeRegister()}
            className={isRegister ? styles.active : ''}
          >
            Register
          </p>
          <p
            onClick={()=>activeGuest()}
            className={isGuest? styles.active : ''}
          >
            Guest
          </p>
        </div>
        <form>
          <div className={styles.form}>
            {isLogin && <Login />}
            {isRegister && <Register />}
            {isGuest && <Guest />}
          </div>
          <div className={styles.shipment}>
            <div>
              <h3>Shipping Method</h3>
              <label htmlFor='shipment' className={styles.cont}>Delivery with DHL
                <input id='shipment' name='shipment' type="radio" checked/>
                <span className={styles.checkmark}> </span>
              </label>
            </div>
            <div>
              <h3>Payment Method</h3>
              <label htmlFor='paymentCard' className={styles.cont}>Credit / Debit card
                <input id='paymentCard' name='payment' type="radio" checked/>
                <span className={styles.checkmark}> </span>
              </label>
              <label htmlFor='paymentPayPal' className={styles.cont}>PayPal Express Checkout
                <input id='paymentPayPal' name='payment' type="radio"/>
                <span className={styles.checkmark}> </span>
              </label>
            </div>
          </div>
          <div className={styles.comment}>
            <label htmlFor='comment' className={styles.com}>Add Comment About Your Order</label>
            <input id='comment' type='text' placeholder='Add Comment About Your Order (max 100 characters)'/>
            <div className={styles.confirm}>
              <div>
                <input id='Privacy' type="checkbox" name='confirmation'/>
                <label htmlFor='Privacy'>I have read and agree the the <span>Privacy Policy</span></label>
              </div>
              <div>
                <input id ='Terms' type="checkbox" name='confirmation'/>
                <label htmlFor='Terms'>I have read and agree the the <span>Terms & Conditions</span></label>
              </div>
            </div>
          </div>
          <button type='submit'>
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
