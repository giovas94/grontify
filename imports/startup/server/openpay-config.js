import Openpay from 'openpay';

const openpay = new Openpay(Meteor.settings.private.openpay.MERCHANT_ID, Meteor.settings.private.openpay.PRIVATE_KEY);

openpay.setProductionReady(false);

export default openpay;
