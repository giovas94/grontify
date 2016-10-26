import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../api/products/products.js';

import { Catalogue } from '../components/Market/Catalogue.js';

const device_session_id = OpenPay.deviceData.setup();

let searchQuery = new ReactiveVar("");

export default createContainer(({params}) => {

  const subscription = Meteor.subscribe('catalogue', searchQuery.get());
  const loading = !subscription.ready();
  const currentUser = Meteor.user();
  const catalogue = Products.find({}, {sort: { name: 1 }}).fetch();

  return {
    loading,
    searchQuery,
    catalogue,
    currentUser,
    device_session_id,
  }
}, Catalogue);
