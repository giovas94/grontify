import { Meteor } from 'meteor/meteor';

Meteor.publish('myAddresses', function() {
  if(!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(this.userId, { fields: { 'profile.addresses': 1 } })

});
