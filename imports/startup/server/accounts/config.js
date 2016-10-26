import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.users.deny({
  update() { return true; },
  remove() { return true; }
});

Meteor.users.allow({
  update: () => false,
  remove: () => false,
});
