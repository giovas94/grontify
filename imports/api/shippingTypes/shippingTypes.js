import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ShippingTypes = new Mongo.Collection('shippingTypes');

ShippingTypes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ShippingTypes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
