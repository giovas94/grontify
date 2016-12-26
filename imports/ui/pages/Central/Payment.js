import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import {Row, Col} from 'react-bootstrap';

import { CreditCard } from '../../components/Market/Payment/CreditCard.js';
import { List } from '../../components/Market/Payment/List.js';

const device_session_id = OpenPay.deviceData.setup();
console.log(device_session_id);

export class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingCardsList: false,
      cards: []
    }

    this.loadInterval = false;
  }

  componentDidMount() {
    this.setState({loadingCardsList: !this.state.loadingCardsList});

    this.loadInterval = setInterval(
      Meteor.call('listCards', (error, response) => {
        if ( error ) {
          Alert.error(error.reason, {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 100,
            html: true,
          });
        } else {
          this.loadInterval && this.setState({cards: response});
        }
        this.loadInterval &&  this.setState({loadingCardsList: !this.state.loadingCardsList});
      })
    , 500);
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  _newCard(card) {

    OpenPay.token.create(card, (response) => {
      console.log(response)

      const card_req = {
        token_id: response.data.id,
        device_session_id: device_session_id
      };

      Meteor.call('payments.insert', {card_req}, (err, result) => {
        if (!err) {
          Alert.success(`<h4>Tarjeta guardada!</h4>`, {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 100,
            html: true,
          });

          if (this.props.location.state && this.props.location.state.fromOrder) {
            browserHistory.push('/market');
          } else {
            this.setState({loadingCardsList: !this.state.loadingCardsList});
            Meteor.call('listCards', (error, response) => {
              if ( error ) {
                Alert.error(error.reason, {
                  position: 'top-right',
                  effect: 'slide',
                  timeout: 3500,
                  offset: 100,
                  html: true,
                });
              } else {
                this.setState({cards: response});
              }
              this.setState({loadingCardsList: !this.state.loadingCardsList});
            });
          }
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
    }, (error) => { console.log(error) });
  }

  _deleteCard(cardId) {
    swal({
      title: "¿Estás seguro?",
      text: "Eliminar esta tarjeta!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sí, quiero eliminarla!",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: true,
    },
    function(isConfirm){
      if (isConfirm) {
        Meteor.call('payments.delete', {cardId}, (err) => {
          if (!err) {
            swal("Tarjeta eliminada!", "La tarjeta fue eliminada.", "success");

            this.setState({loadingCardsList: !this.state.loadingCardsList});
            Meteor.call('listCards', (error, response) => {
              if ( error ) {
                Alert.error(error.reason, {
                  position: 'top-right',
                  effect: 'slide',
                  timeout: 3500,
                  offset: 100,
                  html: true,
                });
              } else {
                this.setState({cards: response});
              }
              this.setState({loadingCardsList: !this.state.loadingCardsList});
            });
          } else {
            swal('Error!', err.reason, "error");
          }
        });
      }
    }.bind(this));
  }

  render() {
    return (
      <Row>
        <Col sm={12} md={6}>
          <h3>Agregar método de pago</h3>
          <p style={{fontSize: 'small'}}>Ingresa los datos exactamente como aparecen en la tarjeta. <br/>Tu tarjeta y pagos son procesados de forma segura por <img src="img/logo_openpay.png" width="55px" alt="Openpay"/> </p>
          <CreditCard newCard={this._newCard.bind(this)} />
        </Col>

        <Col sm={12} md={6}>
          <h3>Mis tarjetas</h3>
          <List loading={this.state.loadingCardsList} cards={this.state.cards} deleteCard={this._deleteCard.bind(this)}/>
        </Col>
      </Row>
    )
  }
}


Payment.contextTypes = {
  router: React.PropTypes.object
};
