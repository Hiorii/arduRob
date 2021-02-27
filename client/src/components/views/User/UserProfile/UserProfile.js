import React from 'react';
import styles from './UserProfile.module.scss';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logoutUser} from '../../../../redux/userRedux';
import PropTypes from 'prop-types';
import {AiFillWarning} from 'react-icons/ai';

const UserProfile = ({user}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogout = () => {
    dispatch(logoutUser());
    history.push('/');
    window.location.reload();
  };
  console.log(user);
  return (
    <div className={styles.root}>
      <div className={styles.basicUser}>
        <h1>Hello <span>{user.result.firstName}</span></h1>
        <p className={styles.basicEmail}>{user.result.email}</p>
        {(user.result.country.length !== 0 || user.result.city.length !== 0 || user.result.adress.length !== 0 || user.result.postCode.length !== 0 || user.result.telephone.length !== 0) &&
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
            {user.result.country.length === 0 &&
              <p className={styles.value}>
                {user.result.country}
              </p>
            }
            {user.result.country.length !== 0 &&
              <p className={styles.valueWarning}>
                You have to update missing data! <AiFillWarning/>
              </p>
            }
            <p className={styles.change}>change</p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>City</p>
            {user.result.city.length === 0 &&
            <p className={styles.value}>
              {user.result.city}
            </p>
            }
            {user.result.city.length !== 0 &&
            <p className={styles.valueWarning}>
              You have to update missing data! <AiFillWarning/>
            </p>
            }
            <p className={styles.change}>change</p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Address</p>
            {user.result.adress.length === 0 &&
            <p className={styles.value}>
              {user.result.adress}
            </p>
            }
            {user.result.adress.length !== 0 &&
            <p className={styles.valueWarning}>
              You have to update missing data! <AiFillWarning/>
            </p>
            }
            <p className={styles.change}>change</p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Post Code</p>
            {user.result.postCode.length === 0 &&
            <p className={styles.value}>
              {user.result.postCode}
            </p>
            }
            {user.result.postCode.length !== 0 &&
            <p className={styles.valueWarning}>
              You have to update missing data! <AiFillWarning/>
            </p>
            }
            <p className={styles.change}>change</p>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.desc}>Telephone</p>
            {user.result.telephone.length === 0 &&
            <p className={styles.value}>
              {user.result.telephone}
            </p>
            }
            {user.result.telephone.length !== 0 &&
            <p className={styles.valueWarning}>
              You have to update missing data! <AiFillWarning/>
            </p>
            }
            <p className={styles.change}>change</p>
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
