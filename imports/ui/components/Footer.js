import React from 'react';
import { Link, browserHistory } from 'react-router';

export const Footer = () => (
  // <!-- Page Footer-->
  <footer className="footer">
    <div className="container">
      <p>
        <i className="fa fa-2x fa-credit-card"></i>&nbsp;
        <i className="fa fa-2x fa-cc-mastercard"></i>&nbsp;
        <i className="fa fa-2x fa-cc-visa"></i>&nbsp;
        <i className="fa fa-2x fa-cc-amex"></i>&nbsp;
      </p>
      <ul>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/legal/terms">Términos de uso</Link></li>
        <li><Link to="/legal/privacy">Política de privacidad</Link></li>
      </ul>
      <p>&copy; 2016 Grontify SAS de CV. Todos los derechos reservados.</p>
    </div>
  </footer>
)
