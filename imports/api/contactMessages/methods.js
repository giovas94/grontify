import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import moment from 'moment';

import openpay from '../../startup/server/openpay-config';
import Future from 'fibers/future';

import { ContactMessages } from './contactMessages';

export const createOrder = new ValidatedMethod({
  name: 'contactMessages.insert',
  validate: new SimpleSchema({
    name: {
      type: String
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    phone: {
      type: String,
      optional: true
    },
    subject: {
      type: String
    },
    message: {
      type: String
    }
  }).validator(),
  run({name, email, phone, subject, message}) {
    const from = "Grontify <contacto@grontify.com>";

    const messageID = ContactMessages.insert({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    });

    Email.send({
      from,
      to: email,
      bcc: 'grontify@gmail.com',
      subject: `Contacto con Grontify - ${subject}`,
      text: `Hola ${name}, \nRecibimos tu mensaje de contacto, en breve nos comunicaremos contigo.\n\n
      El folio de tu mensaje es: ${messageID}
      \n\nTeléfono: ${phone}
      \n\nMensaje: ${message}.`
    });
  }
});
