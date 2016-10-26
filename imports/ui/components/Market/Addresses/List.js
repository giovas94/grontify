import React, { Component } from 'react';

import {SingleAddress} from './SingleAddress';

import { AutoResponsive } from 'autoresponsive-react';

export class List extends Component {
  render() {
    return (
      <div style={{display: 'flex', 'justifyContent': 'space-around', 'flexWrap': 'wrap'}}>
        {!this.props.myAddresses.length ?
          <div>No hay direcciones</div>
        :
          this.props.myAddresses.map((address) => (
            <SingleAddress key={address.id} address={address} />
          ))
        }
      </div>
    )
  }
}
