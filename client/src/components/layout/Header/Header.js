import React, {useState, useEffect} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import styles from './Header.module.scss';
import {BiUserCircle, BiCartAlt} from 'react-icons/bi';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const [scrollPos, setScrollPos] = useState(0);
  const [currentURL, setCurrentURL] = useState(history.location.pathname);
  const [activeClass, setActiveClass] = useState('');

  const headerStyles = () => {
    setScrollPos(window.scrollY);
  };

  useEffect(()=> {
    window.addEventListener('scroll', headerStyles);
    return () => {
      window.removeEventListener('scroll', headerStyles);
    };
  },[]);

  useEffect(()=> {
    setCurrentURL(history.location.pathname);
  },[location]);

  return (
    <div className={scrollPos > 0 ? styles.root && styles.rootScroll: styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to='/'>
            <img src='/images/logo.png' alt='logo'/>
            <span>ArduRob</span>
          </Link>
        </div>
        <div className={styles.list}>
          <Link to='/shop' >Shop</Link>
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
