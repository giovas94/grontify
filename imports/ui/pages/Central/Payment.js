import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import {Row, Col} from 'react-bootstrap';

import { CreditCard } from '../../components/Market/Payment/CreditCard.js';
import { List } from '../../components/Market/Payment/List.js';

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
    Meteor.call('payments.insert', {card}, (err, result) => {
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
    })
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
          <p style={{fontSize: 'small'}}>Ingresa los datos exactamente como aparecen en la tarjeta.</p>
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
