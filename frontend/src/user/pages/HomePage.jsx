import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'
import axios from 'axios';
import baseURL from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';

function HomePage() {
  const dispatch = useDispatch()
  
  const [destinations,setDestinations] = useState([])
    // const navigate = useNavigate();
    // useEffect(()=> {
    //     const userInfo = localStorage.getItem("userInfo")
    
    //     if(userInfo){
    //         console.log("hhhhhhhhhh");
    //         navigate('/')
    //     }
    // },[navigate])


  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
        <NavbarPart />
         <Sidebar />
           
        <Footer />
    </div>
  )
}

export default HomePage
