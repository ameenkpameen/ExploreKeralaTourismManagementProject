import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import Sidebar from '../components/Sidebar'
import ListFilteredData from '../components/ListFilteredData'
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'


function ShowFilteredDataPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
          <Sidebar>
             <ListFilteredData />
          </Sidebar>
       <Footer />
    </div>
  )
}

export default ShowFilteredDataPage
