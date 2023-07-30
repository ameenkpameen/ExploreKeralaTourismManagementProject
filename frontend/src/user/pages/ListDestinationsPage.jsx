import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import ListDestinations from '../components/ListDestinations'
import image from '../../../src/assets/images/photographer-stands-with-camera-shore-with-great-evening-sky-him.jpg'


function ListDestinationsPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
            <ListDestinations />
        <Footer />
    </div>
  )
}

export default ListDestinationsPage
