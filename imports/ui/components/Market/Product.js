import React from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

export const Product = ({product, currentOrder, handleProduct, handleCurrentOrderSubtotal}) => (
  <Col xs={6} sm={3} md={2} className="product-card">
    <div className="product-image">
      <img src={product.imageURL} />
    </div>
    <div className="product-info">
      <h5>{product.name}</h5>
      <h6>{accounting.formatMoney(product.currentPrice)}<br/><small>por <b>{product.unit}</b></small></h6>
      <NumericInput min={0} max={20} step={product.unit === 'pieza' ? 1 : .5} precision={1} mobile readOnly
        value={_.find(currentOrder, ['name', product.name]) ? _.find(currentOrder, ['name', product.name]).qty : 0}
        onChange={valueAsNumber => {handleProduct(valueAsNumber, product); handleCurrentOrderSubtotal()}}
        className="numericInput"
      />
    </div>
  </Col>
)
