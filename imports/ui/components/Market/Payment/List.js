import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Loader from 'react-loaders';

export class List extends Component {
  render() {
    return (
      <div>
        {!this.props.loading ?
          <ListGroup>
            {!this.props.cards.length ?
              <ListGroupItem>No hay método de pago registrado</ListGroupItem>
            :
              this.props.cards.map((card) => (

                <ListGroupItem key={card.id} header={card.card_number}>
                  {card.brand === 'american_express' ?
                    <i className="fa fa-cc-amex"></i>
                  :
                  card.brand === 'visa' ?
                    <i className="fa fa-cc-visa"></i>
                  :
                    <i className="fa fa-cc-mastercard"></i>
                  }
                  &nbsp;
                  {card.bank_name}
                  &nbsp;
                  <span>Expiración: {card.expiration_month}/{card.expiration_year}</span>
                  &nbsp;
                  <a href="#" onClick={this.props.deleteCard.bind(this, card.id)}>
                    <i className="fa fa-times"></i>
                  </a>
                </ListGroupItem>

                // <li key={card.id}>
                //   {card.brand === 'american_express' ?
                //     <i className="fa fa-cc-amex"></i>
                //   :
                //   card.brand === 'visa' ?
                //     <i className="fa fa-cc-visa"></i>
                //   :
                //     <i className="fa fa-cc-mastercard"></i>
                //   }
                //   &nbsp;
                //   {card.card_number} {card.bank_name}
                //   &nbsp;
                //   <a href="#" onClick={this.props.deleteCard.bind(this, card.id)}>
                //     <i className="fa fa-times"></i>
                //   </a>
                // </li>
              ))
            }
          </ListGroup>
        :
          <div style={{margin: '20px'}}>
            <Loader type="ball-scale-multiple" active={true} />
          </div>
        }
      </div>
    )
  }
}
