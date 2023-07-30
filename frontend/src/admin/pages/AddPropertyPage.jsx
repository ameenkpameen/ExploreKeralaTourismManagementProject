import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import AddProperties from '../components/AddProperties'
import OwnerFooter from '../components/OwnerFooter'
import image from '../../assets/images/boat-lake-scene.jpg'

function AddPropertyPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
        <AddProperties />
      <OwnerFooter />
    </div>
  )
}

export default AddPropertyPage
