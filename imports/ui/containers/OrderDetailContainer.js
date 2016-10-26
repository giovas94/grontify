import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Orders } from '../../api/orders/orders.js';

import { OrderDetail } from '../components/Market/Orders/Detail.js';

export default createContainer(({params}) => {
  const subscription = Meteor.subscribe('singleOrder', params._id);
  const loading = !subscription.ready();
  const currentUser = Meteor.user();
  const order = Orders.findOne({'_id': params._id});
  return {
    loading,
    order,
    currentUser,
  }
}, OrderDetail);
