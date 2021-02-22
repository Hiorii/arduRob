import React, {useState, useContext, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styles  from './User.module.scss';
import {Link} from 'react-router-dom';
import {MdKeyboardArrowRight} from 'react-icons/md/index';
import Login from '../Checkout/Login/Login';
import Register from '../Checkout/Register/Register';
import UserProfile from './UserProfile/UserProfile';
import {UserContext} from '../../../context/userContext';
import {signUp, signIn, authUser} from '../../../redux/userRedux';

const initialState = {firstName: '',lastName:'',telephone:'',email:'',password:'',confirmPassword:'', adress:'', city:'',postCode:'', country:'' };

const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const currentUser = useContext(UserContext).user;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const activeLogin = () => {
    setIsLogin(true);
    setIsRegister(false);
  };

  const activeRegister = () => {
    setIsLogin(false);
    setIsRegister(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isRegister) {
      dispatch(signUp(formData, history));
    } else if(isLogin) {
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className={styles.root}>
      <div className={styles.navigation}>
        <p>
          <Link to='/'>
            Home
          </Link>
          <MdKeyboardArrowRight />
          Login
        </p>
      </div>
      {!currentUser?.token &&
        <div className={styles.loginContainer}>
          <div className={styles.title}>
            {isLogin && <h1>Login</h1>}
            {isRegister && <h1>Register</h1>}
          </div>
          <div className={styles.data}>
            <div className={styles.dataType}>
              <p onClick={()=>activeLogin()} className={isLogin ? styles.active : ''}>
                Login
              </p>
              <p onClick={()=>activeRegister()} className={isRegister ? styles.active : ''}>
                Register
              </p>
            </div>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className={styles.form}>
                {isLogin && <Login handleChange={handleChange}/>}
                {isRegister && <Register handleChange={handleChange}/>}
              </div>
              {isLogin &&
              <button type='submit'>
                Login
              </button>
              }
              {isRegister &&
              <button type='submit'>
                Register
              </button>
              }
            </form>
          </div>
        </div>
      }
      {currentUser?.token && <UserProfile />}
    </div>
  );
};

export default User;
