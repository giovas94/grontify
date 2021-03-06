import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import App from '../../ui/layouts/App.js';
import Alert from 'react-s-alert';
// import Market from '../../ui/layouts/Market.js';

import { Home } from '../../ui/pages/Home.js';
import { NotFound } from '../../ui/pages/NotFound.js';
import { How } from '../../ui/pages/How.js';
import { ContactUs } from '../../ui/pages/ContactUs.js';
import { ServiceArea } from '../../ui/pages/ServiceArea.js';
import { Login } from '../../ui/pages/Login.js';
import { RecoverPassword } from '../../ui/pages/RecoverPassword.js';
import { ResetPassword } from '../../ui/pages/ResetPassword.js';
import { VerifyEmail } from '../../ui/pages/VerifyEmail.js';
import { Terms } from '../../ui/pages/Legal/Terms.js';
import { Privacy } from '../../ui/pages/Legal/Privacy.js';

import MarketContainer from '../../ui/containers/MarketContainer.js';
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


ReactGA.initialize('UA-89652373-1');

const fireTracking = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    Alert.warning(`Inicia sesión para ver está página.`, {
      position: 'top-right',
      effect: 'slide',
      timeout: 3500,
      offset: 100,
      html: true,
    });
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
  <Router onUpdate={fireTracking} history={browserHistory}>
    <Route name="verify-email" path="/verify-email/:token" component={ VerifyEmail } />
    <Route path="/" component={App}>
      <IndexRoute name="home" component={Home} />
      <Route name="login" path="login" component={Login} onEnter={redirectIfLoggedIn} />
      <Route name="recover-password" path="recover-password" component={RecoverPassword} />
      <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
      <Route name="how" path="how-works" component={How} />
      <Route name="contact" path="contact" component={ContactUs} />
      <Route name="service-area" path="service-area" component={ServiceArea} />
      <Route name="market" path="market" component={MarketContainer} >
        <IndexRoute name="catalogue" component={CatalogueContainer} />
        <Route name="profile" path="/profile" component={ProfileContainer} onEnter={requireAuth} />
        <Route name="payment" path="/payment" component={Payment} onEnter={requireAuth} />
        <Route name="address" path="/address" component={AddressesContainer} onEnter={requireAuth} />
        <Route name="newAddress" path="/address-new" component={AddressForm} onEnter={requireAuth} />
        <Route name="editAddress" path="/address/:id" component={AddressDetailContainer} onEnter={requireAuth} />
        <Route name="orders" path="/orders" component={OrdersContainer} onEnter={requireAuth} />
        <Route name="order" path="/order/:_id" component={OrderDetailContainer} onEnter={requireAuth} />
        <Route name="help" path="/help" component={Help} onEnter={requireAuth} />
      </Route>
      <Route name="terms" path="/legal/terms" component={Terms} />
      <Route name="privacy" path="/legal/privacy" component={Privacy} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
)
