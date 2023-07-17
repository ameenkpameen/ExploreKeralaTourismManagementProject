import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Sidebar from '../components/Sidebar'
import Footer from '../components/footer'
import StripeContainer from '../components/StripeContainer'
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'

function PaymentPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
         <Sidebar>
            <StripeContainer />
         </Sidebar>
        <Footer />
    </div>
  )
}

export default PaymentPage
