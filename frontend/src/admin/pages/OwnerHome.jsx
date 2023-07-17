import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'
import SideBar from '../components/SideBar'

function OwnerHome() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
        <SideBar />
      <OwnerFooter />
    </div>
  )
}

export default OwnerHome
