import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export class SingleAddress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { address } = this.props;
    return (
      <div className="card">
        <div className="card-container">
          <h4><b>{address.street}</b> {address.noExt}</h4>
          <p>
            <b>Interior</b> {address.noInt}
            <br/><b>Col.</b> {address.line1}
            <br/><b>Delegación/Municipio</b> {address.line2}
            <br/><b>Estado</b> {address.state}
            <br/><Link to={`/address/${address.id}`}>Editar</Link>
          </p>
        </div>
      </div>
    )
  }
}
