import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import openpay from '../../startup/server/openpay-config';
import Future from 'fibers/future';

export const insertAddress = new ValidatedMethod({
  name: 'address.insert',
  validate: new SimpleSchema({
    address: {
      type: Object
    },
    "address.street": {
      type: String
    },
    "address.noInt": {
      type: String
    },
    "address.noExt": {
      type: String,
      optional: true
    },
    "address.line1": {
      type: String
    },
    "address.line2": {
      type: String
    },
    "address.state": {
      type: String
    },
    "address.postalCode": {
      type: String,
      regEx: SimpleSchema.RegEx.ZipCode,
    },
    "address.references": {
      type: String,
      optional: true
    }
  }).validator(),
  run({address}) {
    let myAddress = address;
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Inicia sesión o regístrate para ver esta sección');
    }

    _.assign(myAddress, {id: Random.id()});

    Meteor.users.update(this.userId, { $push: { 'profile.addresses': myAddress } });
  }
});

export const updateAddress = new ValidatedMethod({
  name: 'address.update',
  validate: new SimpleSchema({
    addressId: {
      type: String
    },
    address: {
      type: Object
    },
    "address.street": {
      type: String
    },
    "address.noInt": {
      type: String
    },
    "address.noExt": {
      type: String,
      optional: true
    },
    "address.line1": {
      type: String
    },
    "address.line2": {
      type: String
    },
    "address.state": {
      type: String
    },
    "address.postalCode": {
      type: String,
      regEx: SimpleSchema.RegEx.ZipCode,
    },
    "address.references": {
      type: String,
      optional: true
    }
  }).validator(),
  run({addressId, address}) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    _.assign(address, {id: addressId});

    Meteor.users.update(
      {'_id': this.userId, 'profile.addresses.id': addressId},
      { $set: { 'profile.addresses.$': address } }
    );
  }
});

export const setPhone = new ValidatedMethod({
  name: 'users.phone',
  validate: new SimpleSchema({
    phone: {
      type: String,
      regEx: /^\d{10}$/,
      min:10
    }
  }).validator(),
  run({phone}) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update(this.userId, { $set: {'profile.phone': phone} });
  }
});
