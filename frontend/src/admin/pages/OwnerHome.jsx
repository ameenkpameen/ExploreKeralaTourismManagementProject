import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import image from '../../assets/images/boat-lake-scene.jpg'
import SideBar from '../components/SideBar'
import OwnerDashBoard from '../components/OwnerDashBoard'

function OwnerHome() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
        <OwnerDashBoard />
      <OwnerFooter />
    </div>
  )
}

export default OwnerHome
