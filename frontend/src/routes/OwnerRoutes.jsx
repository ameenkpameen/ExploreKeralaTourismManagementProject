import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import OwnerHome from '../admin/pages/OwnerHome'
import OwnerProfilePage from '../admin/pages/OwnerProfilePage'
import OwnerMyProperties from '../admin/pages/OwnerMyProperties'
import EditPropertyPage from '../admin/pages/EditPropertyPage'
import AddPropertyPage from '../admin/pages/AddPropertyPage'
import OrdersPage from '../admin/pages/OrdersPage'
import DetailsOrderPage from '../admin/pages/DetailsOrderPage'
import AddBannersPage from '../admin/pages/AddBannersPage'
import ChatPage from '../admin/pages/ChatPage'
import OwnerLogin from '../admin/pages/OwnerLogin'
import OwnerSignup from '../admin/pages/OwnerSignup'
import OwnerErrorPage from '../admin/pages/OwnerErrorPage'

function OwnerRoutes() {
  return (
    <Routes>

            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='' element={<OwnerHome />}/>
            </Route>
            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='/profile' element={<OwnerProfilePage />} />
            </Route>
            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='/myproperties' element={<OwnerMyProperties />} />
            </Route>
            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='/editproperties/:id/:name' element={<EditPropertyPage />} />
            </Route>
            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='/addproperties' element={<AddPropertyPage />} />
            </Route>
            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='/mypropertyorders' element={<OrdersPage />} />
            </Route>
            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='/orderdetails' element={<DetailsOrderPage />} />
            </Route>
            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='/addbanners' element={<AddBannersPage />} />
            </Route>
            <Route element={<ProtectedRoutes type="owner" />}>
                <Route path='/mychats' element={<ChatPage />} />
            </Route>
            

            <Route path='/*' element={<OwnerErrorPage />} />
            <Route path='/login' element={<OwnerLogin />} />
            <Route path='/signup' element={<OwnerSignup />} />
    </Routes>
  )
}

export default OwnerRoutes
