import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import {Col, Row, Table, Alert} from 'react-bootstrap';

import {ShippingAddress} from './ShippingAddress';

export class OrderDetail extends Component {
  render() {
    const {loading, order, currentUser} = this.props;
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>

        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Link to="/orders" style={{ marginBottom: '10px', marginTop: '20px', marginRight: '10px'}}>
            <i className="fa fa-chevron-left"></i>
          </Link>
          <h3>Detalle de mi mandado</h3>
        </div>

        {loading ?
          <h4>Cargando...</h4>
        :
          <div className="order-panel">
            <div>
              <b>ID</b> {order._id}<br/>
              <b>Fecha</b> {moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')}<br/>
              <b style={{fontSize: '2rem'}}>Estatus {order.status.toUpperCase()}</b><br/>
              <b>Fecha de entrega {moment(order.shippingDate).format('DD/MM/YYYY')}</b>
            </div>

            <div className="prices">
                <b>Importe</b> <span>{accounting.formatMoney(order.secureSubtotal || order.subtotal)}</span> <br/>
                <b>Descuento</b> <span>{accounting.formatMoney(order.orderDiscount + order.shippingDiscount || order.orderDiscount)}</span> <br/>
                <b>Envío</b> <span>{order.shippingType} | {accounting.formatMoney(order.shippingCost)}</span> <br/>
                <b>Total <span>{accounting.formatMoney(order.total)}</span></b>
            </div>

            <div>
              <h4>Productos</h4>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                {order.products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.qty} {product.unit === 'pieza' ? 'pza' : 'kg' }</td>
                    <td>{accounting.formatMoney(product.currentPrice)}</td>
                    <td>{accounting.formatMoney(product.qty * product.currentPrice)}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </div>
            <Row>
              <Col sm={6}>
                <ShippingAddress shippingAddress={order.shippingAddress} addresses={currentUser.profile.addresses} />
              </Col>
              <Col sm={6}>
                <h4>Método de pago</h4>
                <p>
                  {order.usedCard.bank_name} {order.usedCard.card_number}
                </p>
              </Col>
            </Row>
          </div>
        }
      </div>
    )
  }
}

OrderDetail.propTypes = {
  loading: React.PropTypes.bool,
  order: React.PropTypes.object,
  currentUser: React.PropTypes.object,
};
