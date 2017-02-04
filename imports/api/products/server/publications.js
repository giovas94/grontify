import { Meteor } from 'meteor/meteor';

import { Products } from '../products';

Meteor.publish('catalogue', function(searchQuery) {
  // if(!this.userId) {
  //   return this.ready();
  // }

  return Products.find(
    {
      name: {
        $regex: searchQuery, $options: 'i'
      },
      productStatus: {
        $nin: ['agotado', 'fuera-temporada']
      }
    },
    {
      fields: {
        name: 1,
        currentPrice: 1,
        unit: 1,
        productStatus: 1,
        imageURL: 1,
        description: 1,
      }
    }
  );

});
