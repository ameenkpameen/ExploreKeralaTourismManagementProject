import React from 'react'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'
import SuperAdminHeader from '../components/SuperAdminHeader'
import SideBar from '../components/SideBar'
import SuperAdminFooter from '../components/SuperAdminFooter'
import ListCoupens from '../components/ListCoupens'

function ListCoupensPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <SuperAdminHeader />
         <ListCoupens />
       <SuperAdminFooter />
    </div>
  )
}

export default ListCoupensPage
