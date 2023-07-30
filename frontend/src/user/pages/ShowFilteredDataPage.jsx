import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import Sidebar from '../components/Sidebar'
import ListFilteredData from '../components/ListFilteredData'
import image from '../../../src/assets/images/photographer-stands-with-camera-shore-with-great-evening-sky-him.jpg'


function ShowFilteredDataPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
             <ListFilteredData />
       <Footer />
    </div>
  )
}

export default ShowFilteredDataPage
