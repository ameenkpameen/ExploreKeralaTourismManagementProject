import React from 'react'
import image from '../../assets/images/pexels-lukas-rodriguez-3559235.jpg'
import OwnerHeader from '../components/OwnerHeader'
import SideBar from '../components/SideBar'
import OwnerFooter from '../components/OwnerFooter'
import ChatWithUser from '../components/ChatWithUser'

function ChatPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
      <SideBar>
        <ChatWithUser />
      </SideBar>
      <OwnerFooter />
    </div>
  )
}

export default ChatPage
