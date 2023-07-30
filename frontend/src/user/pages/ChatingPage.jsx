import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import image from '../../../src/assets/images/photographer-stands-with-camera-shore-with-great-evening-sky-him.jpg'
import ChatComponent from '../components/ChatComponent'

function ChatingPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
        <NavbarPart />
            <ChatComponent />
        <Footer />
    </div>
  )
}

export default ChatingPage
