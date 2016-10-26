import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Address } from '../pages/Central/Address.js';

export default createContainer(({params}) => {
  const subscription = Meteor.subscribe('myAddresses');
  const loading = !subscription.ready();
  const currentUser = Meteor.userId();
  const myAddress = Meteor.users.findOne(
    {'_id': currentUser, 'profile.addresses.id': params.id},
    {fields: { 'profile.addresses': 1 }});

  return {
    loading,
    myAddress,
  }
}, Address);
