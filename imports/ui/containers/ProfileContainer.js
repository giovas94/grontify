import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Profile } from '../pages/Central/Profile.js';

export default createContainer(({params}) => {
  return {
    currentUser: Meteor.user()
  }
}, Profile);
