import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import SideBar from '../components/Sidebar'
import Profile from '../components/Profile'
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'

function ProfilePage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
          <SideBar>
             <Profile />
          </SideBar>
       <Footer />
    </div>
  )
}

export default ProfilePage
