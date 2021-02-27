import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const PopupContext = React.createContext();

const PopupProvider = ({children}) => {
  const [popup, setPopup] = useState({
    isVisible: false,
    title: '',
    context: '',
  });

  const showPopup = (title, context) => {
    setPopup({
      isVisible: true,
      title: title,
      context: context,
    });
  };

  const closePopup = () => {
    setPopup({
      isVisible: false,
      title: '',
      context: '',
    });
  };
  return (
    <div>
      <PopupContext.Provider value={{popup,showPopup, closePopup }}>
        {children}
      </PopupContext.Provider>
    </div>
  );
};

PopupProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PopupProvider;
