import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

const UserProvider = ({children}) => {
  const currentUser = JSON.parse(localStorage.getItem('profile'));
  const [user, setUser] = useState({});

  useEffect(()=> {
    setUser(currentUser);
  },[]);
  console.log(user);
  return (
    <div>
      <UserContext.Provider value={{user}}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserProvider;
