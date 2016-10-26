import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import moment from 'moment';

import NumericInput from 'react-numeric-input';
import Loader from 'react-loaders';

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
      currentOrder: this.props.currentOrder,
      shippingType: 'express',
      shippingCost: 90,
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
          })
          this.loadInterval && this.setState({cards: myCards});
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
    this.setState({currentOrder: myOrder});

    if (!myOrder.length) {
      this._handleShippingType('');
    }
  }

  _handleShippingType(shippingType) {
    this.setState({shippingType});

    switch (shippingType) {
      case 'estandar':
        this.setState({shippingCost: 60, shippingDate: moment()});
        break;
      case 'programado':
        this.setState({shippingCost: 35, shippingDate: moment().add(1, 'd')});
        break;
      case 'express':
        this.setState({shippingCost: 90, shippingDate: moment()});
        break;
      default:
        this.setState({shippingCost: 0, shippingDate: moment()});
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
        localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify([]))
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
        browserHistory.push('/orders');
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
          handleShippingType={this._handleShippingType.bind(this)}
          handleShippingAddress={this._handleShippingAddress.bind(this)}
          removeOrderProduct={this._removeOrderProduct.bind(this)}
          handleShippingDate={this._handleShippingDate.bind(this)}
          handlePaymentMethod={this._handlePaymentMethod.bind(this)}
          addresses={!this.props.currentUser ? [] : this.props.currentUser.profile.addresses}
          createOrder={this._createOrder.bind(this)}/>
        <h2>Catálogo</h2>
        <Row>
          <Col sm={12}>
            <FormGroup>
              <FormControl placeholder="Buscar" type="text" ref="search"
                onChange={(e) => { this.props.searchQuery.set(e.target.value) }}/>
            </FormGroup>
          </Col>
        </Row>


        <section className="products">
        {this.props.loading ?
          <div style={{marginTop: '20px'}}>
            <Loader type="ball-scale-multiple" active={true} />
          </div>
        :

          !this.props.catalogue.length ?
            'No hay, no hay, no hay!'
          :
            this.props.catalogue.map(product => {
              if (product.productStatus !== 'cancelado') {
                  return <Product key={product._id} product={product} currentOrder={this.state.currentOrder}
                  handleProduct={this._handleProduct.bind(this)}
                  handleCurrentOrderSubtotal={this._handleCurrentOrderSubtotal.bind(this)}/>
              }
            })
        }
        </section>

        <div id="cd-shadow-layer"></div>

      </div>
    )
  }
}

Catalogue.propTypes = {
  loading: PropTypes.bool,
  catalogue: PropTypes.array,
  currentUser: PropTypes.object,
  device_session_id: PropTypes.string,
};
