import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({data,url}) => {
  return (
    <div className={styles.root}>
      <Link to={url}>
        <div>{data}</div>
      </Link>
    </div>
  );
};

Button.propTypes = {
  data: PropTypes.string,
  url: PropTypes.string,
};

export default Button;
