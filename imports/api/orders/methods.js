import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import moment from 'moment';

import openpay from '../../startup/server/openpay-config';
import Future from 'fibers/future';

import { Orders } from './orders';
import { Products } from '../products/products';
import { ShippingTypes } from '../shippingTypes/shippingTypes';

export const createOrder = new ValidatedMethod({
  name: 'orders.insert',
  validate: new SimpleSchema({
    products: {
      type: Array
    },
    "products.$": {
      type: Object
    },
    "products.$._id": {
      type: String
    },
    "products.$.name": {
      type: String
    },
    "products.$.currentPrice": {
      type: Number,
      decimal: true
    },
    "products.$.qty": {
      type: Number,
      decimal: true
    },
    "products.$.unit": {
      type: String
    },
    shippingType: {
      type: String
    },
    shippingAddress: {
      type: String
    },
    shippingCost: {
      type: Number,
      decimal: true
    },
    shippingDate: {
      type: Date
    },
    subtotal: {
      type: Number,
      decimal: true
    },
    // total: {
    //   type: Number,
    //   decimal: true
    // },
    paymentMethod: {
      type: String
    },
    device_session_id: {
      type: String
    }
    // status: {
    //   type: String,
    //   allowedValues: ['created', 'processed', 'canceled', 'sent', 'delivered', 'paid', 'refunded']
    // }
  }).validator(),
  run({products, shippingType, shippingAddress, shippingCost, shippingDate, subtotal, total, paymentMethod, device_session_id}) {
    var future = new Future();
    var cardFuture = new Future();
    let orderDiscount = 0, shippingDiscount = 0;

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (moment(shippingDate).diff(moment().startOf('day'), 'days') < 0) {
      throw new Meteor.Error('date-error', 'Error en la fecha de entrega');
    }

    let userOrders = Orders.find({ customerId: this.userId }).count();

    let secureProducts = _.map(products, function(product) {
      const currentProduct = Products.findOne(product._id, { fields: { name: 1, currentPrice: 1, unit: 1 } });

      product.name = currentProduct.name;
      product.currentPrice = currentProduct.currentPrice;
      product.unit = currentProduct.unit;

      return product;
    });

    let secureSubtotal = _.reduce(secureProducts, function(sum, n){
      return { currentPrice: sum.currentPrice + n.currentPrice * n.qty }
    }, { currentPrice: 0 }).currentPrice;

    if (userOrders === 0 && secureSubtotal >= 200) {
      orderDiscount = 150;
    }

    let secureShippingType = ShippingTypes.findOne(shippingType, { name: 1, currentCost: 1 });

    if (!secureShippingType) {
      throw new Meteor.Error('El tipo de envío no existe!');
    }

    if (secureSubtotal >= 550 && secureShippingType.name !== 'Express') {
      // if (secureShippingType.name === 'Estándar') {
      //   shippingDiscount = 60
      // } else {
      //   shippingDiscount = 36
      // }
      shippingDiscount = secureShippingType.currentCost;
    }

    const openpayId = Meteor.users.find({_id: this.userId}, {fields: { openpay_id: 1 }}).fetch()[0].openpay_id;

    let usedCard = {};

    if (paymentMethod !== 'efectivo') {
      openpay.customers.cards.get(openpayId, paymentMethod, (error, card) => {
        if (error) {
          cardFuture.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
        } else {
          cardFuture.return(card);
        }
      });

      usedCard = cardFuture.wait();
    } else {
      usedCard = { paymentMethod, 'payment-description': 'Pago en efectivo a la entrega.' };
    }


    // La configuración horaria del servidor es GMT+0000 (UTC), la de México es en GMT-0600 (CST)
    // Entonces las 19 horas en México son las 01 del día siguiente en el servidor
    // Las 16 horas en México son las 22 en el servidor
    let customShippingDate = shippingDate

    console.log(moment().format("ZZ"));
    if (moment().format("ZZ") === "-0600") {
      customShippingDate = secureShippingType.name === 'Express' ? moment().get('hours') < 19 ? moment(shippingDate).add(1, 'hours').toDate() : moment(shippingDate).add(1, 'days').hours(10).minutes(0).toDate() : secureShippingType.name === 'Estándar' ? moment().get('hours') < 16 ? moment(shippingDate).hours(20).minutes(0).toDate() : moment(shippingDate).add(1, 'days').hours(14).minutes(0).toDate() : moment(shippingDate).hours(16).minutes(0).toDate();
    } else if (moment().format("ZZ") === "+0000") {
      customShippingDate = secureShippingType.name === 'Express' ? moment().utcOffset("-06:00").get('hours') < 19 ? moment(shippingDate).utcOffset("-06:00").add(1, 'hours').toDate() : moment(shippingDate).utcOffset("-06:00").add(1, 'days').hours(10).minutes(0).toDate() : secureShippingType.name === 'Estándar' ? moment().utcOffset("-06:00").get('hours') < 16 ? moment(shippingDate).utcOffset("-06:00").hours(20).minutes(0).toDate() : moment(shippingDate).utcOffset("-06:00").add(1, 'days').hours(14).minutes(0).toDate() : moment(shippingDate).utcOffset("-06:00").hours(16).minutes(0).toDate();
    }

    let secureTotal = secureSubtotal + secureShippingType.currentCost - (orderDiscount + shippingDiscount);

    let orderId = Orders.insert({
      customerId: this.userId,
      createdAt: new Date(),
      status: 'created',
      products,
      shippingType: secureShippingType.name,
      orderDiscount,
      shippingDiscount,
      shippingCost: secureShippingType.currentCost,
      shippingAddress,
      shippingDate: customShippingDate,
      secureSubtotal,
      total: secureTotal.toFixed(2),
      usedCard
    });

    var chargeRequest = {
       'source_id' : paymentMethod,
       'method' : 'card',
       'amount' : secureTotal.toFixed(2),
       'currency' : 'MXN',
       'description' : `Mi mandado ${orderId}`,
       'order_id' : orderId,
       'device_session_id' : device_session_id,
       'capture': false
    }

    if (paymentMethod !== 'efectivo') {
      openpay.customers.charges.create(openpayId, chargeRequest, (error, response) => {
        if ( error ) {
          future.return( { error, orderId: orderId } /** new Meteor.Error(error.http_code, error.description, error.error_code) **/ );
        } else {
          future.return( response );
        }
      });

      return future.wait();
    } else {
      return { orderId };
    }
  }
});

export const removeOrder = new ValidatedMethod({
  name: 'orders.remove',
  validate: new SimpleSchema({
    orderId: { type: String }
  }).validator(),
  run({orderId}) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Orders.remove(orderId);
  }
})


export const cancelOrder = new ValidatedMethod({
  name: 'orders.cancel',
  validate: new SimpleSchema({
    orderId: { type: String }
  }).validator(),
  run({orderId}) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const order = Orders.findOne(orderId);

    if (this.userId !== order.customerId) {
      throw new Meteor.Error('not-authorized', 'Not order owner');
    }

    if (order.status === 'sent' || order.status === 'delivered') {
      throw new Meteor.Error('not-authorized', 'No es posible cancelar la orden.');
    }

    Orders.update(orderId, { $set: { status: 'canceled' } });
  }
});
