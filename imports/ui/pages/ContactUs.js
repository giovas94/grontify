import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

export class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sending: false
    }
  }

  submitMessage(event) {
    event.preventDefault();

    const { refs } = this;
    const name = refs.name.value;
    const email = refs.email.value;
    const subject = refs.subject.value;
    const message = refs.message.value;

    this.setState({sending: !this.state.sending});

    Meteor.call('contactMessages.insert', {name, email, subject, message}, (err) => {
      if (!err) {
        swal({
          title: "Mensaje enviado con éxito",
          text: "En breve nos pondremos en contacto contigo.",
          type: "success",
          showConfirmButton: false,
          timer: 3500
        });
      } else {
        swal({
          title: "Error. No se pudo enviar el mensaje",
          text: err.reason,
          type: "error",
          showConfirmButton: false,
          timer: 2500
        });
      }

      this.setState({sending: !this.state.sending});

      refs.name.value = '';
      refs.email.value = '';
      refs.subject.value = '';
      refs.message.value = '';
    });
  }

  render() {
    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <Helmet
          title="Contáctanos"
          meta={[
              {"name": "description", "content": "Contáctanos. Tienes alguna pregunta, duda o sugerencia. Frutas y verduras a domicilio."}
          ]}
        />

        <h1>Contáctanos</h1>

        <Row>
          <Col sm={12} md={8}>
            <p>Envianos un mensaje y te responderemos a la brevedad, casí siempre en unos minutos.</p>
            <form className="cf" onSubmit={this.submitMessage.bind(this)}>
              <div className="half left cf">
                <input type="text" id="input-name" ref="name" placeholder="Nombre" required/>
                <input type="email" id="input-email" ref="email" placeholder="Email" required/>
                <input type="text" id="input-subject" ref="subject" placeholder="Asunto" required/>
              </div>
              <div className="half right cf">
                <textarea name="message" id="input-message" ref="message" placeholder="Mensaje"></textarea>
              </div>
              <button type="submit" id="input-submit" className="btn btn-lg btn-block" disabled={this.state.sending}>{!this.state.sending ? 'Enviar mensaje' : 'Enviando...'}</button>
            </form>
          </Col>
          <Col sm={12} md={4}>
            <h3>Datos de contacto</h3>
            <h4>Nuestras Oficinas</h4>
            <p>Paseo de la Reforma No. 296 Piso 42 Col. Juárez Del. Cuauhtémoc CP. 06600 <br/>México, México</p>
            <h4>Teléfono</h4>
            <p>(55) 5264 8901</p>
            <h4><i className="fa fa-whatsapp"></i> Whatsapp</h4>
            <p>55 3555 2173</p>
            <h4>Email</h4>
            <p>contacto@grontify.com</p>
          </Col>
        </Row>

      </div>
    )
  }
}
