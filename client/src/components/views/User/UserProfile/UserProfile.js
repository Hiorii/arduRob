import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logoutUser} from '../../../../redux/userRedux';

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogout = () => {
    dispatch(logoutUser());
    history.push('/');
    window.location.reload();
  };

  return (
    <div>
      <h1>Hello fom user profile</h1>
      <button onClick={()=>userLogout()}>Logout</button>
    </div>
  );
};

export default UserProfile;
