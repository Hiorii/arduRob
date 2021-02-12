import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import './styles/global.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout />
        <Switch>
          <Route exact path='/' component={Homepage}/>
          {/*<Route exact path='*' component={}/>*/}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
