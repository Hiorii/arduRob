import React, {useState, useEffect, useContext, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../../redux/userRedux';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {UserContext} from '../../../context/userContext';
import styles from './Header.module.scss';
import {BiUserCircle, BiCartAlt} from 'react-icons/bi';
import {AiOutlineUser, AiFillWarning} from 'react-icons/ai';
import {cartTotalQuantity} from '../../../redux/cartRedux';
import Burger from '../Burger/Burger';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const [scrollPos, setScrollPos] = useState(0);
  const [activeShop, setActiveShop] = useState(false);
  const [activeAbout, setActiveAbout] = useState(false);
  const [activeContact, setActiveContact] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [missingData, setMissingData] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useContext(UserContext).user;
  const dispatch = useDispatch();
  const cartTotalValue = useSelector(cartTotalQuantity);
  const userPopCont = useRef(null);
  const userIcon = useRef(null);

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

  const handleClickOutside = e => {
    if(showMenu) {
      if (userPopCont.current && !userPopCont.current.contains(e.target) && !userIcon.current.contains(e.target)) {
        setShowMenu(!showMenu);
      }
    }
  };
  const handlePressEsc = e => {
    if (e.keyCode === 27) {
      setShowMenu(!showMenu);
    }
  };

  useEffect(()=> {
    if(cartTotalValue?.length>0) {
      const total = cartTotalValue.reduce((a,b)=> a + b);
      setCartTotal(total);
    } else {
      setCartTotal(0);
    }

    if(currentUser) {
      if(Object.keys(currentUser).length > 0 && currentUser.result.adress.length > 1 && currentUser.result.city.length > 1 && currentUser.result.country.length > 1 && currentUser.result.postCode.length > 1 && currentUser.result.telephone.length > 1) {
        setMissingData(false);
      } else {
        setMissingData(true);
      }
    } else {
      setMissingData(false);
    }
    window.addEventListener('scroll', headerStyles);
    return () => {
      window.removeEventListener('scroll', headerStyles);
    };
  },[cartTotalValue, currentUser]);

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

  useEffect(()=> {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handlePressEsc);
    };
  },[]);

  return (
    <div id='root' className={scrollPos > 0 ? styles.root && styles.rootScroll: styles.root}>
      <div className={styles.container}>
        <div className={styles.burger}>
          <Burger pageWrapId={'list'} outerContainerId={'root'} />
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <img src='/images/logo.png' alt='logo'/>
            <span>ArduRob</span>
          </Link>
        </div>
        <div id='list' className={styles.list}>
          <Link to='/shop' className={activeShop ? styles.active : ''}>Shop</Link>
          <Link to='/about' className={activeAbout ? styles.active : ''}>About</Link>
          <Link to='/contact' className={activeContact ? styles.active : ''}>Contact</Link>
        </div>
        <div className={styles.icons}>
          <div className={styles.totalQuantity}>
            {cartTotal}
          </div>
          <div ref={userIcon} className={styles.ico} onClick={showMenuUser}>
            <BiUserCircle />
            {missingData && <div className={styles.warning}> <AiFillWarning /> </div>}
          </div>
          <div ref={userPopCont} className={showMenu ? styles.user : styles.userActive}>
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
                    {missingData &&
                    <div className={styles.warning}>
                      <AiFillWarning />
                      <p>You have missing data to fulfill</p>
                    </div>
                    }
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
