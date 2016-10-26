import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../../ui/layouts/App.js';
import Market from '../../ui/layouts/Market.js';

import { Home } from '../../ui/pages/Home.js';
import { NotFound } from '../../ui/pages/NotFound.js';
import { How } from '../../ui/pages/How.js';
import { ContactUs } from '../../ui/pages/ContactUs.js';
import { Login } from '../../ui/pages/Login.js';
import { RecoverPassword } from '../../ui/pages/RecoverPassword.js';
import { ResetPassword } from '../../ui/pages/ResetPassword.js';
import { VerifyEmail } from '../../ui/pages/VerifyEmail.js';

import CatalogueContainer from '../../ui/containers/CatalogueContainer.js';
import ProfileContainer from '../../ui/containers/ProfileContainer.js';
import AddressesContainer from '../../ui/containers/AddressesContainer.js';
import AddressDetailContainer from '../../ui/containers/AddressDetailContainer.js';
import OrdersContainer from '../../ui/containers/OrdersContainer.js';
import OrderDetailContainer from '../../ui/containers/OrderDetailContainer.js';

import { Payment } from '../../ui/pages/Central/Payment.js';
import { Help } from '../../ui/pages/Central/Help.js';
import { Address } from '../../ui/pages/Central/Address.js';

import { AddressForm } from '../../ui/components/Market/Addresses/AddressForm.js';


const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const redirectIfLoggedIn = (nextState, replace, next) => {
  if (Meteor.userId()) {
    replace('/market');
  }

  next();
};

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route name="verify-email" path="/verify-email/:token" component={ VerifyEmail } />
    <Route path="/" component={App}>
      <IndexRoute name="home" component={Home} />
      <Route name="login" path="login" component={Login} onEnter={redirectIfLoggedIn} />
      <Route name="recover-password" path="recover-password" component={RecoverPassword} />
      <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
      <Route name="how" path="how-works" component={How} />
      <Route name="contact" path="contact" component={ContactUs} />
      <Route name="market" path="market" component={Market} onEnter={requireAuth}>
        <IndexRoute name="catalogue" component={CatalogueContainer} onEnter={requireAuth} />
        <Route name="profile" path="/profile" component={ProfileContainer} onEnter={requireAuth} />
        <Route name="payment" path="/payment" component={Payment} onEnter={requireAuth} />
        <Route name="address" path="/address" component={AddressesContainer} onEnter={requireAuth} />
        <Route name="newAddress" path="/address-new" component={AddressForm} onEnter={requireAuth} />
        <Route name="editAddress" path="/address/:id" component={AddressDetailContainer} onEnter={requireAuth} />
        <Route name="orders" path="/orders" component={OrdersContainer} onEnter={requireAuth} />
        <Route name="order" path="/order/:_id" component={OrderDetailContainer} onEnter={requireAuth} />
        <Route name="help" path="/help" component={Help} onEnter={requireAuth} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
)
