import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signInWithGoogle} from '../../../../redux/userRedux';
import PropTypes from 'prop-types';
import styles from './Login.module.scss';
import {AiFillGoogleCircle} from 'react-icons/ai';
import {GoogleLogin} from 'react-google-login';
import {GOOGLE_URL} from '../../../../config';

const Login = ({handleChange}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(signInWithGoogle({data: {result, token}}, history));
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = () => {
    console.log('Google sign in was unsuccessful. Try again later');
  };

  return (
    <div className={styles.root}>
      <div className={styles.googleCont}>
        <GoogleLogin
          clientId='504256198169-11igqfgkufvc1703me1hoefg72mbnbf4.apps.googleusercontent.com'
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={styles.googleBtn}>
              <AiFillGoogleCircle/>Log in with Google<AiFillGoogleCircle/>
            </button>
          )}
          buttonText="Login"
          redirectUri={GOOGLE_URL}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy='single_host_origin'
        />
      </div>
      <div className={styles.or}>
        <fieldset>
          <legend >or</legend>
        </fieldset>
      </div>
      <label htmlFor="email">E-mail</label>
      <input
        id='email'
        name='email'
        type="text"
        placeholder='E-mail'
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        id='password'
        name='password'
        type="password"
        placeholder='Password'
        onChange={handleChange}
      />
    </div>
  );
};

Login.propTypes = {
  handleChange: PropTypes.func,
};

export default Login;
