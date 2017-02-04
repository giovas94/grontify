export const handleStatusLabel = (status) => {
  if (status === 'processed') {
    return 'Procesado'
  } else if (status === 'canceled') {
    return 'Cancelado'
  } else if (status === 'sent') {
    return 'Enviado'
  } else if (status === 'created') {
    return 'Creado'
  } {
    return 'Entregado'
  }
}

export const handleStatusColor = (status) => {
  if (status === 'processed') {
    return {}
  } else if (status === 'canceled') {
    return {color: '#e53935'}
  } else if (status === 'sent') {
    return {color: '#ffb300'}
  } else if (status === 'created') {
    return {color: '#1e88e5'}
  } {
    return {color: '#7cb342'}
  }
}
