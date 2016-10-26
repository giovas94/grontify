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
      type: String,
      allowedValues: ['express', 'estandar', 'programado']
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

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (moment(shippingDate).diff(moment().startOf('day'), 'days') < 0) {
      throw new Meteor.Error('date-error', 'Error en la fecha de entrega');
    }

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

    const openpayId = Meteor.users.find({_id: this.userId}, {fields: { openpay_id: 1 }}).fetch()[0].openpay_id;

    let usedCard = {};
    openpay.customers.cards.get(openpayId, paymentMethod, (error, card) => {
      if (error) {
        cardFuture.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
      } else {
        cardFuture.return(card);
      }
    });

    usedCard = cardFuture.wait();

    let orderId = Orders.insert({
      customerId: this.userId,
      createdAt: new Date(),
      status: 'created',
      products,
      shippingType,
      shippingCost,
      shippingAddress,
      shippingDate,
      secureSubtotal,
      total: secureSubtotal + shippingCost,
      usedCard
    });

    var chargeRequest = {
       'source_id' : paymentMethod,
       'method' : 'card',
       'amount' : secureSubtotal + shippingCost,
       'currency' : 'MXN',
       'description' : `Mi mandado ${orderId}`,
       'order_id' : orderId,
       'device_session_id' : device_session_id,
       'capture': false
    }

    openpay.customers.charges.create(openpayId, chargeRequest, (error, response) => {
      if ( error ) {
        future.throw(new Meteor.Error(error.http_code, error.description, error.error_code));
      } else {
        future.return( response );
      }
    });

    return future.wait();
  }
});


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
      throw new Meteor.Error('not-authorized', 'not order owner');
    }

    if (order.status !== 'processed' || order.status !== 'created') {
      throw new Meteor.Error('not-authorized', 'No es posible cancelar la orden.');
    }

    Orders.update(orderId, { $set: { status: 'canceled' } });
  }
});
