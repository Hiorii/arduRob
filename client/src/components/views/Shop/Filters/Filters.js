import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.scss';

const Filters = ({categories, products, subCategories, setByCategory, setCurrentPage}) => {
  const allCategories = categories?.data;
  const allProducts = products.data;
  const allSubcategories = subCategories;
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);

  const filterByCategory = (subCategoryName) => {
    const filteredAllProducts = allProducts.filter(product => product?.subCategoryId?.name === subCategoryName);
    setFilteredCategoryProducts(filteredAllProducts);
  };

  useEffect(()=> {
    setByCategory(filteredCategoryProducts);
    setCurrentPage(1);
  },[filteredCategoryProducts]);

  return (
    <div className={styles.root}>
      <div className={styles.category}>
        <h3>Products</h3>
        {allCategories && allCategories.map((category, index) => {
          return (
            <>
              <p key={index} className={styles.cat}>{category.name}</p>
              <div>
                {allSubcategories?.filter(sub => sub.categoryId.name === category.name).map((subcat, indeks) => {
                  return (
                    <p key={indeks} className={styles.subCat} onClick={()=>filterByCategory(subcat.name)}>- {subcat.name}</p>
                  );
                })}
              </div>
            </>
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
  products: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  subCategories: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  setByCategory: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default Filters;
