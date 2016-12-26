import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../api/products/products.js';
import { ShippingTypes } from '../../api/shippingTypes/shippingTypes.js';

import { Catalogue } from '../components/Market/Catalogue.js';

const device_session_id = OpenPay.deviceData.setup();

let searchQuery = new ReactiveVar("");

export default createContainer(({params}) => {

  const subscriptionOrdersCount = Meteor.subscribe('ordersCount');
  const subscription = Meteor.subscribe('catalogue', searchQuery.get());
  const subscriptionShippingTypes = Meteor.subscribe('shippingTypes');
  const loading = !subscription.ready() && !subscriptionOrdersCount.ready() && !subscriptionShippingTypes.ready();
  const currentUser = Meteor.user();
  const ordersCount = Counts.get('Orders.ordersCount');
  const catalogue = Products.find({}, {sort: { name: 1 }}).fetch();
  const shippingTypes = ShippingTypes.find({}).fetch();

  return {
    loading,
    searchQuery,
    catalogue,
    ordersCount,
    shippingTypes,
    currentUser,
    device_session_id,
  }
}, Catalogue);
