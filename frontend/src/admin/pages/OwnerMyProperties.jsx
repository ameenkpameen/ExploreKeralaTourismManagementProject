import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import MyProperties from '../components/MyProperties'
import image from '../../assets/images/boat-lake-scene.jpg'

function OwnerMyProperties() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
        <MyProperties />
      <OwnerFooter />
    </div>
  )
}

export default OwnerMyProperties
