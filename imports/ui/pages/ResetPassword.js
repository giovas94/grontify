import React from 'react';
import { browserHistory } from 'react-router';

export class ResetPassword extends React.Component {
  handleSubmit(event) {
    event.preventDefault();

    const password = this.refs.newPassword.value;
    const repeatPassword = this.refs.repeatNewPassword.value;

    if (password !== repeatPassword) {
      return;
    }

    Accounts.resetPassword(this.props.params.token, password, (error) => {
      if (error) {
        console.log(error.reason);
      } else {
        browserHistory.push('/');
        console.log('Password reset!');
      }
    });
  }

  render() {
    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <h3>Restaura tu contraseña</h3>
        <form ref="resetPassword" onSubmit={ this.handleSubmit.bind(this) }>
          <label htmlFor="newPassword">Nueva contraseña</label>
          <input id="newPassword" ref="newPassword" type="password" placeholder="Nueva contraseña"/>
          <label htmlFor="repeatNewPassword">Repetir nueva contraseña</label>
          <input id="repeatNewPassword" ref="repeatNewPassword" type="password" placeholder="Nueva contraseña"/>
          <button type="submit">Restaurar contraseña &amp; Ingresar</button>
        </form>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
