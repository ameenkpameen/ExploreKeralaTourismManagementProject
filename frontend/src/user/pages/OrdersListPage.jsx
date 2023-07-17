import React from 'react'
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'
import NavbarPart from '../components/NavbarPart'
import Sidebar from '../components/Sidebar'
import Footer from '../components/footer'
import ListOrders from '../components/ListOrders'

function OrdersListPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
         <Sidebar>
            <ListOrders />
         </Sidebar>
        <Footer />
    </div>
  )
}

export default OrdersListPage
