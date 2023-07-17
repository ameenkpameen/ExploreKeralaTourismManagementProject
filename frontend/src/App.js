
import './App.css';
import LoginPage from './user/pages/LoginPage';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import SignupPage from './user/pages/SignupPage';
import HomePage from './user/pages/HomePage';
import UserPrivateRoute from './user/authRoutes/userPrivateRoute';
import UserPublicRoute from './user/authRoutes/userPublicRoute';
import OwnerPublicRoute from './admin/authRoutes/OwnerPublicRoutes.jsx';
import OwnerPrivateRoute from './admin/authRoutes/OwnerPrivateRoutes.jsx';
import OwnerHome from './admin/pages/OwnerHome';
import OwnerLogin from './admin/pages/OwnerLogin.jsx';
import OwnerSignup from './admin/pages/OwnerSignup';
import SuperAdminPrivateRoute from './superAdmin/authRoutes/superPrivateRoutes';
import SuperAdminHome from './superAdmin/pages/SuperAdminHome';
import SuperAdminPublicRoute from './superAdmin/authRoutes/superPublicRoutes';
import SuperAdminLogin from './superAdmin/pages/SuperAdminLogin';
import SuperAdminSignup from './superAdmin/pages/SuperAdminSignup';
import OwnerProfilePage from './admin/pages/OwnerProfilePage';
import OwnerMyProperties from './admin/pages/OwnerMyProperties';
import AddPropertyPage from './admin/pages/AddPropertyPage';
import UsersListPage from './superAdmin/pages/UsersListPage';
import AdminsListPage from './superAdmin/pages/AdminsListPage';
import DestinationsPage from './superAdmin/pages/DestinationsPage';
import EditPropertyPage from './admin/pages/EditPropertyPage';
import NotificationsPage from './superAdmin/pages/NotificationsPage';
import ProfilePage from './user/pages/ProfilePage';
import PlannTrip from './user/pages/PlannTrip';
import ShowFilteredDataPage from './user/pages/ShowFilteredDataPage';
import ListDestinationsPage from './user/pages/ListDestinationsPage';
import AddDestinationForm from './superAdmin/pages/AddDestinationForm';
import CheckoutPage from './user/pages/CheckoutPage';
import PaymentPage from './user/pages/PaymentPage';
import OrdersListPage from './user/pages/OrdersListPage';
import OrderDetailPage from './user/pages/OrderDetailPage';
import OrdersPage from './admin/pages/OrdersPage';
import DetailsOrderPage from './admin/pages/DetailsOrderPage';
import AddBannerPage from './superAdmin/pages/AddBannerPage';
import ListBannersPage from './superAdmin/pages/ListBannersPage';
import ShowDestPropPage from './user/pages/ShowDestPropPage';
import AddBannersPage from './admin/pages/AddBannersPage';
import WalletPage from './user/pages/WalletPage';
import AddCoupenPage from './superAdmin/pages/AddCoupenPage';
import ListCoupensPage from './superAdmin/pages/ListCoupensPage';
import EditCoupenPage from './superAdmin/pages/EditCoupenPage';
import ChatPage from './admin/pages/ChatPage';



