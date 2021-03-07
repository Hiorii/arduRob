import React, {useState, useEffect, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {handleAddQuantity, handleMinusQuantity, handleClear} from '../../../redux/cartRedux';
import {AlertContext} from '../../../context/alertContext';
import styles from './Cart.module.scss';
import {MdKeyboardArrowRight} from 'react-icons/md/index';
import {BiMinus, BiCartAlt} from 'react-icons/bi/index';
import {BsPlus, BsArrowRightShort} from 'react-icons/bs';
import Button from '../../common/Button/Button';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState();
  const [handleChange, setHandleChange] = useState(true);
  const [isCouponVisible, setIsCouponVisible] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const dispatch = useDispatch();
  const alert = useContext(AlertContext);

  const addQuantity = (id) => {
    setHandleChange(!handleChange);
    dispatch(handleAddQuantity(id));
  };

  const minusQuantity = (id) => {
    setHandleChange(!handleChange);
    dispatch(handleMinusQuantity(id));
  };

  const clearItem = (id) => {
    setHandleChange(!handleChange);
    dispatch(handleClear(id));
  };

  const handleCoupon = (e) => {
    e.preventDefault();
    if(coupon === 'arduRob') {
      setCouponDiscount(20);
      alert.successAlert('Couple code had been added');
      setTimeout(()=> {
        alert.closeAlert();
      },3000);
    } else {
      setCouponDiscount(0);
      alert.dangerAlert('Couple code does not exist');
      setTimeout(()=> {
        alert.closeAlert();
      },3000);
    }
  };

  const totalSub = () => {
    const prices = cartProducts?.map(product => product.price * product.cartQuantiy);
    const total = prices?.length > 0 && prices?.reduce((a,b)=> a + b);
    setFinalPrice(parseFloat(total).toFixed(2));
    return total;
  };

  const totalPrice = () => {
    const price = totalSub();
    if(couponDiscount === 0) {
      setFinalPrice(parseFloat(price).toFixed(2));
    } else {
      let discount = price * (couponDiscount/100);
      let pricePromo =  price - discount;
      setFinalPrice(parseFloat(pricePromo).toFixed(2));
    }
  };

  useEffect(()=> {
    totalSub();
    totalPrice();
  },[couponDiscount, cartProducts]);

  useEffect(()=> {
    setCartProducts(JSON.parse(localStorage.getItem('cart'))?.data || []);
  },[handleChange]);

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
      {cartProducts && cartProducts.length !== 0 &&
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
                  <td>total</td>
                </tr>
              </thead>
              <tbody>
                {cartProducts && cartProducts.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td><img src={product.image} alt={product.name}/></td>
                      <td className={styles.name}>{product.name}</td>
                      <td>{product.subCategoryId?.name}</td>
                      <td className={styles.quantity}>
                        <div className={styles.quantityContainer}>
                          <div className={styles.inputContainer}>
                            <input
                              type="number"
                              id='quantity'
                              value={product.cartQuantiy}
                              readOnly
                            />
                            <div>
                              <span onClick={()=>addQuantity(product._id)}> <BsPlus/> </span>
                              <span onClick={()=>minusQuantity(product._id)}> <BiMinus/> </span>
                            </div>
                          </div>
                          <div className={styles.btnContainer}>
                            <button onClick={()=>clearItem(product._id)}> X </button>
                          </div>
                        </div>
                      </td>
                      <td>€ {parseFloat(product.price * product.cartQuantiy).toFixed(2)}</td>
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
                  <button onClick={()=>setIsCouponVisible(!isCouponVisible)}>
                    <BsArrowRightShort/>
                  </button>
                </span>
              </div>
              {isCouponVisible &&
                <div className={styles.couponCont}>
                  <form onSubmit={e=>handleCoupon(e)}>
                    <input type="text" placeholder='Type arduRob for 20% discount' onChange={(e)=>setCoupon(e.target.value)}/>
                    <button type='submit'>Submit</button>
                  </form>
                </div>
              }
              <div className={styles.final}>
                <div className={styles.finalInner}>
                  <div>
                    <p>Sub-Total:</p>
                    <p>€ {finalPrice}</p>
                  </div>
                  <div>
                    <p>Discount Value:</p>
                    <p>{couponDiscount} %</p>
                  </div>
                  <div>
                    <p>Total:</p>
                    <p>€ {finalPrice}</p>
                  </div>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Link to='/shop'>
                  <button>Continue Shopping</button>
                </Link>
                <Link to={{
                  pathname: '/cart/checkout',
                  state: {cartProducts, finalPrice},
                }}
                >
                  <button>Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
      {!cartProducts || cartProducts.length === 0 &&
        <div className={styles.containerEmpty}>
          <BiCartAlt />
          <div>
            <p>Your cart is currently empty.</p>
            <p>Back to shop and find something for you.</p>
            <div className={styles.btn}>
              <Button data='Go to shop' url='/shop'/>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Cart;
