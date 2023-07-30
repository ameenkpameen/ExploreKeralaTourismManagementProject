import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import ViewOrderDetails from '../components/ViewOrderDetails'
import image from '../../assets/images/boat-lake-scene.jpg'

function DetailsOrderPage() {
  return (
    <div  className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
        <ViewOrderDetails />
      <OwnerFooter />
    </div>
  )
}

export default DetailsOrderPage
