import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

const MainLayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MainLayout;
