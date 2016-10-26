import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export class RecoverPassword extends Component {
  handleSubmit(event) {
    event.preventDefault();

    Accounts.forgotPassword({
      email: this.refs.email.value
    })
  }
  render() {
    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <h1>Recuperar contraseña</h1>
        <form id="recoverPassword" onSubmit={ this.handleSubmit.bind(this) }>
          <label htmlFor="email">Ingresa tu email</label>
          <input id="email" ref="email" type="email" placeholder="Email"/>
          <button type="submit">Recuperar contraseña</button>
        </form>
      </div>
    )
  }
}
