import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import SideBar from '../components/SideBar'
import EditProperties from '../components/EditProperties'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function EditPropertyPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
      <SideBar>
        <EditProperties />
      </SideBar>
      <OwnerFooter />
    </div>
  )
}

export default EditPropertyPage