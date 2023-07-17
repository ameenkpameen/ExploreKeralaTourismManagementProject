import React from 'react'
import SuperAdminHeader from '../components/SuperAdminHeader'
import SideBar from '../components/SideBar'
import UsersList from '../components/UsersList'
import SuperAdminFooter from '../components/SuperAdminFooter'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function UsersListPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
        <SuperAdminHeader />
          <SideBar>
              <UsersList />
          </SideBar>
        <SuperAdminFooter />
    </div>
  )
}

export default UsersListPage
