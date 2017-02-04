import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import openpay from '../../startup/server/openpay-config';
import Future from 'fibers/future';

// export const insertPaymentMethod = new ValidatedMethod({
//   name: 'payments.insert',
//   validate: new SimpleSchema({
//     card: {type: Object},
//     'card.holder_name': {type: String},
//     'card.card_number': {type: Number},
//     'card.cvv2': {type: Number},
//     'card.expiration_month': {type: Number},
//     'card.expiration_year': {type: Number}
//   }).validator(),
//   run({card}) {
//     var future = new Future();
//     var listFut = new Future();
//
//     if (!this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//
//     const openpayId = Meteor.users.find({_id: this.userId}, {fields: { openpay_id: 1 }}).fetch()[0].openpay_id;
//
//     openpay.customers.cards.list(openpayId, (error, cards) => {
//       if (error) {
//         listFut.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
//       } else {
//         listFut.return(cards);
//       }
//     });
//
//     const cardExist = _.includes(_.map(listFut.wait(), function(card) {
//                         return card['card_number'].substr(-4);
//                       }), card.card_number.toString().substr(-4));
//
//     if (cardExist) {
//       throw new Meteor.Error('La tarjeta ingresada ya esta registrada.');
//     }
//
//     if (listFut.wait().length < 3) {
//       openpay.customers.cards.create(openpayId, card, (error, card) => {
//         if (error) {
//           future.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
//         } else {
//           future.return(card);
//         }
//       });
//     } else{
//       future.throw(new Meteor.Error('Límite de tarjetas','Haz alcanzado el límite de tarjetas registradas'));
//     }
//
//     return future.wait();
//   }
// });

// Guardar tarjeta mediante token
export const insertPaymentMethod = new ValidatedMethod({
  name: 'payments.insert',
  validate: new SimpleSchema({
    card_req: {type: Object},
    'card_req.token_id': {type: String},
    'card_req.device_session_id': {type: String}
  }).validator(),
  run({card_req}) {
    var future = new Future();
    var listFut = new Future();

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Inicia sesión o regístrate para ver esta sección');
    }

    const openpayId = Meteor.users.find({_id: this.userId}, {fields: { openpay_id: 1 }}).fetch()[0].openpay_id;

    openpay.customers.cards.list(openpayId, (error, cards) => {
      if (error) {
        listFut.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
      } else {
        listFut.return(cards);
      }
    });

    // const cardExist = _.includes(_.map(listFut.wait(), function(card) {
    //                     return card['card_number'].substr(-4);
    //                   }), card_req.card_number.toString().substr(-4));
    //
    // if (cardExist) {
    //   throw new Meteor.Error('La tarjeta ingresada ya esta registrada.');
    // }

    if (listFut.wait().length < 3) {
      openpay.customers.cards.create(openpayId, card_req, (error, card) => {
        if (error) {
          future.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
        } else {
          future.return(card);
        }
      });
    } else{
      future.throw(new Meteor.Error('Límite de tarjetas','Haz alcanzado el límite de tarjetas registradas'));
    }

    return future.wait();
  }
});


export const deleteCard = new ValidatedMethod({
  name: 'payments.delete',
  validate: new SimpleSchema({
    cardId: { type: String }
  }).validator(),
  run({cardId}) {
    var future = new Future();

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const openpayId = Meteor.users.find({_id: this.userId}, {fields: { openpay_id: 1 }}).fetch()[0].openpay_id;

    openpay.customers.cards.delete(openpayId, cardId, (error) => {
      if (error) {
        future.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
      }
      else {
        future.return('Eliminada');
      }
    });

    return future.wait();
  }
})

Meteor.methods({
  listCards() {
    var future = new Future();

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Inicia sesión o regístrate para ver esta sección');
    }

    const openpayId = Meteor.users.find({_id: this.userId}, {fields: { openpay_id: 1 }}).fetch()[0].openpay_id;

    openpay.customers.cards.list(openpayId, (error, response) => {
      if ( error ) {
        future.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
      } else {
        future.return( response );
      }
    });

    return future.wait();
  }
});
