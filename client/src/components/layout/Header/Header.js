import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import {BiUserCircle, BiCartAlt} from 'react-icons/bi';

const Header = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const headerStyles = () => {
    setScrollPos(window.scrollY);
  };

  useEffect(()=> {
    window.addEventListener('scroll', headerStyles);
    return () => {
      window.removeEventListener('scroll', headerStyles);
    };
  },);

  return (
    <div className={scrollPos > 0 ? styles.root && styles.rootScroll: styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src='/images/logo.png' alt='logo'/>
          <span>ArduRob</span>
        </div>
        <div className={styles.list}>
          <Link to='/'>Shop</Link>
          <Link to='/'>About</Link>
          <Link to='/'>Contact</Link>
        </div>
        <div className={styles.icons}>
          <Link to='/'>
            <BiUserCircle />
          </Link>
          <Link to='/'>
            <BiCartAlt />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
