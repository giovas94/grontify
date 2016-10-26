import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Addresses } from '../pages/Central/Addresses.js';

export default createContainer(({params}) => {
  const subscription = Meteor.subscribe('myAddresses');
  const loading = !subscription.ready();
  const currentUser = Meteor.userId();
  const myAddresses = Meteor.users.find(currentUser, {fields: { 'profile.addresses': 1 }}).fetch();

  return {
    loading,
    myAddresses,
    currentUser,
  }
}, Addresses);
