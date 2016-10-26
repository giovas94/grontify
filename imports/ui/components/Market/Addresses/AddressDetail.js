import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';
import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import {Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export class AddressDetail extends Component {
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

    // console.log(this.props.address.id, address);
    Meteor.call('address.update', {addressId: this.props.address.id, address}, (err) => {
      if (!err) {
        Alert.success(`Dirección modificada exitosamente!`, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
          html: true,
        });
        browserHistory.push('/address');
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
  }

  render() {
    const {address} = this.props;
    return (

      <form onSubmit={this.handleSubmit}>
        <Col xs={12}>
          <FormGroup>
            <ControlLabel>Calle</ControlLabel>
            <FormControl type="text" ref="street" defaultValue={address.street} placeholder="Calle" />
          </FormGroup>
        </Col>

        <Col xs={6} md={4}>
          <FormGroup>
            <ControlLabel>Número exterior</ControlLabel>
            <FormControl type="text" ref="noExt" defaultValue={address.noExt} placeholder="# exterior" />
          </FormGroup>
        </Col>

        <Col xs={6} md={4}>
          <FormGroup>
            <ControlLabel>Número interior</ControlLabel>
            <FormControl type="text" ref="noInt" defaultValue={address.noInt} placeholder="# interior" />
          </FormGroup>
        </Col>

        <Col xs={6} md={4}>
          <FormGroup>
            <ControlLabel>Código postal</ControlLabel>
            <FormControl type="text" ref="postalCode" defaultValue={address.postalCode}  placeholder="Código postal" />
          </FormGroup>
        </Col>

        <Col xs={6} md={4}>
          <FormGroup>
            <ControlLabel>Colonia</ControlLabel>
            <FormControl type="text" ref="line1" defaultValue={address.line1} placeholder="Colonia" />
          </FormGroup>
        </Col>

        <Col xs={6} md={4}>
          <FormGroup>
            <ControlLabel>Del/Mun</ControlLabel>
            <FormControl type="text" ref="line2" defaultValue={address.line2} placeholder="Delegación/Municipio" />
          </FormGroup>
        </Col>

        <Col xs={6} md={4}>
          <FormGroup>
            <ControlLabel>Estado</ControlLabel>
            <FormControl type="text" ref="state" defaultValue={address.state} placeholder="Estado" />
          </FormGroup>
        </Col>

        <Col xs={12}>
        <FormGroup>
          <ControlLabel>Referencias</ControlLabel>
          <FormControl type="text" ref="references" defaultValue={address.references} placeholder="Referencias" />
        </FormGroup>
        </Col>

        <Col xs={12} style={{textAlign: 'right'}}>
          <Button onClick={() => browserHistory.goBack()}>Cancelar</Button>
          {' '}
          <Button type="submit" bsStyle="primary">Guardar</Button>
        </Col>
      </form>
    )
  }
}
