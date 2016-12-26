import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { Tooltip, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';

import Loader from 'react-loaders';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const currentPassword = this.refs.currentPassword.value;
    const newPassword = this.refs.newPassword.value;
    const confirmNewPassword = this.refs.confirmNewPassword.value;

    if (newPassword !== confirmNewPassword) {
      Alert.error(`Las contraseñas no coinciden!`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3500,
        offset: 100,
        html: true,
      });
      return;
    }

    if (newPassword === currentPassword) {
      Alert.error(`La nueva contraseña no puede ser igual a la actual`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3500,
        offset: 100,
        html: true,
      });
      return;
    }

    Accounts.changePassword(currentPassword, newPassword, (err) => {
      if (err) {
        Alert.error(`<h4>Error, ${err.reason}!</h4>`, {
          position: 'top-right',
          effect: 'slide',
          onShow: function () {
              console.log(err.reason)
          },
          timeout: 3500,
          offset: 100,
          html: true,
        });
      } else {
        Alert.success('<h4>Password modificado!</h4>', {
          position: 'top-right',
          effect: 'slide',
          onShow: function () {
              console.log('Password modificado con éxito!')
          },
          timeout: 3500,
          offset: 100,
          html: true,
        });
      }
    });
  }

  setPhone(event) {
    event.preventDefault();

    if (event.target.value.length === 10) {
      Meteor.call('users.phone', {phone: event.target.value}, (err) => {
        if (!err) {
          Alert.success('Teléfono modificado!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 100,
            html: true,
          });
          console.log('Teléfono modificado.');
        } else {
          Alert.error(err.reason, {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 100,
            html: true,
          });
        }
      });
    } else {
      Alert.error('Deben ser 10 dígitos!', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3500,
        offset: 100,
      });
    }

    this.setState({editMode: !this.state.editMode});
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">Te enviaremos un mensaje cuando tu mandado este llegando!</Tooltip>
    );
    const {currentUser} = this.props;
    return (
      <div>
        {
        !currentUser ?
          <div style={{margin: '20px', position: 'absolute', left: '50%'}}>
            <Loader type="ball-scale-multiple" active={true} />
          </div>
        :
          <Row>
            <Col xs={12} md={6}>
              <h3>Mi Perfil</h3>
              <div className="profile">
                <b>Nombre</b> {currentUser.profile.name} {!currentUser.emails ? '' : <b>Apellido(s)</b>} {currentUser.profile.last_name}
                <br/>
                <b>Email</b> {currentUser.emails ? currentUser.emails[0].address : 'Ingresaste con facebook'}
                <br/>
                <b>Móvil</b>&nbsp;
                {!this.state.editMode ?
                    <span onClick={() => this.setState({editMode: !this.state.editMode})}>
                    {!currentUser.profile.phone ?
                      <span>No hay teléfono registrado
                        <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                          Da click para ingresar tu móvil
                        </Tooltip>
                      </span>
                    :
                      currentUser.profile.phone
                    }
                    </span>
                  :
                    <input type="text" ref="phone" placeholder="Tu móvil (10 dígitos)"
                    onBlur={this.setPhone.bind(this)} autoFocus/>
                }
                &nbsp;
                <OverlayTrigger placeholder="top" overlay={tooltip}>
                  <i className="fa fa-question-circle-o"></i>
                </OverlayTrigger>
              </div>
            </Col>
            {currentUser.emails ?
              <Col xs={12} md={6}>
                <h3>Cambiar contraseña</h3>
                <form ref="changePassword" onSubmit={this.handleSubmit.bind(this)}>

                  <Row>
                    <Col sm={12} md={12}>
                      <FormGroup
                        controlId="formChangePassword">
                        <ControlLabel>Contraseña actual</ControlLabel>
                        <FormControl
                          type="password"
                          ref="currentPassword"
                          placeholder="Contraseña actual"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <ControlLabel>Nueva contraseña</ControlLabel>
                        <FormControl
                          type="password"
                          ref="newPassword"
                          placeholder="Nueva contraseña"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <ControlLabel>Confirmar nueva contraseña</ControlLabel>
                        <FormControl
                          type="password"
                          ref="confirmNewPassword"
                          placeholder="Confirmar contraseña"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button type="submit" block>Cambiar de contraseña</Button>

                </form>
              </Col>
            : ''}
          </Row>
        }
      </div>
    )
  }
}

Profile.propTypes = {
  currentUser: PropTypes.object,
};
