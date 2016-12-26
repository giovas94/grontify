import { Meteor } from 'meteor/meteor';
import { Orders } from '../orders';

Meteor.publish('ordersCount', function() {
  const userId = this.userId;
  Counts.publish(this, 'Orders.ordersCount', Orders.find({customerId: userId}));
});

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
