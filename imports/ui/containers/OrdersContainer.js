import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Orders } from '../../api/orders/orders.js';

import { OrdersPage } from '../pages/Central/Orders.js';

export default createContainer(({params}) => {
  const subscription = Meteor.subscribe('myOrders');
  const loading = !subscription.ready();
  const currentUser = Meteor.userId();
  const myOrders = Orders.find({customerId: currentUser}, {sort: { createdAt: -1 }}).fetch();

  return {
    loading,
    myOrders,
    currentUser,
  }
}, OrdersPage);
