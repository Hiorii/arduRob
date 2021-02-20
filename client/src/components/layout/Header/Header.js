import React, {useState, useEffect} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import styles from './Header.module.scss';
import {BiUserCircle, BiCartAlt} from 'react-icons/bi';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const [scrollPos, setScrollPos] = useState(0);
  const [activeShop, setActiveShop] = useState(false);
  const [activeAbout, setActiveAbout] = useState(false);
  const [activeContact, setActiveContact] = useState(false);

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
    if(history.location.pathname === '/shop') {
      setActiveShop(true);
      setActiveAbout(false);
      setActiveContact(false);
    } else if(history.location.pathname === '/about') {
      setActiveShop(false);
      setActiveAbout(true);
      setActiveContact(false);
    } else if(history.location.pathname === '/contact') {
      setActiveShop(false);
      setActiveAbout(false);
      setActiveContact(true);
    } else {
      setActiveShop(false);
      setActiveAbout(false);
      setActiveContact(false);
    }
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
          <Link to='/shop' className={activeShop ? styles.active : ''}>Shop</Link>
          <Link to='/' className={activeAbout ? styles.active : ''}>About</Link>
          <Link to='/' className={activeContact ? styles.active : ''}>Contact</Link>
        </div>
        <div className={styles.icons}>
          <Link to='/'>
            <BiUserCircle />
          </Link>
          <Link to='/cart'>
            <BiCartAlt />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
