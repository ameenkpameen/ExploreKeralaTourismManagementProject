import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerProfile from '../components/OwnerProfile'
import OwnerFooter from '../components/OwnerFooter'
import SideBar from '../components/SideBar'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function OwnerProfilePage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
       <OwnerHeader />
         <SideBar>
            <OwnerProfile />
         </SideBar>
         
       <OwnerFooter />
    </div>
  )
}

export default OwnerProfilePage
