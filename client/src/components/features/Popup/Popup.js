import React, {useContext, useEffect, useRef} from 'react';
import styles from './Popup.module.scss';
import {AiOutlineClose} from 'react-icons/ai';
import {PopupContext} from '../../../context/popupContext';

const Popup = () => {
  const popup = useContext(PopupContext);
  const popupCont = useRef(null);

  const closePopup = () => {
    popup.closePopup();
  };

  const handleClickOutside = e => {
    if (popupCont.current && !popupCont.current.contains(e.target)) {
      closePopup();
    }
  };
  const handlePressEsc = e => {
    if (e.keyCode === 27) {
      closePopup();
    }
  };

  useEffect(()=> {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handlePressEsc);
    };
  },[closePopup]);

  return (
    <>
      {popup.popup.isVisible &&
      <div className={styles.root}>
        <div className={styles.container} ref={popupCont}>
          <div className={styles.close} onClick={closePopup}>
            <AiOutlineClose />
          </div>
          <div className={styles.title}>{popup.popup.title}</div>
          {popup.popup.context}
        </div>
      </div>
      }
    </>
  );
};

Popup.propTypes = {

};

export default Popup;
