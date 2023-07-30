import React from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerProfile from '../components/OwnerProfile'
import OwnerFooter from '../components/OwnerFooter'
import image from '../../assets/images/boat-lake-scene.jpg'

function OwnerProfilePage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
       <OwnerHeader />
            <OwnerProfile />
       <OwnerFooter />
    </div>
  )
}

export default OwnerProfilePage
