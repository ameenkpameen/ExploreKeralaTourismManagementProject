import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Sidebar from '../components/Sidebar'
import Footer from '../components/footer'
import OrderDetail from '../components/OrderDetail'
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'

function OrderDetailPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
         <Sidebar>
            <OrderDetail />
         </Sidebar>
        <Footer />
    </div>
  )
}

export default OrderDetailPage
