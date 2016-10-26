import React from 'react';
import Alert from 'react-s-alert';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => {
  Alert.success('Hasta mañana!', {
    position: 'top-right',
    effect: 'slide',
    timeout: 3500,
    offset: 100,
  });

  Meteor.logout(() => browserHistory.push('/'))
};

export const Navbar = ({currentRoute, isLoginPage}) => (
  <header className="cd-auto-hide-header">
  	<div className="logo"><Link to="/"><img height="50px" width="auto" src="http://res.cloudinary.com/grontify/image/upload/v1476989047/logo/grontify-logo-HQ.png" alt="grontify"/></Link></div>

  	<nav className="cd-primary-nav">
  		<a href="#cd-navigation" className="nav-trigger">
  			<span>
  				<em aria-hidden="true"></em>
  				Menu
  			</span>
  		</a>

  		<ul id="cd-navigation">
        <li><Link to="/" className={currentRoute[1].name === 'home' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/how-works" activeClassName="active">Cómo funciona</Link></li>
        <li><Link to="/contact" activeClassName="active">Contáctanos</Link></li>
        <li><Link to="/market" activeClassName="active">Mi Central</Link></li>
        <li>{!Meteor.userId() ?
          <Link to="/login" activeClassName="active">Inicia Sesión / Regístrate</Link>
        :
          <a href="#" onClick={handleLogout}>Logout</a>
        }</li>
  		</ul>
  	</nav>

    {currentRoute[1].name === 'market' ?
    <nav className="cd-secondary-nav">
      <ul>
        <li><Link to="/market" className={currentRoute[2].name === 'catalogue' ? 'active' : ''}>Hacer el mandado</Link></li>
        <li><Link to="/profile" className={currentRoute[2].name === 'profile' ? 'active' : ''}>Mi perfil</Link></li>
        <li><Link to="/payment" className={currentRoute[2].name === 'payment' ? 'active' : ''}>Datos de pago</Link></li>
        <li><Link to="/address" className={currentRoute[2].name === 'address' ? 'active' : ''}>Direcciones</Link></li>
        <li><Link to="/orders" className={currentRoute[2].name === 'orders' ? 'active' : ''}>Historial de mandados</Link></li>
        <li><Link to="/help" className={currentRoute[2].name === 'help' ? 'active' : ''}>Ayuda</Link></li>
      </ul>
    </nav>
    : '' }
  </header>
)
