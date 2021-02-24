import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import Filters from '../Filters/Filters';
import ProductBox from '../ProductBox/ProductBox';
import {Link} from 'react-router-dom';

const ProductList = ({products, categories}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const changePage = (e) => {
    setCurrentPage(e.target.id);
  };

  const pageNumberSetter = useCallback(
    () => {
      const pages = [];
      for(let i=1; i<= Math.ceil(allProducts.length/itemsPerPage);i++) {
        pages.push(i);
      }
      setPageNumbers(pages);
    },[allProducts.length, itemsPerPage]);

  const renderPageNumber = pageNumbers.map(number => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={e => changePage(e)}
          className={currentPage === number ? styles.activePage : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if(currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage -1);

    if((currentPage - 1)%pageNumberLimit===0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // let pageIncrementBtn = null;
  // if (pageNumbers.length > maxPageNumberLimit) {
  //   pageIncrementBtn = <li onClick={handleNextBtn}>...</li>;
  // }
  // let pageDecrementBtn = null;
  // if (pageNumbers.length > maxPageNumberLimit) {
  //   pageDecrementBtn = <li onClick={handlePrevBtn}>...</li>;
  // }

  useEffect(()=> {
    if(products.data){
      if(products.data.length > 0) {
        products.data && setAllProducts(products.data);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = products.data.slice(indexOfFirstItem, indexOfLastItem);
        products.data && setProductsPerPage(currentItems);
      }
    }
  },[products, currentPage, itemsPerPage]);

  useEffect(()=> {
    pageNumberSetter();
  },[productsPerPage, pageNumberSetter]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>All products</h1>
          <p>ArduRob products for great projects.</p>
        </div>
        <div className={styles.filters}>
          <Filters categories={categories} products={products}/>
        </div>
        <div className={styles.productList}>
          {productsPerPage && productsPerPage.map((product,index) => {
            return (
              <div
                key={index}
                className={styles.featureProductsContainerInner}
              >
                <Link
                  to={{
                    pathname: `/shop/product/${product._id}`,
                    state: product,
                  }}
                >
                  <ProductBox product={product}/>
                </Link>
              </div>
            );
          })}
          <div className={styles.pagesNumbers}>
            <ul>
              <li className={styles.btns}>
                <button
                  onClick={handlePrevBtn}
                  disabled={currentPage === pageNumbers[0] ? true : false}
                >
                  Prev
                </button>
              </li>
              {/*{pageIncrementBtn}*/}
              {renderPageNumber}
              {/*{pageDecrementBtn}*/}
              <li className={styles.btns}>
                <button
                  onClick={handleNextBtn}
                  disabled={currentPage === pageNumbers[pageNumbers.length - 1] ? true : false}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  categories: PropTypes.object,
  products: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default ProductList;
