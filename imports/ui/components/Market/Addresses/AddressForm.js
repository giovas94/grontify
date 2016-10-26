import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import {Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export class AddressForm extends Component {
  constructor(props) {
    super(props);


    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    const { refs } = this;
    const street = ReactDOM.findDOMNode(refs.street).value;
    const noInt = ReactDOM.findDOMNode(refs.noInt).value;
    const noExt = ReactDOM.findDOMNode(refs.noExt).value;
    const line1 = ReactDOM.findDOMNode(refs.line1).value;
    const line2 = ReactDOM.findDOMNode(refs.line2).value;
    const state = ReactDOM.findDOMNode(refs.state).value;
    const postalCode = ReactDOM.findDOMNode(refs.postalCode).value;
    const references = ReactDOM.findDOMNode(refs.references).value;
    const address = { street, noInt, noExt, line1, line2, state, postalCode, references };

    Meteor.call('address.insert', {address}, (err) => {
      if (!err) {
        Alert.success(`<h4>Dirección guardada!</h4>`, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
          html: true,
        });

        if (this.props.location.state && this.props.location.state.fromOrder) {
          browserHistory.push('/market');
        } else {
          browserHistory.push('/address');
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

    refs.street.value = null;
    refs.noInt.value = null;
    refs.noExt.value = null;
    refs.line1.value = null;
    refs.line2.value = null;
    refs.state.value = null;
    refs.postalCode.value = null;
    refs.references.value = null;
  }

  render() {
    return (
      <Row>
        <h3 style={{marginLeft: '15px'}}>Agregar nueva dirección</h3>
        <Col>
          <form onSubmit={this.handleSubmit}>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Calle</ControlLabel>
                <FormControl type="text" ref="street" placeholder="Calle" />
              </FormGroup>
            </Col>

            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Número exterior</ControlLabel>
                <FormControl type="text" ref="noExt" placeholder="# exterior" />
              </FormGroup>
            </Col>

            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Número interior</ControlLabel>
                <FormControl type="text" ref="noInt" placeholder="# interior" />
              </FormGroup>
            </Col>

            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Código postal</ControlLabel>
                <FormControl type="text" ref="postalCode" placeholder="Código postal" />
              </FormGroup>
            </Col>

            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Colonia</ControlLabel>
                <FormControl type="text" ref="line1" placeholder="Colonia" />
              </FormGroup>
            </Col>

            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Del/Mun</ControlLabel>
                <FormControl type="text" ref="line2" placeholder="Delegación/Municipio" />
              </FormGroup>
            </Col>

            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Estado</ControlLabel>
                <FormControl type="text" ref="state" placeholder="Estado" />
              </FormGroup>
            </Col>

            <Col xs={12}>
            <FormGroup>
              <ControlLabel>Referencias</ControlLabel>
              <FormControl type="text" ref="references" placeholder="Referencias" />
            </FormGroup>
            </Col>

            <Col xs={12} style={{textAlign: 'right'}}>
              <Button onClick={() => browserHistory.goBack()}>Cancelar</Button>
              {' '}
              <Button type="submit" bsStyle="primary">Agregar</Button>
            </Col>
          </form>
        </Col>
      </Row>
    )
  }
}


AddressForm.contextTypes = {
  router: React.PropTypes.object
};
