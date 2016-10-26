import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export class VerifyEmail extends Component {
  componentDidMount() {
    Accounts.verifyEmail(this.props.params.token, (error) => {
      if ( error ) {
        console.log(error.reason);
      } else {
        console.log('Email verificado, ahora podrás disfrutar de todas las funciones de la aplicación. Gracias.');
      }
      browserHistory.push( '/' );
    });
  }

  render() {
    return(
      <div>
        <h3>Verificando Email</h3>
        <p>Estamos Verificando tu email. Serás redireccionado.</p>
      </div>
    )
  }
}

VerifyEmail.propTypes = {
  params: React.PropTypes.object,
};
