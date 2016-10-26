import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

export const CustomerMenu = () => (

  <div className="navbar">
    <ul>
      <li><Link to="/market">Hacer el mandado</Link></li>
      <li><Link to="/profile">Mi perfil</Link></li>
      <li><Link to="/payment">Datos de pago</Link></li>
      <li><Link to="/address">Direcciones</Link></li>
      <li><Link to="/orders">Historial de mandados</Link></li>
      <li><Link to="/help">Ayuda</Link></li>
    </ul>
  </div>
)
