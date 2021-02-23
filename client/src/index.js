import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider from './context/userContext';
import AlertProvider from './context/alertContext';

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

