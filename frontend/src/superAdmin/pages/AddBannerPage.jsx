import React from 'react'
import SuperAdminHeader from '../components/SuperAdminHeader'
import SideBar from '../components/SideBar'
import SuperAdminFooter from '../components/SuperAdminFooter'
import DestinationForm from '../components/DestinationForm'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'
import BannerForm from '../components/BannerForm'


function AddBannerPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <SuperAdminHeader />
        <SideBar>
         <BannerForm />
        </SideBar>
       <SuperAdminFooter />
    </div>
  )
}

export default AddBannerPage
