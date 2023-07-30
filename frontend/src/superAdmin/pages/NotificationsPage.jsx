import React from 'react'
import SuperAdminHeader from '../components/SuperAdminHeader'
import SideBar from '../components/SideBar'
import Notifications from '../components/Notifications'
import SuperAdminFooter from '../components/SuperAdminFooter'
import ProperNotifications from '../components/ProperNotifications'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'

function NotificationsPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <SuperAdminHeader />
          <ProperNotifications />
      <SuperAdminFooter />
    </div>
  )
}

export default NotificationsPage
