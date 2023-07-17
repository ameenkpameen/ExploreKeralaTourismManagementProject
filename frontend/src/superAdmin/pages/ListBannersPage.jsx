import React from 'react'
import SuperAdminHeader from '../components/SuperAdminHeader'
import SideBar from '../components/SideBar'
import ListBanners from '../components/ListBanners'
import SuperAdminFooter from '../components/SuperAdminFooter'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function ListBannersPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <SuperAdminHeader />
       <SideBar>
         <ListBanners />
       </SideBar>
       <SuperAdminFooter />
    </div>
  )
}

export default ListBannersPage
