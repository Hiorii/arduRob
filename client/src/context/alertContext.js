import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const AlertContext = React.createContext();

const AlertProvider = ({children}) => {
  const [alert, setAlert] = useState({
    isVisible: false,
    type: '',
    text: '',
  });

  const successAlert = (text) => {
    setAlert({
      isVisible: true,
      text: text,
      type: 'success',
    });
  };

  const warningAlert = (text) => {
    setAlert({
      isVisible: true,
      text: text,
      type: 'warning',
    });
  };

  const dangerAlert = (text) => {
    setAlert({
      isVisible: true,
      text: text,
      type: 'danger',
    });
  };

  const closeAlert = () => {
    setAlert({
      isVisible: false,
      text: '',
      type: '',
    });
  };
  return (
    <div>
      <AlertContext.Provider value={{alert, successAlert, warningAlert, dangerAlert, closeAlert}}>
        {children}
      </AlertContext.Provider>
    </div>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AlertProvider;
