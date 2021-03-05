import React, {useState, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles  from './Checkout.module.scss';
import {Link, useHistory} from 'react-router-dom';
import {MdKeyboardArrowRight} from 'react-icons/md/index';
import Login from './Login/Login';
import Register from './Register/Register';
import Guest from './Guest/Guest';
import ConfirmCheckout from './ConfirmCheckout/ConfirmCheckout';
import {sendOrder} from '../../../redux/cartRedux';
import {UserContext} from '../../../context/userContext';
import {signUp, signIn, isUserFetched} from '../../../redux/userRedux';
import {AlertContext} from '../../../context/alertContext';

const initialState = {firstName: '',lastName:'',telephone:'',email:'',password:'',confirmPassword:'', adress:'', city:'',postCode:'', country:'' };
const guestState = {firstName: '',lastName:'',telephone:'',email:'', adress:'', city:'',postCode:'', country:'' };

const Checkout = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [guestData, setGuestData] = useState(guestState);
  const [order, setOrder] = useState({});
  const [orderProducts, setOrderProducts] = useState({});
  const [shipping, setShipping] = useState('DHL Delivery');
  const [payment, setPayment] = useState('Card Payment');
  const [comment, setComment] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();
  const cartProducts = JSON.parse(localStorage.getItem('cart'))?.data;
  const currentUser = useContext(UserContext).user;
  const alert = useContext(AlertContext);
  const isUserFetch = useSelector(isUserFetched);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const finalSum = history.location.state?.finalPrice;

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isRegister) {
      for (let key in formData) {
        if (formData[key] === '') {
          alert.dangerAlert(`${key} field can not be empty`);
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if(formData.firstName.length < 2 || formData.lastName.length < 2) {
          alert.warningAlert('First name or last name length is to short');
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if(formData.telephone.length < 5) {
          alert.warningAlert('Telephone length is to short');
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if(formData.email.length < 5 || !formData.email.includes('@')) {
          alert.warningAlert('To short or incorrect email form');
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if(formData.password.length < 6) {
          alert.warningAlert('Password must have at least 6 chars');
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if(formData.password !== formData.confirmPassword) {
          alert.dangerAlert(`Passwords are not the same`);
          setTimeout(()=> {alert.closeAlert();},4000);
        } else {
          await dispatch(signUp(formData, history));
          isUserFetch?.error && alert.dangerAlert('User with given email already exist');
          setTimeout(()=> {alert.closeAlert();},6000);
        }
      }
    } else if(isLogin) {
      if(formData.email === '') {
        alert.dangerAlert('E-mail field can not be empty');
        setTimeout(()=> {alert.closeAlert();},4000);

      } else if(formData.password === '') {
        alert.dangerAlert('Password field can not be empty');
        setTimeout(()=> {alert.closeAlert();},4000);
      } else {
        await dispatch(signIn(formData, history));
        isUserFetch?.error && alert.dangerAlert('Incorrect E-mail or Password');
        setTimeout(()=> {alert.closeAlert();},4000);
      }
    } else if(isGuest) {
      for (let key in guestData) {
        if (guestData[key] === '') {
          alert.dangerAlert(`${key} field can not be empty`);
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if(guestData.firstName.length < 2 || guestData.lastName.length < 2) {
          alert.warningAlert('First name or last name length is to short');
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if(guestData.telephone.length < 5) {
          alert.warningAlert('Telephone length is to short');
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if(guestData.email.length < 5 || !guestData.email.includes('@')) {
          alert.warningAlert('To short or incorrect email form');
          setTimeout(()=> {alert.closeAlert();},4000);
        } else if (guestData.email !== '' && guestData.firstName !== '' && guestData.lastName !== '' && guestData.adress !== '' && guestData.postCode !== '' && guestData.city !== '' && guestData.country !== '' && guestData.telephone !== '') {
          setUser({
            result: {
              email: guestData.email,
              firstName: guestData.firstName,
              lastName: guestData.lastName,
              adress: guestData.adress,
              postCode: guestData.postCode,
              city: guestData.city,
              country: guestData.country,
              telephone: guestData.telephone,
            },
          });
        }
      }
    }
  };

  const handleChange = e => {
    isRegister && setFormData({...formData, [e.target.name]: e.target.value});
    isGuest && setGuestData({...guestData, [e.target.name]: e.target.value});
  };

  const confirmOrder = (e) => {
    e.preventDefault();
    if(!privacy || !terms) {
      alert.dangerAlert(`You must accept Privacy Policy and Terms & Conditions`);
      setTimeout(()=> {alert.closeAlert();},4000);
    } else {
      setIsConfirmed(true);
    }
  };

  const finishOrder = (e) => {
    e.preventDefault();
    setOrder({
      email: user.result.email,
      name: user.result.firstName + ' ' + user.result.lastName,
      adress: user.result.adress,
      zipCode: user.result.postCode,
      city: user.result.city,
      country: user.result.country,
      phone: user.result.telephone,
      productsOrder: orderProducts?.map(productOrder => {
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
    setUser(currentUser);
    setOrderProducts(cartProducts);
    if(order && Object.keys(order).length !==0 && user) {
      if(!privacy || !terms) {
        alert.dangerAlert(`You must accept Privacy Policy and Terms & Conditions`);
        setTimeout(()=> {alert.closeAlert();},4000);
      } else {
        dispatch(sendOrder(order));
        history.push('/cart/checkout/success');
      }
    }
  },[order, currentUser]);

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
        {!user &&
        <div className={styles.dataType}>
          <p
            onClick={() => activeLogin()}
            className={isLogin ? styles.active : ''}
          >
            Login
          </p>
          <p
            onClick={() => activeRegister()}
            className={isRegister ? styles.active : ''}
          >
            Register
          </p>
          <p
            onClick={() => activeGuest()}
            className={isGuest ? styles.active : ''}
          >
            Guest
          </p>
        </div>
        }
        <form onSubmit={(e)=>handleSubmit(e)}>
          {!user &&
            <div className={styles.form}>
              {isLogin && <Login handleChange={handleChange}/>}
              {isRegister && <Register handleChange={handleChange}/>}
              {isGuest && <Guest handleChange={handleChange}/>}
              {isLogin && <button type='submit' className={styles.btnUser}>Login</button>}
              {isRegister && <button type='submit' className={styles.btnUser}>Register</button>}
              {isGuest && <button type='submit' className={styles.btnUser}>Confirm</button>}
            </div>
          }
        </form>
        <form className={!user ? styles.shipmentDetails : ''}>
          {!isConfirmed &&
          <>
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
            <button onClick={(e)=>confirmOrder(e)}>
              Confirm Order
            </button>
          </>
          }
          {isConfirmed &&
          <div>
            <ConfirmCheckout payment={payment} shipping={shipping} finalSum={finalSum}/>
          </div>
          }
          {isConfirmed &&
          <button type='submit' onClick={(e) => finishOrder(e)}>
            Finish Order
          </button>
          }
        </form>
      </div>
    </div>
  );
};

export default Checkout;
