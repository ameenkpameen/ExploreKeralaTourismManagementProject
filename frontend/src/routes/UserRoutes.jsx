import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import HomePage from '../user/pages/HomePage'
import ProfilePage from '../user/pages/ProfilePage'
import PlannTrip from '../user/pages/PlannTrip'
import ShowFilteredDataPage from '../user/pages/ShowFilteredDataPage'
import ListDestinationsPage from '../user/pages/ListDestinationsPage'
import CheckoutPage from '../user/pages/CheckoutPage'
import PaymentPage from '../user/pages/PaymentPage'
import OrdersListPage from '../user/pages/OrdersListPage'
import OrderDetailPage from '../user/pages/OrderDetailPage'
import WalletPage from '../user/pages/WalletPage'
import ChatingPage from '../user/pages/ChatingPage'
import LoginPage from '../user/pages/LoginPage'
import SignupPage from '../user/pages/SignupPage'
import ShowDestPropPage from '../user/pages/ShowDestPropPage'
import ErrorPage from '../user/pages/ErrorPage'
import LoadingPage from '../user/pages/LoadingPage'
import { useSelector } from 'react-redux'

function UserRoutes() {
    const loading = useSelector((state)=> state.loadingSlice)
  return (
    
        <Routes>
            
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='' element={<HomePage />}/>
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='myprofile' element={<ProfilePage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='plantrip' element={<PlannTrip />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='listfiltereddata' element={<ShowFilteredDataPage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='payment' element={<PaymentPage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='checkout' element={<CheckoutPage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='listdestinations' element={<ListDestinationsPage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='myorders' element={<OrdersListPage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='orderdetails' element={<OrderDetailPage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='showdestinationproperties' element={<ShowDestPropPage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='mywallet' element={<WalletPage />} />
                </Route>
                <Route element={<ProtectedRoutes type="user" />}>
                    <Route path='chatpage' element={<ChatingPage />} />
                </Route>

                <Route path='/*' element={<ErrorPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
        </Routes>
    
  )
}

export default UserRoutes
