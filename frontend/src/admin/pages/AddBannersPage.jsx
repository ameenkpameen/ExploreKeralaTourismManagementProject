import React from 'react'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'
import OwnerHeader from '../components/OwnerHeader'
import SideBar from '../components/SideBar'
import OwnerFooter from '../components/OwnerFooter'
import AddBannerForm from '../components/AddBannerForm'


function AddBannersPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
      <SideBar>
         <AddBannerForm />
      </SideBar>
      <OwnerFooter />
    </div>
  )
}

export default AddBannersPage
