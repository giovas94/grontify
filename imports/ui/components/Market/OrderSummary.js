import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import moment from 'moment';

import 'moment/locale/es.js';
moment.locale('es');

import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Loader from 'react-loaders';

// var shippingTypeArr = [{value: 'express', label:'Express'}, {value: 'estandar', label:'Estándar'}, {value: 'programado', label:'Programado'}];

export const OrderSummary = ({currentOrder, shippingType, shippingTypeName, shippingDate, currentOrderSubtotal,
shippingCost, shippingAddress, paymentMethod, creatingOrder, fistOrderDiscount, shippingDiscount, handleShippingType, handleShippingAddress,
removeOrderProduct, handleShippingDate, handleCardList, shippingTypes, handlePaymentMethod, loadingCardsList,
cards, addresses, createOrder}) => {

  function renderShippingTypes() {
    let newArray = [];
    shippingTypes.forEach(function(type) { newArray.push({"value": type._id, "label": type.name }); });
    return newArray;
  }

  return (
    <div>
      <div id="cd-cart">
        <h2>Mi mandado</h2>
        {!currentOrder.length ?
          <p>No hay productos</p>
        :
          <ul className="cd-cart-items">
            {currentOrder.map(product => (
            <li key={product._id}>
              <span className="cd-qty">{_.isNaN(product.qty) ? '0' : product.qty} {product.qty < 1 || product.qty > 1 ? product.unit + 's' : product.unit} - </span> {product.name}
              <div className="cd-price">${product.qty * product.currentPrice}</div>
              <a href="#0" className="cd-item-remove cd-img-replace" onClick={() => removeOrderProduct(product)}>Remove</a>
            </li>
            ))}
            <li>
              <span>Tipo de envío <em style={{fontSize: 'small'}}>{shippingTypeName === 'Programado' ? 'Programa tu mandado'
              : shippingTypeName === 'Express' ? moment().get('h') < 19 ? 'Recibe en 1hr o menos' : 'Recibe mañana antes de las 10:00hrs'
              : shippingTypeName === 'Estándar' ? moment().get('h') < 16 ? 'Recibe hoy antes de las 20:00hrs' : 'Recibe mañana antes de las 14:00hrs' : '' }</em></span>
              <Select options={renderShippingTypes()} value={shippingType} clearable={false} placeholder="Selecciona el tipo de envío"
              onChange={value => handleShippingType(value.value)}  searchable={false} />

            </li>
            {shippingTypeName === 'Programado' ?
            <li>
              <span>Elige fecha de entrega</span>
              <DatePicker
                dateFormat="DD/MM/YYYY" selected={shippingDate}
                onChange={date => handleShippingDate(date)}
                className="form-control"
                minDate={moment().add(1, 'd')}
              />
              &nbsp;<em style={{fontSize: 'small'}}>Antes de las 17:00hrs</em>
            </li>
            :''}
            <li>
              <span>Método de pago</span>
              {!cards.length ?
                <div><Link to="/payment" state={{ fromOrder: true }}>Agregar método de pago</Link></div>
              :
                <Select isLoading={loadingCardsList} options={cards} value={paymentMethod} clearable={false}
                onChange={value => handlePaymentMethod(value.value)} searchable={false} placeholder="Selecciona método de pago" />
              }
            </li>
            <li>
              <span>Dirección de entrega</span>
              {!addresses ?
                <div><Link to="/address-new" state={{ fromOrder: true }}>Agregar dirección de entrega</Link></div>
              :
                <Select options={_.map(addresses, function(address) {
                  address.value = address['id'];
                  address.label = `${address['street']} #${address['noExt']} ${address['noInt']} ${address['line1']} ${address['line2']} ${address['state']}`;
                  return address;
                })} value={shippingAddress} clearable={false} searchable={false} onChange={value => handleShippingAddress(value.value)} placeholder="Selecciona dirección de entrega" />
              }
            </li>
          </ul>
        }

        <div className="cd-cart-total">
          <p>Importe <span>{accounting.formatMoney(currentOrderSubtotal)}</span></p>
          <p>Descuento <span>{accounting.formatMoney(fistOrderDiscount + shippingDiscount)}</span></p>
          <p>Envío <span>{accounting.formatMoney(shippingCost)}</span></p>
          <p><b>Total</b> <span><b>{accounting.formatMoney(currentOrderSubtotal + shippingCost - (fistOrderDiscount + shippingDiscount))}</b></span></p>
        </div>

        <button className="checkout-btn"
        disabled={!shippingType || !paymentMethod || !shippingAddress || creatingOrder} onClick={createOrder}>
          {!creatingOrder ? 'Ordenar Ahora' :
            <Loader type="ball-pulse" active={true} />
          }
        </button>
        {/* {!currentOrder.length ? '' :
          <p className="cd-go-to-cart"><a href="#0">Ver detalle</a></p>
        } */}
      </div>

    </div>
  )
}
