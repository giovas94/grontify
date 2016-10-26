import { Meteor } from 'meteor/meteor';

import { Orders } from '../orders';

Meteor.publish('myOrders', function() {
  if(!this.userId) {
    return this.ready();
  }

  return Orders.find({customerId: this.userId}, {sort: { createdAt: -1 }});

});

Meteor.publish('singleOrder', function(orderId) {
  if(!this.userId) {
    return this.ready();
  }

  return Orders.find({customerId: this.userId, _id: orderId});
});
