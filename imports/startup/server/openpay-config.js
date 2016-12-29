import Openpay from 'openpay';

const openpay = new Openpay(Meteor.settings.private.openpay.MERCHANT_ID, Meteor.settings.private.openpay.PRIVATE_KEY);

openpay.setProductionReady(Meteor.settings.private.openpay.PRODUCTION_READY);

export default openpay;
