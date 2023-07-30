import { createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { getDestinationDataReducer, getFilteredDataReducer, userEditProfileReducer, userLoginReducer, userRegisterReducer } from "./reducers/userReducers"
import { adminAddCabsReducer, adminAddHomeStayReducer, adminAddHotelReducer, adminEditProfileReducer, adminLoginReducer, adminRegisterReducer, ownerAddBannerReducer, ownerAddCabsReducer, ownerAddHomeStayReducer, ownerAddHotelReducer, ownerEditProfileReducer, ownerLoginReducer, ownerRegisterReducer } from "./reducers/adminReducers"
import { addBannerReducer, addDestinationReducer, superadminLoginReducer, superadminRegisterReducer } from "./reducers/superAdminReducers"
import { alertSlice, showLoading } from "./actions/alertSlice"

const reducer = combineReducers({
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userEditProfile: userEditProfileReducer,
   userGetFilteredData: getFilteredDataReducer,
   adminRegister: ownerRegisterReducer,
   ownerLogin: ownerLoginReducer,
   superadminLogin: superadminLoginReducer,
   superadminRegister: superadminRegisterReducer,
   addDestination: addDestinationReducer,
   addBanner:addBannerReducer,
   ownerEditProfile: ownerEditProfileReducer,
   ownerAddHomeStay: ownerAddHomeStayReducer,
   adminAddCabs: ownerAddCabsReducer,
   ownerAddHotel: ownerAddHotelReducer,
   ownerAddBanner: ownerAddBannerReducer,
   loadingSlice: alertSlice.reducer
})


const userInfoFromStorage = localStorage.getItem("userInfo")
 ?JSON.parse(localStorage.getItem("userInfo")) : null;

 const adminInfoFromStorage = localStorage.getItem("adminInfo")
 ?JSON.parse(localStorage.getItem("adminInfo")) : null; 

 const superadminInfoFromStorage = localStorage.getItem("superadminInfo")
 ?JSON.parse(localStorage.getItem("superadminInfo")) : null; 

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    adminRegister: {adminInfo: adminInfoFromStorage},
    adminLogin: {adminInfo: adminInfoFromStorage},
    superadminLogin: {superadminInfo: superadminInfoFromStorage},
    superadminRegister: {superadminInfo: superadminInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;