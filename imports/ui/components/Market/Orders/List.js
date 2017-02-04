import React, { Component } from 'react';
import {Table, Alert} from 'react-bootstrap';
import { Link } from 'react-router';

import { handleStatusLabel, handleStatusColor } from '../../../../modules/orderStatusLabels';

export class List extends Component {
  _handleCancel(orderId) {
    swal({
      title: "¿Estás seguro?",
      text: "Vas a cancelar tu mandado!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sí, quiero cancelar!",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: false,
    },
    function(isConfirm){
      if (isConfirm) {
        Meteor.call('orders.cancel', {orderId}, (err) => {
          if (err) {
            swal('Error', err.reason, 'error');
          } else {
            swal("Mandado cancelado!", "Tu mandado ha sido cancelado.", "success");
          }
        });
      } else {
        swal("Seguimos!", "Tu mandado llegará pronto", "error");
      }
    });
  }

  render() {
    return (
      <div>
          {!this.props.myOrders.length ?
            <Alert bsStyle="warning"><strong>No hay ordenes aún, </strong><Link to="/market">haz tu mandado ahora</Link></Alert>
          :

            <Table responsive hover>
              <thead>
                <tr>
                  <th className="hidden-xs">ID</th>
                  <th>Fecha y hora</th>
                  <th>Importe</th>
                  <th>Descuento</th>
                  <th>Envío</th>
                  <th>Total</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.props.myOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td className="hidden-xs">{order._id}</td>
                    <td>{moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td>{accounting.formatMoney(order.secureSubtotal || order.subtotal)}</td>
                    <td>{accounting.formatMoney(order.orderDiscount + order.shippingDiscount)}</td>
                    <td>{`${order.shippingType}(${accounting.formatMoney(order.shippingCost)})`}</td>
                    <td>{accounting.formatMoney(order.total)}</td>
                    <td style={handleStatusColor(order.status)}>{handleStatusLabel(order.status)}</td>
                    <td><Link to={`/order/${order._id}`}>Detalle</Link> | {order.status === 'sent' || order.status === 'delivered' || order.status === 'canceled' ? '' : <a href="#" onClick={this._handleCancel.bind(this, order._id)}>Cancelar</a> }</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          }
      </div>
    )
  }
}
