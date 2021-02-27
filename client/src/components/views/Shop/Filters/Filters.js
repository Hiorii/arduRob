import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.scss';

const Filters = ({categories, products, subCategories, setByCategory, setCurrentPage, setProductInitializer, productInitializer}) => {
  const allCategories = categories?.data;
  const allProducts = products.data;
  const allSubcategories = subCategories;
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
  const [initializer, setInitializer] = useState(false);

  const filterByCategory = (subCategoryName) => {
    if (subCategoryName === 'all') {
      setFilteredCategoryProducts(allProducts);
    } else {
      const filteredAllProducts = allProducts.filter(product => product?.subCategoryId?.name === subCategoryName);
      setFilteredCategoryProducts(filteredAllProducts);
    }
  };
  const sortProducts = e => {
    if (e.currentTarget.value === 'Name - A-Z') {
      filteredCategoryProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.currentTarget.value === 'Name - Z-A') {
      filteredCategoryProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (e.currentTarget.value === 'Price - Lowest to Highest') {
      filteredCategoryProducts.sort((a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0));
    } else if (e.currentTarget.value === 'Price - Highest to Lowest') {
      filteredCategoryProducts.sort((a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0));
    } else {
      return null;
    }
    setInitializer(!initializer);
  };

  useEffect(()=> {

    setByCategory(filteredCategoryProducts);
    setCurrentPage(1);
    setProductInitializer(!productInitializer);
  },[filteredCategoryProducts, initializer]);

  useEffect(()=> {
    setFilteredCategoryProducts(allProducts);
  },[]);

  return (
    <div className={styles.root}>
      <div className={styles.category}>
        <h3>Products</h3>
        <p className={styles.cat} onClick={()=>filterByCategory('all')}>All Products</p>
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
        <select defaultValue={'DEFAULT'} onChange={e => sortProducts(e)}>
          <option value='' disabled>
            Sort by
          </option>
          <option>Price - Lowest to Highest</option>
          <option>Price - Highest to Lowest</option>
          <option>Name - A-Z</option>
          <option>Name - Z-A</option>
        </select>
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
  setProductInitializer: PropTypes.func,
  productInitializer: PropTypes.bool,
};

export default Filters;
