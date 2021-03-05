import React, {useEffect} from 'react';
import styles from './SuccessCheckout.module.scss';
import Button from '../../../common/Button/Button';

const SuccessCheckout = () => {

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(()=> {
    localStorage.removeItem('cart');
    const products = JSON.parse(localStorage.getItem('products'));
    products.data.forEach(product => product.cartQuantiy = 0);
    localStorage.setItem('products', JSON.stringify(products));
  },[]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1> You are almost done! </h1>
        <p> To find details about payment and next steps please <span>check your email box.</span> </p>
        <p>Thank you for placing an order in our store.</p>
        <p>We hope to see you again in close future.</p>
        <p>Best regards from ArduRob Team!</p>
        <div onClick={refreshPage}>
          <Button data='Continue' url='/' />
        </div>
      </div>
    </div>
  );
};

export default SuccessCheckout;
