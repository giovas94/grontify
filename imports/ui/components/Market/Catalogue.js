import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button, PanelGroup, Panel} from 'react-bootstrap';
import moment from 'moment';

import NumericInput from 'react-numeric-input';
import {Loader} from 'react-loaders';

import 'moment/locale/es.js';
moment.locale('es');

import catalogue from '../../../startup/client/fake_data.js';

import { OrderSummary } from './OrderSummary';
import { Product } from './Product';

export class Catalogue extends Component {
  constructor(props) {
    super(props);

    this.state= {
      catalogue,
      currentOrder: this.props.currentOrder ? this.props.currentOrder : JSON.parse(localStorage.getItem('currentOrder-null')),
      shippingType: null, //ID
      shippingCost: null, //Price
      shippingTypeName: null, //Name
      // shippingType: 'express',
      // shippingCost: 90,
      shippingDate: moment(),
      shippingAddress: null,
      paymentMethod: null,
      currentOrderSubtotal: 0,
      loadingCardsList: false,
      cards: [],
      creatingOrder: false,
    }

    this.loadInterval = false;
  }

  componentDidMount() {
    this._handleCurrentOrderSubtotal();

    if (!this.state.currentOrder.length) {
      this._handleShippingType('');
    }

    this.setState({loadingCardsList: !this.state.loadingCardsList});

    this.loadInterval = setInterval(
      Meteor.call('listCards', (error, response) => {
        if ( error ) {
          console.log(error);
        } else {
          myCards = _.map(response, function(card) {
            card.value = card['id'];
            card.label = card['card_number'] + ' - ' + card['bank_name'];
            return card;
          });
          this.loadInterval && this.setState({cards: _.concat(myCards, {value: 'efectivo', label: 'Pago en efectivo a la entrega.'})});
        }
        this.loadInterval &&  this.setState({loadingCardsList: !this.state.loadingCardsList});
      })
    , 500);

    var $L = 1200,
    		$cart_trigger = $('#cd-cart-trigger'),
    		$lateral_cart = $('#cd-cart'),
    		$shadow_layer = $('#cd-shadow-layer');

    	//open cart
    	$cart_trigger.on('click', function(event){
    		event.preventDefault();

        //close lateral menu (if it's open)
    		this.toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
    	}.bind(this));

      //close lateral cart
    	$shadow_layer.on('click', function(){
    		$shadow_layer.removeClass('is-visible');
    		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
    		if( $lateral_cart.hasClass('speed-in') ) {
    			$lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
    				$('body').removeClass('overflow-hidden');
    			});
    		} else {
    			$lateral_cart.removeClass('speed-in');
    		}
    	}.bind(this));
  }

  toggle_panel_visibility($lateral_panel, $background_layer, $body) {
    if( $lateral_panel.hasClass('speed-in') ) {
  		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
  		$lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
  			$body.removeClass('overflow-hidden');
  		});
  		$background_layer.removeClass('is-visible');

  	} else {
  		$lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
  			$body.addClass('overflow-hidden');
  		});
  		$background_layer.addClass('is-visible');
  	}
  }

  componentWillUnmount () {
    this.props.searchQuery.set('');
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  _handleProduct(value, product) {
    let myOrder = this.props.currentOrder;
    const {_id, name, currentPrice, unit} = product;
    let orderProduct = {};

    orderProduct._id = _id;
    orderProduct.name = name;
    orderProduct.currentPrice = currentPrice;
    orderProduct.unit = unit;
    orderProduct.qty = value;

    let productExist = _.some(myOrder, (element) => {
      return element.name === orderProduct.name;
    });

    if(!productExist) {
      if (!orderProduct.qty) {
        return;
      }
      myOrder.push(orderProduct)
      localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify(myOrder))
      this.setState({currentOrder: myOrder})
    } else {
      let productIndex = _.findIndex(myOrder, (element) => {
        return element.name === name;
      });

      myOrder[productIndex].qty = orderProduct.qty;

      let newOrder = _.pullAllBy(myOrder, [{ 'qty': 0 }], 'qty');

      localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify(newOrder));
      this.setState({currentOrder: newOrder});
    }

    if (!myOrder.length) {
      this._handleShippingType('');
    }
  }

  _removeOrderProduct(product) {
    let myOrder = this.state.currentOrder;
    let productIndex = _.findIndex(myOrder, (element) => {
      return element.name === product.name;
    });

    _.pullAt(myOrder, productIndex);

    localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify(myOrder));
    if (Meteor.userId()) {
        localStorage.setItem(`currentOrder-null`, JSON.stringify(myOrder));
    }
    this.setState({currentOrder: myOrder});

    if (!myOrder.length) {
      this._handleShippingType('');
    }
  }

  _handleShippingType(selectedShippingType) {
    this.setState({shippingType: selectedShippingType});

    let type = _.find(this.props.shippingTypes, (type) => {
      return type._id === selectedShippingType
    });
    this.setState({shippingCost: type ? type.currentCost : 0, shippingTypeName: type ? type.name : ''});
    switch (type ? type.name : '') {
      case 'Estándar':
        this.setState({shippingDate: moment()});
        break;
      case 'Programado':
        this.setState({shippingDate: moment().add(1, 'd')});
        break;
      case 'Express':
        this.setState({shippingDate: moment()});
        break;
      default:
        this.setState({shippingDate: moment()});
    }
  }

  _handleCurrentOrderSubtotal() {
    let currentOrderSubtotal = 0;
    if (this.state.currentOrder.length) {
      currentOrderSubtotal = _.reduce(this.state.currentOrder, function(sum, n){
          return { currentPrice: sum.currentPrice + n.currentPrice * n.qty }
        }, { currentPrice: 0 }).currentPrice;
    }

    this.setState({currentOrderSubtotal});
  }

  _handleShippingDate(shippingDate) {
    this.setState({ shippingDate });
  }

  _handlePaymentMethod(paymentMethod) {
    this.setState({ paymentMethod });
  }

  _handleShippingAddress(shippingAddress) {
    this.setState({ shippingAddress });
  }

  _createOrder() {
    const {currentOrder, shippingType, shippingAddress, shippingCost, shippingDate, currentOrderSubtotal, paymentMethod} = this.state;
    this.setState({creatingOrder: !this.state.creatingOrder});

    Meteor.call('orders.insert', {products: currentOrder, shippingType, shippingAddress,
    shippingCost, shippingDate: shippingDate.toDate(), subtotal: currentOrderSubtotal, paymentMethod,
    device_session_id: this.props.device_session_id}, (err, result) => {
      if (!err) {
        console.log(result);

        if (result && result.error) {
          Alert.error(`<h4>${result.error.description} ${result.error.error_code}</h4>`, {
            position: 'top-right',
            effect: 'slide',
            onShow: function () {
                console.log('Error al crear orden!')
            },
            timeout: 2000,
            offset: 100,
            html: true,
          });
          this.setState({creatingOrder: false});
          Meteor.call('orders.remove', {orderId: result.orderId});
        } else {
          localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify([]))
          localStorage.setItem(`currentOrder-null`, JSON.stringify([]))
          this.setState({currentOrder: []});
          Alert.success('<h4>Excelente, orden generada!</h4>', {
            position: 'top-right',
            effect: 'slide',
            onShow: function () {
                console.log('Orden creada con éxito!')
            },
            timeout: 3500,
            offset: 100,
            html: true,
          });
          console.log(result);
          browserHistory.push(`/order/${result.orderId || result.order_id}`);
        }
      } else {
        Alert.error(`<h4>${err.reason}</h4>`, {
          position: 'top-right',
          effect: 'slide',
          onShow: function () {
              console.log('Error al crear orden!')
          },
          timeout: 2000,
          offset: 100,
          html: true,
        });
        this.setState({creatingOrder: false});
      }
    });

    this.setState({creatingOrder: !this.state.creatingOrder});
  }

  render() {
    return (
      <div>
        <div id="cd-cart-trigger">
          <a href="#">
            <i className="fa fa-2x fa-shopping-basket"></i>
            <span style={{display: 'table-cell', verticalAlign: 'middle'}}>({this.state.currentOrder.length})</span><br/>
            <span>{accounting.formatMoney(this.state.currentOrderSubtotal)}</span>
          </a>
        </div>
        <OrderSummary {...this.state}
          fistOrderDiscount={this.state.currentOrderSubtotal >= 200 && this.props.ordersCount === 0 ? 150 : 0}
          shippingDiscount={this.state.currentOrderSubtotal >= 550 && this.state.shippingTypeName !== 'Express' ? this.state.shippingTypeName === 'Estándar' ? 60 : 36 : 0 }
          handleShippingType={this._handleShippingType.bind(this)}
          handleShippingAddress={this._handleShippingAddress.bind(this)}
          removeOrderProduct={this._removeOrderProduct.bind(this)}
          handleShippingDate={this._handleShippingDate.bind(this)}
          shippingTypes={this.props.shippingTypes}
          handlePaymentMethod={this._handlePaymentMethod.bind(this)}
          addresses={!this.props.currentUser ? [] : this.props.currentUser.profile.addresses}
          createOrder={this._createOrder.bind(this)}/>
        <h2>Catálogo</h2>
        <Row>
          <Col sm={12} md={6}>
            <PanelGroup accordion>
              <Panel header={<strong style={{cursor: 'pointer'}}>Información</strong>} bsStyle="info" style={{fontSize: '1.2rem'}} eventKey="1">
                El precio de los productos es aproximado, el total real de tu mandado te será notificado a la entrega y mediante email o whatsapp.<br/>
                El precio puede variar entre 3% y 7% hacia abajo o hacia arriba dependiendo los precios del día en la central de abastos.
              </Panel>
            </PanelGroup>
            {/* <Panel header={"Información"} bsStyle="info" style={{fontSize: '1rem'}}>
              El precio de los productos es aproximado, el total real de tu mandado te será notificado a la entrega y mediante email o whatsapp.<br/>
              El precio puede variar entre 3% y 7% hacia abajo o hacia arriba dependiendo los precios del día en la central de abastos.
            </Panel> */}
          </Col>
          <Col sm={12} md={6}>
            <FormGroup>
              <FormControl bsSize="large" placeholder="Buscar producto" type="text" ref="search"
                onChange={(e) => { this.props.searchQuery.set(e.target.value) }}/>
            </FormGroup>
          </Col>

          <Col xs={12} className="products">
          {this.props.loading ?
            <div style={{marginTop: '20px'}}>
              <Loader type="ball-scale-multiple" active={true} />
            </div>
          :

            !this.props.catalogue.length ?
              <div>No hay, no hay, no hay! <Link to="/help">Necesito un producto que no está en el catálogo</Link></div>
            :
              this.props.catalogue.map(product => {
                if (product.productStatus === 'activo') {
                    return <Product key={product._id} product={product} currentOrder={this.state.currentOrder}
                    handleProduct={this._handleProduct.bind(this)}
                    handleCurrentOrderSubtotal={this._handleCurrentOrderSubtotal.bind(this)}/>
                }
              })
          }
          </Col>
        </Row>
        <br/>
        <div id="cd-shadow-layer"></div>

      </div>
    )
  }
}

Catalogue.propTypes = {
  loading: PropTypes.bool,
  catalogue: PropTypes.array,
  shippingTypes: PropTypes.array,
  ordersCount: PropTypes.number,
  currentUser: PropTypes.object,
  device_session_id: PropTypes.string,
};
