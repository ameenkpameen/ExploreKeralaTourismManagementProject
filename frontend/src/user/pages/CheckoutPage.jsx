import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Sidebar from '../components/Sidebar'
import Footer from '../components/footer'
import Checkout from '../components/Checkout'

function CheckoutPage() {
  return (
    <div>
      <NavbarPart />
         <Sidebar>
            <Checkout />
         </Sidebar>
        <Footer />
    </div>
  )
}

export default CheckoutPage
