import React from 'react'
import SuperAdminHeader from '../components/SuperAdminHeader'
import SideBar from '../components/SideBar'
import ListAdmins from '../components/ListAdmins'
import SuperAdminFooter from '../components/SuperAdminFooter'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function AdminsListPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
        <SuperAdminHeader />
             <ListAdmins />
        <SuperAdminFooter />
    </div>
  )
}

export default AdminsListPage
