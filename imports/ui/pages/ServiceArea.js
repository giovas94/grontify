import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

export class ServiceArea extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <Helmet
          title="Área de Servicio"
          meta={[
              {"name": "description", "content": "Área de servicio para entrega de frutas y verduras a domicilio."}
          ]}
        />

        <h1>Área de Servicio</h1>

        <Row>
          <Col sm={12} md={12}>
            <br/>
            <p>
            Nuestro servicio de entrega de frutas y verduras a domicilio actualmente se brinda en la Ciudad de México, el Municipio de Huixquilucan y Naucalpan Estado de México.
            <br/>
            Pronto cubriremos más zonas, mantente pendiente.
            </p>
            <br/>
          </Col>
        </Row>

      </div>
    )
  }
}
