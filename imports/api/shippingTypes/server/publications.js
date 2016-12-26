import { Meteor } from 'meteor/meteor';

import { ShippingTypes } from '../shippingTypes.js';

Meteor.publish('shippingTypes', function() {
  if(!this.userId) {
    return this.ready();
  }

  return ShippingTypes.find({}, { fields: { _id: 1, name: 1, currentCost: 1 } });
});
