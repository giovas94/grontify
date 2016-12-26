import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Market } from '../layouts/Market.js';

export default createContainer(({params}) => {
  return {
    currentUser: Meteor.user()
  }
}, Market);
