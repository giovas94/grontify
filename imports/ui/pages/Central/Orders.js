import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import {List} from '../../components/Market/Orders/List.js';
import {Loader} from 'react-loaders';

export class OrdersPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Historial de mandados</h3>
        { this.props.loading ?
          <div style={{margin: '20px', position: 'absolute', left: '50%', marginRight: '-50%'}}>
            <Loader type="ball-scale-multiple" active={true} />
          </div>
        :
          <List myOrders={this.props.myOrders}/>
        }
      </div>
    )
  }
}

OrdersPage.propTypes = {
  loading: React.PropTypes.bool,
  myOrders: React.PropTypes.array,
  currentUser: React.PropTypes.string,
}
