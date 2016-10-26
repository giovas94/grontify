import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Future from 'fibers/future';
import openpay from '../../../startup/server/openpay-config';

//Server -users methods
export const insertUsers = new ValidatedMethod({
  name: 'users.insert',
  validate: new SimpleSchema({
    name: { type: String },
    last_name: { type: String },
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
    password: { type: String }
  }).validator(),
  run({name, last_name, email, password}) {
    var future = new Future();

    const newUser = Accounts.createUser({
      email,
      password,
      profile: {
        name,
        last_name,
        status: 'active'
      }
    });

    Roles.addUsersToRoles(newUser, 'customer', 'grontify.com');

    Accounts.sendVerificationEmail(newUser);

    let customerRequest = {
      'external_id': newUser,
      name,
      last_name,
      email,
      requires_account: false
    };

    openpay.customers.create(customerRequest, (error, customer) => {
      if (error) {
        future.throw(new Meteor.Error(error));
      } else {
        future.return(customer);
      }
    });

    if (future.wait().id) {
      Meteor.users.update({ _id: newUser }, { $set: { 'openpay_id': future.wait().id } })
    }

    return future.wait();
  }
});

export const findUserByEmail = new ValidatedMethod({
  name: 'users.findUserByEmail',
  validate: new SimpleSchema({
    email: { type: String, regEx: SimpleSchema.RegEx.Email }
  }).validator(),
  run({email}) {
    const customer = Accounts.findUserByEmail(email);


    return customer ? Roles.userIsInRole(customer._id, 'customer', 'grontify.com') : false;
  }
});
