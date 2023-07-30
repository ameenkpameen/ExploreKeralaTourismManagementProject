import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import EditProperties from '../components/EditProperties'
import image from '../../assets/images/boat-lake-scene.jpg'

function EditPropertyPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
        <EditProperties />
      <OwnerFooter />
    </div>
  )
}

export default EditPropertyPage
