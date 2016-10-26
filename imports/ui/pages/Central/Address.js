import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import Loader from 'react-loaders';

import {AddressDetail} from '../../components/Market/Addresses/AddressDetail.js';

export class Address extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {!this.props.loading ?
          <div>
            <h3>Editar dirección</h3>
            <div>
              <AddressDetail address={_.find(this.props.myAddress.profile.addresses, { 'id': this.props.params.id })}/>
            </div>
          </div>
        :
          <div style={{margin: '20px', position: 'absolute', left: '50%', marginRight: '-50%'}}>
            <Loader type="ball-scale-multiple" active={true} />
          </div>
        }
      </div>
    )
  }
}

Address.propTypes = {
  loading: React.PropTypes.bool,
  myAddress: React.PropTypes.object,
};
