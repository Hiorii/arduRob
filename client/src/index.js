import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider from './context/userContext';
import AlertProvider from './context/alertContext';
import PopupProvider from './context/popupContext';

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <PopupProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </PopupProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

