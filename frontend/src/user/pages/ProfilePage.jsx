import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import SideBar from '../components/Sidebar'
import Profile from '../components/Profile'
import image from '../../../src/assets/images/photographer-stands-with-camera-shore-with-great-evening-sky-him.jpg'

function ProfilePage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
             <Profile />
       <Footer />
    </div>
  )
}

export default ProfilePage
