import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import './styles/global.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';
import Shop from './components/views/Shop/Shop';
import ProductPage from './components/views/Shop/ProductPage/ProductPage';
import Cart from './components/views/Cart/Cart';
import Checkout from './components/views/Checkout/Checkout';
import User from './components/views/User/User';
import SuccessCheckout from './components/views/Checkout/SuccessCheckout/SuccessCheckout';
import UserProfile from './components/views/User/UserProfile/UserProfile';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/shop' component={Shop} />
            <Route exact path='/shop/product/:id' render={(props) => <ProductPage {...props} keyProp={new Date().getTime()} key={new Date().getTime()}/>} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/cart/checkout' component={Checkout} />
            <Route exact path='/cart/checkout/success' component={SuccessCheckout} />
            <Route exact path='/login' component={User} />
            {/*<Route exact path='*' component={}/>*/}
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
