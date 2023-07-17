import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import SideBar from '../components/SideBar'
import OwnerFooter from '../components/OwnerFooter'
import ViewOrderDetails from '../components/ViewOrderDetails'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function DetailsOrderPage() {
  return (
    <div  className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
      <SideBar>
        <ViewOrderDetails />
      </SideBar>
      <OwnerFooter />
    </div>
  )
}

export default DetailsOrderPage
