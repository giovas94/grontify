import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';
import Future from 'fibers/future';
import openpay from '../../../startup/server/openpay-config';

const settings = Meteor.settings.private.oauth.facebook;

Meteor.users.deny({
  update() { return true; },
  remove() { return true; }
});

Meteor.users.allow({
  update: () => false,
  remove: () => false,
});

ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      appId: settings.appId,
      loginStyle: 'popup',
      secret: settings.secret
    }
  }
);


Accounts.onCreateUser((options, user) => {
  var future = new Future();
  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
  }

  user.profile.status = 'active';

  let customerRequest = {
    'external_id': user._id,
    requires_account: false
  };

  if (user.services.facebook) {
    customerRequest.name = user.services.facebook.first_name;
    customerRequest.last_name = user.services.facebook.last_name;
    customerRequest.email = user.services.facebook.email;
  } else {
    customerRequest.name = user.profile.name;
    customerRequest.last_name = user.profile.last_name;
    customerRequest.email = user.emails[0].address;
  }

  openpay.customers.create(customerRequest, (error, customer) => {
    if (error) {
      future.throw(new Meteor.Error(error));
    } else {
      future.return(customer);
    }
  });

  console.log(future.wait());
  return _.assign(user, { "roles": { "grontify_com" : ['customer'] } }, { 'openpay_id': future.wait().id });
});
