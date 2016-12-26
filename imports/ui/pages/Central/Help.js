import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import {Row, Col} from 'react-bootstrap';

export class Help extends Component {
  constructor(props) {
    super(props);
  }

  handleChat() {
    $zopim(function() {
      $zopim.livechat.setName(Meteor.user().profile.name);
      $zopim.livechat.setEmail(Meteor.user().emails ? Meteor.user().emails[0].address : '');
      $zopim.livechat.window.show();
    });
  }

  render() {
    return (
      <div>
        <h2>Ayuda</h2>
        <p>
          Tienes alguna pregunta, problema o simplemente quieres comentarnos algo.<br/>
          <button className="btn btn-default btn-lg" onClick={this.handleChat.bind(this)}><i className="fa fa-comments-o"></i> Abrir chat de soporte para clientes!</button>
        </p>
      </div>
    )
  }
}
