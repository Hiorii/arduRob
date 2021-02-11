import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';

import MainLayout from './components/layout/MainLayout/MainLayout';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout />
        <Switch>
          {/*<Route exact path='/' component={}/>*/}
          {/*<Route exact path='*' component={}/>*/}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
