import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAll, fetchProducts} from '../../../redux/productRedux';
import PropTypes from 'prop-types';

const MainLayout = ({children}) => {
  const products = useSelector(getAll);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchProducts());
  },[]);
  console.log(products);
  return (
    <div>
      {children}
      <h1>hello</h1>
      {products.products.data.map((p,i)=> {
        return (
          <div key={i}>
            <p>{p.name}</p>
          </div>
        );
      })}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainLayout;
