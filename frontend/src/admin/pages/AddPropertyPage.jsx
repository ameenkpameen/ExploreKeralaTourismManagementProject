import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import SideBar from '../components/SideBar'
import AddProperties from '../components/AddProperties'
import OwnerFooter from '../components/OwnerFooter'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function AddPropertyPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
      <SideBar>
        <AddProperties />
      </SideBar>
      <OwnerFooter />
    </div>
  )
}

export default AddPropertyPage
