import React from 'react'
import SuperErrorComponent from '../components/SuperErrorComponent'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function SuperAdminErrorPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      
          <SuperErrorComponent />
      
    </div>
  )
}

export default SuperAdminErrorPage
