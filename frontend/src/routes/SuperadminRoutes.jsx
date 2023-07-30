import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import SuperAdminHome from '../superAdmin/pages/SuperAdminHome'
import UsersListPage from '../superAdmin/pages/UsersListPage'
import AdminsListPage from '../superAdmin/pages/AdminsListPage'
import DestinationsPage from '../superAdmin/pages/DestinationsPage'
import NotificationsPage from '../superAdmin/pages/NotificationsPage'
import AddDestinationForm from '../superAdmin/pages/AddDestinationForm'
import AddBannerPage from '../superAdmin/pages/AddBannerPage'
import ListBannersPage from '../superAdmin/pages/ListBannersPage'
import AddCoupenPage from '../superAdmin/pages/AddCoupenPage'
import ListCoupensPage from '../superAdmin/pages/ListCoupensPage'
import EditCoupenPage from '../superAdmin/pages/EditCoupenPage'
import SuperAdminLogin from '../superAdmin/pages/SuperAdminLogin'
import SuperAdminErrorPage from '../superAdmin/pages/SuperAdminErrorPage'

function SuperadminRoutes() {
  return (
    <Routes>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='' element={<SuperAdminHome />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/listusers' element={<UsersListPage />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/listOwners' element={<AdminsListPage />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/listDestinations' element={<DestinationsPage />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/notifications' element={<NotificationsPage />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/adddestinations' element={<AddDestinationForm />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/addbanners' element={<AddBannerPage />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/viewbanners' element={<ListBannersPage />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/addcoupens' element={<AddCoupenPage />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/listcoupens' element={<ListCoupensPage />} />
        </Route>
        <Route element={<ProtectedRoutes type="superadmin" />}>
            <Route path='/editcoupen' element={<EditCoupenPage />} />
        </Route>

        <Route path='/login' element={<SuperAdminLogin />} />
        <Route path='/*' element={<SuperAdminErrorPage />} />
      
    </Routes>
  )
}

export default SuperadminRoutes
