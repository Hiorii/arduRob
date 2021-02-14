import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.scss';

const Filters = ({categories}) => {
  const allCategories = categories;

  return (
    <div className={styles.root}>
      <div className={styles.category}>
        <h3>Products</h3>
        {allCategories && allCategories.data.map((category, index) => {
          return (
            <p key={index}>{category.name}</p>
          );
        })}
      </div>
      <div className={styles.sortBy}>
        <h3>Sort by:</h3>
        <p>Name: A-Z</p>
        <p>Name: Z-A</p>
        <p>Price: Low to High</p>
        <p>Price: High to Low</p>
      </div>
    </div>
  );
};

Filters.propTypes = {
  categories: PropTypes.object,
  products: PropTypes.object,
};

export default Filters;
