import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import PlanTrip from '../components/PlanTrip'
import image from '../../../src/assets/images/photographer-stands-with-camera-shore-with-great-evening-sky-him.jpg'

function PlannTrip() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
            <PlanTrip />
        <Footer />
    </div>
  )
}

export default PlannTrip
