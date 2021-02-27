import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../../redux/userRedux';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {UserContext} from '../../../context/userContext';
import styles from './Header.module.scss';
import {BiUserCircle, BiCartAlt} from 'react-icons/bi';
import {AiOutlineUser} from 'react-icons/ai';
import {cartTotalQuantity} from '../../../redux/cartRedux';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const [scrollPos, setScrollPos] = useState(0);
  const [activeShop, setActiveShop] = useState(false);
  const [activeAbout, setActiveAbout] = useState(false);
  const [activeContact, setActiveContact] = useState(false);
  const [cartTotal, setCartTotal] = useState('0');
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useContext(UserContext).user;
  const dispatch = useDispatch();
  const cartTotalValue = useSelector(cartTotalQuantity);
  const headerStyles = () => {
    setScrollPos(window.scrollY);
  };

  const userLogout = () => {
    dispatch(logoutUser());
    window.location.reload();
  };

  const showMenuUser = () => {
    setShowMenu(!showMenu);
  };

  useEffect(()=> {
    if(cartTotalValue?.length>0) {
      const total = cartTotalValue.reduce((a,b)=> a + b);
      setCartTotal(total);
    }
    window.addEventListener('scroll', headerStyles);
    return () => {
      window.removeEventListener('scroll', headerStyles);
    };
  },[cartTotalValue]);

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
    setShowMenu(false);
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
          <div className={styles.totalQuantity}>
            {cartTotal}
          </div>
          <div className={styles.ico} onClick={showMenuUser}>
            <BiUserCircle />
          </div>
          <div className={showMenu ? styles.user : styles.userActive}>
            <div className={styles.userData}>
              <div className={styles.loUser}>
                {!currentUser?.token &&
                <>
                  <div className={styles.userCommon}>
                    <AiOutlineUser /> User Panel
                  </div>
                  <Link to='/login'>
                    <p>Login</p>
                  </Link>
                </>
                }
              </div>
              <div className={styles.loUser}>
                {currentUser?.token &&
                <>
                  <div className={styles.userCommon}>
                    <AiOutlineUser />  {currentUser.result.firstName}
                  </div>
                  <Link to='/login'>
                    <p>Your profile</p>
                  </Link>
                  <p onClick={()=>userLogout()}>Logout</p>
                </>
                }
              </div>
            </div>
          </div>
          <div className={styles.ico}>
            <Link to='/cart'>
              <BiCartAlt />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
