import React, { Component } from 'react';
import Payment from 'payment';

export class CreditCard extends Component {
  constructor(props) {
    super(props);

    this.setCardType = this.setCardType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { refs } = this;
    const holder_name = refs.name.value;
    const card_number = parseInt(refs.number.value.replace(/ /g,''));
    const expiration = refs.expiration.value.split('/');
    const expiration_month = parseInt(expiration[0], 10);
    const expiration_year = parseInt(expiration[1], 10);
    const cvv2 = parseInt(refs.cvc.value);
    const card = { holder_name, card_number, expiration_month, expiration_year, cvv2 };

    this.props.newCard(card);

    this.refs.name.value = null;
    this.refs.number.value = null;
    this.refs.cvc.value = null;
    this.refs.expiration.value = null;
  }

  setCardType(event) {
    const type = Payment.fns.cardType(event.target.value);
    const cards = document.querySelectorAll('[data-brand]');

    [].forEach.call(cards, (element) => {
      if (element.getAttribute('data-brand') === type) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  renderCardList() {
    return (
      <ul className="credit-card-list clearfix">
        <li><i data-brand="amex" className="fa fa-cc-amex"></i></li>
        <li><i data-brand="mastercard" className="fa fa-cc-mastercard"></i></li>
        <li><i data-brand="visa" className="fa fa-cc-visa"></i></li>
      </ul>
    )
  }

  renderCardForm() {
    return (<form className="CardForm" onSubmit={ this.handleSubmit }>
      <input
        className="form-control text-center"
        type="text"
        ref="name"
        placeholder="Nombre del titular"
      />
      <input
        onKeyUp={ this.setCardType }
        className="form-control text-center"
        type="text"
        ref="number"
        placeholder="Número de tarjeta"
      />
      <input
        className="form-control text-center"
        type="text"
        ref="expiration"
        placeholder="MM/YYYY"
      />
      <input
        className="form-control text-center"
        type="text"
        ref="cvc"
        placeholder="CVC"
      />

      { this.renderCardList() }

      <button className="btn btn-block" type="submit">Guardar tarjeta</button>
    </form>);
  }

  componentDidMount() {
    const { number, expiration, cvc } = this.refs;
    Payment.formatCardNumber(number);
    Payment.formatCardExpiry(expiration);
    Payment.formatCardCVC(cvc);
  }

  render() {
    return (
      <div className="CreditCard">
        { this.renderCardForm() }
      </div>
    );
  }
}

CreditCard.propTypes = {};
