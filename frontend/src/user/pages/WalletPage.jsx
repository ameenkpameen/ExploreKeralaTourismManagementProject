import React from 'react'
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'
import NavbarPart from '../components/NavbarPart'
import Sidebar from '../components/Sidebar'
import Footer from '../components/footer'
import Wallet from '../components/Wallet'

function WalletPage() {
  return (
    <div>
      <NavbarPart />
         <Sidebar>
            <Wallet />
         </Sidebar>
        <Footer />
    </div>
  )
}

export default WalletPage
