import React, {useState, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import styles from './ProductMain.module.scss';
import {addToCart} from '../../../../../redux/productRedux';
import {BsArrowRightShort, BsArrowDown} from 'react-icons/bs';
import {BiCheck, BiCartAlt} from 'react-icons/bi';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {PopupContext} from '../../../../../context/popupContext';

const ProductMain = () => {
  const history = useHistory();
  const [currentProduct] = useState(history.location.state);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const dispatch = useDispatch();
  const popup = useContext(PopupContext);

  const deliverySetter = () => {
    setIsDelivery(!isDelivery);
    setIsDescription(false);
  };

  const descriptionSetter = () => {
    setIsDescription(!isDescription);
    setIsDelivery(false);
  };

  const closePop = () => {
    popup.closePopup();
  };

  const addProductToCart = (currentProduct) => {
    console.log(currentProduct);
    //dispatch(addToCart(currentProduct));
    popup.showPopup(
      'Product added to cart',
      <div className={styles.addCart}>
        <img src={currentProduct.image} alt={currentProduct.name}/>
        <div className={styles.name}>
          <p>{currentProduct.name}</p>
          <p>€{currentProduct.price}</p>
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
      <div className={styles.navigation}>
        <p>
          <Link to='/'>
            Home
          </Link>
          <MdKeyboardArrowRight />
          <Link to='/shop'>
            Shop
          </Link>
          <MdKeyboardArrowRight />
          {currentProduct.subCategoryId.name}
          <MdKeyboardArrowRight />
          {currentProduct.name}
        </p>
      </div>
      <h1 className={styles.smallSizeScreen}>{currentProduct.name}</h1>
      <div className={styles.container}>
        <div className={styles.general}>
          {!isDelivery &&
          <span onClick={()=>deliverySetter()}>Delivery
            <button>
              <BsArrowRightShort/>
            </button>
          </span>
          }
          {isDelivery &&
          <>
            <span onClick={()=>deliverySetter()}>Delivery
              <button>
                <BsArrowDown/>
              </button>
            </span>
            <div className={styles.deliveryDesc}>
              Our products are delivered all over Poland and each of EU Countries. If you need detail information which
              you can not find here, then please email <a href='/'>info@ardurob.ar</a> and we will provide you required information as soon
              as we can.
            </div>
          </>
          }
          {!isDescription &&
          <span onClick={()=>descriptionSetter()}>Description
            <button>
              <BsArrowRightShort/>
            </button>
          </span>
          }
          {isDescription &&
          <>
            <span onClick={()=>descriptionSetter()}>Description
              <button>
                <BsArrowDown/>
              </button>
            </span>
            <div className={styles.deliveryDesc}>
              {currentProduct.overview}
            </div>
          </>
          }
        </div>
        <div className={styles.img}>
          <img src={currentProduct.image} alt={currentProduct.name}/>
        </div>
        <div className={styles.data}>
          <h3>{currentProduct.name}</h3>
          <span className={styles.ratingShort}>
            <p>Read 1000 Reviews</p>
          </span>
          <div className={styles.priceContainer}>
            <span className={styles.price}>€{currentProduct.price}</span>
            <p className={styles.stock}>
              <BiCheck /> In stock
            </p>
          </div>
          <div className={styles.quantity}>
            <div className={styles.btnContainer}>
              <button onClick={()=>addProductToCart(currentProduct)}> <BiCartAlt/> Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMain;
