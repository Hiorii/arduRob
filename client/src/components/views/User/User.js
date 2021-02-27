import React, {useState, useContext} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles  from './User.module.scss';
import {Link} from 'react-router-dom';
import {MdKeyboardArrowRight} from 'react-icons/md/index';
import Login from '../Checkout/Login/Login';
import Register from '../Checkout/Register/Register';
import UserProfile from './UserProfile/UserProfile';
import {UserContext} from '../../../context/userContext';
import {signUp, signIn, isUserFetched} from '../../../redux/userRedux';
import {AlertContext} from '../../../context/alertContext';

const initialState = {firstName: '',lastName:'',telephone:'',email:'',password:'',confirmPassword:'', adress:'', city:'',postCode:'', country:'' };

const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const currentUser = useContext(UserContext).user;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useContext(AlertContext);
  const isUserFetch = useSelector(isUserFetched);

  const activeLogin = () => {
    setIsLogin(true);
    setIsRegister(false);
  };

  const activeRegister = () => {
    setIsLogin(false);
    setIsRegister(true);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isRegister) {
      for (let key in formData) {
        if (formData[key] === '') {
          alert.dangerAlert(`${key} field can not be empty`);
          setTimeout(()=> {alert.closeAlert();},3000);
        } else if(formData.password !== formData.confirmPassword) {
          alert.dangerAlert(`Passwords are not the same`);
          setTimeout(()=> {alert.closeAlert();},3000);
        } else {
          await dispatch(signUp(formData, history));
          isUserFetch?.error && alert.dangerAlert('User with given email already exist');
          setTimeout(()=> {alert.closeAlert();},3000);
        }
      }
    } else if(isLogin) {
      if(formData.email === '') {
        alert.dangerAlert('E-mail field can not be empty');
        setTimeout(()=> {alert.closeAlert();},2000);

      } else if(formData.password === '') {
        alert.dangerAlert('Password field can not be empty');
        setTimeout(()=> {alert.closeAlert();},2000);
      } else {
        await dispatch(signIn(formData, history));
        isUserFetch?.error && alert.dangerAlert('Incorrect E-mail or Password');
        setTimeout(()=> {alert.closeAlert();},3000);
      }
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
      {currentUser?.token && <UserProfile user={currentUser}/>}
    </div>
  );
};

export default User;
