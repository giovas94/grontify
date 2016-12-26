import React from 'react';
import { CustomerMenu } from '../components/CustomerMenu';

export class Market extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOrder: JSON.parse(localStorage.getItem(`currentOrder-${Meteor.userId()}`)) || [],
    }
  }

  render() {
    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        {/* <CustomerMenu /> */}
        <h1>Mi central</h1>
        {this.props.children && React.cloneElement(this.props.children, { currentOrder: this.state.currentOrder})}
      </div>
    )
  }
}
