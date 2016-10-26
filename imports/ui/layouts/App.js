import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';

import {Navbar} from '../components/Navbar.js';
import {Footer} from '../components/Footer.js';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';

export default class App extends Component {
  render() {
    return (
      // <!-- Page-->
      <div id="wrappper">
        <Helmet
            htmlAttributes={{"lang": "es", "amp": undefined}} // amp takes no value
            title="Frutas y verduas a domicilio"
            titleTemplate="Grontify.com - %s"
            defaultTitle="Grontify"
            meta={[
                {"name": "description", "content": "Frutas y verduras a domicilio. De la central a tu hogar"}
            ]}
            link={[
              {"rel": "icon", "href": "http://res.cloudinary.com/grontify/image/upload/c_pad,h_32,w_32/v1477066907/mascot/grontify-mascot-HQ.png"}
            ]}
        />

        {/* <!-- Page Head--> */}
        <Navbar currentRoute={this.props.routes} isLoginPage={this.props.location.pathname === '/login'} />

        <main className={`cd-main-content ${this.props.routes[1].name === 'market' ? 'sub-nav' : ''}`}>
          {this.props.children}
        </main>
        <Alert stack={{limit: 3}} />

        {/* <!-- Page Footer--> */}
        <Footer />

      </div>
    );
  }
}
