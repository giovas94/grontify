import React from 'react';
import { Link, browserHistory } from 'react-router';

export const Footer = () => (
  // <!-- Page Footer-->
  <footer className="footer">
    <div className="container">
      <ul>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/legal/terms">Términos de uso</Link></li>
        <li><Link to="/legal/privacy">Política de privacidad</Link></li>
      </ul>
      <p>&copy; 2016 Grontify SAS de CV. All rights reserved.</p>
    </div>
  </footer>
)
