import React, {useState, useContext, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styles  from './Checkout.module.scss';
import {Link, useHistory} from 'react-router-dom';
import {MdKeyboardArrowRight} from 'react-icons/md/index';
import Login from './Login/Login';
import Register from './Register/Register';
import Guest from './Guest/Guest';
import {sendOrder} from '../../../redux/cartRedux';
import {UserContext} from '../../../context/userContext';

const Checkout = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [order, setOrder] = useState({});
  const [orderProducts, setOrderProducts] = useState({});
  const [shipping, setShipping] = useState('DHL Delivery');
  const [payment, setPayment] = useState('Card Payment');
  const [comment, setComment] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const history = useHistory();
  const cartProducts = JSON.parse(localStorage.getItem('cart'))?.data;
  const user = useContext(UserContext).user;

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

  const confirmOrder = (e) => {
    e.preventDefault();
    setOrder({
      email: user.result.email,
      name: user.result.firstName + ' ' + user.result.lastName,
      adress: user.result.adress,
      zipCode: user.result.postCode,
      city: user.result.city,
      country: user.result.country,
      phone: user.result.telephone,
      productsOrder: orderProducts.map(productOrder => {
        return ({
          product: productOrder.name,
          quantity: productOrder.cartQuantiy,
        });
      }),
      payment: payment,
      shipping: shipping,
      comment: comment,
      status: false,
    });
  };

  useEffect(()=> {
    setOrderProducts(cartProducts);
    if(order) {
      dispatch(sendOrder(order));
    }
  },[order]);

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
          {!user &&
            <div className={styles.form}>
              {isLogin && <Login />}
              {isRegister && <Register />}
              {isGuest && <Guest />}
            </div>
          }
          <div className={styles.shipment}>
            <div>
              <h3>Shipping Method</h3>
              <label htmlFor='shipment' className={styles.cont}>Delivery with DHL
                <input id='shipment' name='shipment' type="radio" value='DHL Delivery' checked={shipping} onChange={(e) => setShipping(e.target.value)}/>
                <span className={styles.checkmark}> </span>
              </label>
            </div>
            <div>
              <h3>Payment Method</h3>
              <label htmlFor='paymentCard' className={styles.cont}>Credit / Debit card
                <input id='paymentCard' name='payment' type="radio" value='Card Payment' defaultChecked onChange={(e) => setPayment(e.target.value)}/>
                <span className={styles.checkmark}> </span>
              </label>
              <label htmlFor='paymentPayPal' className={styles.cont}>PayPal Express Checkout
                <input id='paymentPayPal' name='payment' type="radio" value='PayPal Payment' onChange={(e) => setPayment(e.target.value)}/>
                <span className={styles.checkmark}> </span>
              </label>
            </div>
          </div>
          <div className={styles.comment}>
            <label htmlFor='comment' className={styles.com}>Add Comment About Your Order (optional)</label>
            <input id='comment' type='text' placeholder='Add Comment About Your Order (max 100 characters)' onChange={(e)=>setComment(e.target.value)}/>
            <div className={styles.confirm}>
              <div>
                <input id='Privacy' type="checkbox" name='confirmation' onChange={()=> setPrivacy(!privacy)}/>
                <label htmlFor='Privacy'>I have read and agree the the <span>Privacy Policy</span></label>
              </div>
              <div>
                <input id ='Terms' type="checkbox" name='confirmation' onChange={()=> setTerms(!terms)}/>
                <label htmlFor='Terms'>I have read and agree the the <span>Terms & Conditions</span></label>
              </div>
            </div>
          </div>
          <button type='submit' onClick={(e)=>confirmOrder(e)}>
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