function App() {
  
  
  return (
    
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<UserPrivateRoute> <HomePage/> </UserPrivateRoute> } />
           <Route path='/login' element={<UserPublicRoute><LoginPage/> </UserPublicRoute>} />
           <Route path='/signup' element={<UserPublicRoute><SignupPage/></UserPublicRoute>} />
           <Route path='/myprofile' element={<UserPrivateRoute> <ProfilePage/> </UserPrivateRoute> } />
           <Route path='/plantrip' element={<UserPrivateRoute> <PlannTrip/> </UserPrivateRoute> } />
           <Route path='/listfiltereddata' element={<UserPrivateRoute> <ShowFilteredDataPage /> </UserPrivateRoute> } />
           <Route path='/listdestinations' element={<UserPrivateRoute> <ListDestinationsPage /> </UserPrivateRoute> } />
           <Route path='/checkout' element={<UserPrivateRoute> <CheckoutPage /> </UserPrivateRoute> } />
           <Route path='/payment' element={<UserPrivateRoute> <PaymentPage /> </UserPrivateRoute> } />
           <Route path='/myorders' element={<UserPrivateRoute> <OrdersListPage /> </UserPrivateRoute> } />
           <Route path='/orderdetails' element={<UserPrivateRoute> <OrderDetailPage /> </UserPrivateRoute> } />
           <Route path='/showdestinationproperties' element={<UserPrivateRoute> <ShowDestPropPage /> </UserPrivateRoute> } />
           <Route path='/mywallet' element={<UserPrivateRoute> <WalletPage /> </UserPrivateRoute>} />



           <Route path='/owner' element={<OwnerPrivateRoute> <OwnerHome/> </OwnerPrivateRoute> } />
           <Route path='/owner/profile' element={<OwnerPrivateRoute> <OwnerProfilePage /> </OwnerPrivateRoute> } />
           <Route path='/owner/myproperties' element={<OwnerPrivateRoute> <OwnerMyProperties /> </OwnerPrivateRoute> } />
           <Route path='/owner/editproperties/:id/:name' element={<OwnerPrivateRoute> <EditPropertyPage /> </OwnerPrivateRoute> } />
           <Route path='/owner/addproperties' element={<OwnerPrivateRoute> <AddPropertyPage /> </OwnerPrivateRoute> } />
           <Route path='/owner/mypropertyorders' element={<OwnerPrivateRoute> <OrdersPage /> </OwnerPrivateRoute> } />
           <Route path='/owner/orderdetails' element={<OwnerPrivateRoute> <DetailsOrderPage /> </OwnerPrivateRoute> } />
           <Route path='/owner/addbanners' element={<OwnerPrivateRoute> <AddBannersPage /> </OwnerPrivateRoute> } />
           <Route path='/owner/mychats' element={<OwnerPrivateRoute> <ChatPage /> </OwnerPrivateRoute> } />          
           <Route path='/owner/login' element={<OwnerPublicRoute> <OwnerLogin/> </OwnerPublicRoute> } />
           <Route path='/owner/signup' element={<OwnerPublicRoute> <OwnerSignup/> </OwnerPublicRoute> } />


           <Route path='/superadmin' element={<SuperAdminPrivateRoute> <SuperAdminHome/> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/listusers' element={<SuperAdminPrivateRoute> <UsersListPage/> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/listOwners' element={<SuperAdminPrivateRoute> <AdminsListPage/> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/listDestinations' element={<SuperAdminPrivateRoute> <DestinationsPage /> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/notifications' element={<SuperAdminPrivateRoute> <NotificationsPage /> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/login' element={<SuperAdminPublicRoute> <SuperAdminLogin/> </SuperAdminPublicRoute> } />
           <Route path='/superadmin/signup' element={<SuperAdminPublicRoute> <SuperAdminSignup/> </SuperAdminPublicRoute> } />
           <Route path='/superadmin/adddestinations' element={<SuperAdminPrivateRoute> <AddDestinationForm /> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/addbanners' element={<SuperAdminPrivateRoute> <AddBannerPage /> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/viewbanners' element={<SuperAdminPrivateRoute> <ListBannersPage /> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/addcoupens' element={<SuperAdminPrivateRoute> <AddCoupenPage /> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/listcoupens' element={<SuperAdminPrivateRoute> <ListCoupensPage /> </SuperAdminPrivateRoute> } />
           <Route path='/superadmin/editcoupen' element={<SuperAdminPrivateRoute> <EditCoupenPage /> </SuperAdminPrivateRoute> } />
           
         </Routes>
        
      </BrowserRouter>
    
  );
}

export default App;
