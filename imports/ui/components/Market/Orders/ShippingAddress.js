import React from 'react';

export const ShippingAddress = ({shippingAddress, addresses}) => {
  const address = _.find(addresses, { id: shippingAddress });

  return (
    <div>
      <h4>Dirección de entrega</h4>
      <p>
        {address.street} {address.noExt} {address.noInt ? '-' : ''} {address.noInt}<br/>
        {address.line1}<br/>
        {address.line2}<br/>
        {address.state} {address.postalCode}
      </p>
    </div>
  )
}
