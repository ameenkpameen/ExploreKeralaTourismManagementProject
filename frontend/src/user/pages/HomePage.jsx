import React, { useEffect, useState } from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import { useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashBoard from '../components/DashBoard';
import image from '../../../src/assets/images/photographer-stands-with-camera-shore-with-great-evening-sky-him.jpg'
import { getBanners, getDestination } from '../../api/UserAPI';

function HomePage() {
  // const dispatch = useDispatch()
  
  


  return (
    <div className='user-dash bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
        <NavbarPart />
          
             <DashBoard />
          
        <Footer />
    </div>
  )
}

export default HomePage
