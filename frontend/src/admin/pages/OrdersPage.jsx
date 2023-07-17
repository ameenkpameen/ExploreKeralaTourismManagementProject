import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import SideBar from '../components/SideBar'
import OrdersList from '../components/OrdersList'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function OrdersPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
      <SideBar>
        <OrdersList />
      </SideBar>
      <OwnerFooter />
    </div>
  )
}

export default OrdersPage
