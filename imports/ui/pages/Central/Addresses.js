import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import {List} from '../../components/Market/Addresses/List.js';
import {Loader} from 'react-loaders';

export class Addresses extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Direcciones de entrega</h3>
        <Link to="/address-new">Agregar dirección nueva</Link>

        { this.props.loading ?
          <div style={{margin: '20px', position: 'absolute', left: '50%', marginRight: '-50%'}}>
            <Loader type="ball-scale-multiple" active={true} />
          </div>
        :
          <List myAddresses={!this.props.myAddresses[0].profile.addresses ? [] : this.props.myAddresses[0].profile.addresses } />
        }
      </div>
    )
  }
}

Addresses.propTypes = {
  loading: React.PropTypes.bool,
  myAddresses: React.PropTypes.array,
  currentUser: React.PropTypes.string,
}
