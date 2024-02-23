import React from 'react'

const CustomerMarker = () => {
  return (
    <div style={{ width: '40px', height: '40px' }}>
    <img
      src={require('../Images/delivery-bike.png').default}
      alt="Custom Marker"
      style={{ width: '100%', height: '100%' }}
    />
  </div>
  )
}

export default CustomerMarker 