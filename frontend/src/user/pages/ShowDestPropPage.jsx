import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Sidebar from '../components/Sidebar'
import Footer from '../components/footer'
import DestinationProperties from '../components/DestinationProperties'
import image from '../../../src/assets/images/photographer-stands-with-camera-shore-with-great-evening-sky-him.jpg'

function ShowDestPropPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
             <DestinationProperties />
       <Footer />
    </div>
  )
}

export default ShowDestPropPage
