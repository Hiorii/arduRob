import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styles from './ConfirmCheckout.module.scss';
import {UserContext} from '../../../../context/userContext';

const ConfirmCheckout = ({payment, shipping, finalSum}) => {
  const products = JSON.parse(localStorage.getItem('cart')).data;
  const user = useContext(UserContext).user.result;

  return (
    <div className={styles.root}>
      <h2>Order Summarizing</h2>
      <h4>Products:</h4>
      <table className={styles.productSummarizing}>
        <thead>
          <tr>
            <td>image</td>
            <td>product name</td>
            <td>quantity</td>
          </tr>
        </thead>
        <tbody className={styles.productSingle}>
          {products.map((product,index) => {
            return (
              <tr key={index}>
                <td><img src={product.image} alt={product.name}/></td>
                <td><p>{product.name}</p></td>
                <td><p>{product.cartQuantiy} pcs.</p></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.dataSummarizing}>
        <div className={styles.dataSummItem}>
          <h4>Delivery option:</h4>
          <p>{shipping}</p>
        </div>
        <div className={styles.dataSummItem}>
          <h4>Payment option:</h4>
          <p>{payment}</p>
        </div>
        <div className={styles.dataSummItem}>
          <h4>Billing address:</h4>
          <div className={styles.billing}>
            <div className={styles.billingAdrress}>
              <p>{user?.firstName} {user?.lastName}</p>
            </div>
            <div className={styles.billingAdrress}>
              <p>{user?.adress}</p>
            </div>
            <div className={styles.billingAdrress}>
              <p>{user?.postCode}, {user?.city}</p>
            </div>
          </div>
        </div>
        <div className={styles.dataSummItem}>
          <h4>Total sum to paid:</h4>
          <p>€ {finalSum}</p>
        </div>
      </div>
    </div>
  );
};

ConfirmCheckout.propTypes = {
  payment: PropTypes.string,
  shipping: PropTypes.string,
  finalSum: PropTypes.number,
};

export default ConfirmCheckout;
