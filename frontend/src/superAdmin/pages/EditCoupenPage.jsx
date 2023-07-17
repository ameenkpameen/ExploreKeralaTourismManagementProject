import React from 'react'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'
import SuperAdminHeader from '../components/SuperAdminHeader'
import SideBar from '../components/SideBar'
import SuperAdminFooter from '../components/SuperAdminFooter'
import EditCoupen from '../components/EditCoupen'

function EditCoupenPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <SuperAdminHeader />
        <SideBar>
         <EditCoupen />
        </SideBar>
       <SuperAdminFooter />
    </div>
  )
}

export default EditCoupenPage
