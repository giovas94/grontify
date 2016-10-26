import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ContactMessages = new Mongo.Collection('contactMessages');

ContactMessages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ContactMessages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
