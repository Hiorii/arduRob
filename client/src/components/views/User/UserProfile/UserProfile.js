import React, {useContext, useEffect, useState} from 'react';
import styles from './UserProfile.module.scss';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logoutUser, userUpdate} from '../../../../redux/userRedux';
import PropTypes from 'prop-types';
import {AiFillWarning} from 'react-icons/ai';
import {PopupContext} from '../../../../context/popupContext';
import useDidMountEffect from '../../../../utils/customHooks';

const UserProfile = ({user}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const popup = useContext(PopupContext);
  const [editedValue, setEditedValue] = useState({});
  const [initializer, setInitializer] = useState(false);
  const [userData, setUserData]= useState({
    email: user.result.email,
    telephone: user.result.telephone,
    adress: user.result.adress,
    city: user.result.city,
    postCode: user.result.postCode,
    country: user.result.country,
    token: user.token,
  });

  const userLogout = () => {
    dispatch(logoutUser());
    history.push('/');
    window.location.reload();
  };

  const changeData = (e) => {
    e.preventDefault();
    popup.closePopup();
    setInitializer(!initializer);
  };

  const sendData = () => {
    dispatch(userUpdate(userData, history));
  };

  const handleChange = (e) => {
    setEditedValue({[e.target.name]: e.target.value});
  };

  const showEdit = (title, text, name) => {
    popup.showPopup(
      title,
      <form onSubmit={e => changeData(e)}>
        <fieldset>
          <legend>{text}</legend>
          <input type="text" name={name} onChange={e=>handleChange(e)}/>
        </fieldset>
        <div>
          <p>cancel</p>
          <button type='submit'>Save</button>
        </div>
      </form>
    );
  };
  useEffect(()=> {
    setUserData({
      ...userData,
      ...editedValue,
    });
  },[editedValue]);

  useDidMountEffect(() => {
    console.log('work');
    sendData();
  }, [initializer]);

  return (
    <div className={styles.root}>
      <div className={styles.basicUser}>
        <h1>Hello <span>{user.result.firstName}</span></h1>
        <p className={styles.basicEmail}>{user.result.email}</p>
        {(user.result.country.length <=1 || user.result.city.length <=1 || user.result.adress.length <=1 || user.result.postCode.length <=1 || user.result.telephone.length <=1) &&
        <div>
          <AiFillWarning/>
          <p>In order to finalize your shopping you have to update all required data</p>
          <AiFillWarning/>
        </div>
        }
      </div>
      <div className={styles.dataUser}>
        <h1>Account Data</h1>
        <div className={styles.dataMain}>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Name and surname</p>
            <p className={styles.value}>
              {user.result.firstName + ' ' + user.result.lastName}
            </p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Email</p>
            <p className={styles.value}>
              {user.result.email}
            </p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Country</p>
            {user.result.country.length >1 &&
              <p className={styles.value}>
                {user.result.country}
              </p>
            }
            {user.result.country.length <=1 &&
              <p className={styles.valueWarning}>
                You have to update missing data! <AiFillWarning/>
              </p>
            }
            <p className={styles.change} onClick={()=>showEdit('Country','country', 'country')}>change</p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>City</p>
            {user.result.city.length >1 &&
            <p className={styles.value}>
              {user.result.city}
            </p>
            }
            {user.result.city.length <=1 &&
            <p className={styles.valueWarning}>
              You have to update missing data! <AiFillWarning/>
            </p>
            }
            <p className={styles.change} onClick={()=>showEdit('City','city', 'city')}>change</p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Address</p>
            {user.result.adress.length >1 &&
            <p className={styles.value}>
              {user.result.adress}
            </p>
            }
            {user.result.adress.length <=1 &&
            <p className={styles.valueWarning}>
              You have to update missing data! <AiFillWarning/>
            </p>
            }
            <p className={styles.change} onClick={()=>showEdit('Address','address', 'adress')}>change</p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Post Code</p>
            {user.result.postCode.length >1 &&
            <p className={styles.value}>
              {user.result.postCode}
            </p>
            }
            {user.result.postCode.length <=1 &&
            <p className={styles.valueWarning}>
              You have to update missing data! <AiFillWarning/>
            </p>
            }
            <p className={styles.change} onClick={()=>showEdit('Post-code','post-code', 'postCode')}>change</p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Telephone</p>
            {user.result.telephone.length >1 &&
            <p className={styles.value}>
              {user.result.telephone}
            </p>
            }
            {user.result.telephone.length <=1 &&
            <p className={styles.valueWarning}>
              You have to update missing data! <AiFillWarning/>
            </p>
            }
            <p className={styles.change} onClick={()=>showEdit('Telephone','telephone', 'telephone')}>change</p>
          </div>
        </div>
      </div>
      {/*<button onClick={()=>userLogout()}>Logout</button>*/}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
};

export default UserProfile;
