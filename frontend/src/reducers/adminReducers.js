import { ADMIN_ADDCABS_FAIL, ADMIN_ADDCABS_REQUEST, ADMIN_ADDCABS_SUCCESS, ADMIN_ADDHOMESTAY_FAIL, ADMIN_ADDHOMESTAY_REQUEST, ADMIN_ADDHOMESTAY_SUCCESS, ADMIN_ADDHOTEL_FAIL, ADMIN_ADDHOTEL_REQUEST, ADMIN_ADDHOTEL_SUCCESS, ADMIN_EDITPROFILE_FAIL, ADMIN_EDITPROFILE_REQUEST, ADMIN_EDITPROFILE_SUCCESS, ADMIN_LOGIN_FAIL, OWNERADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, ADMIN_REGISTER_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, OWNER_REGISTER_FAIL, OWNER_REGISTER_REQUEST, OWNER_REGISTER_SUCCESS, OWNER_LOGIN_REQUEST, OWNER_LOGIN_SUCCESS, OWNER_LOGIN_FAIL, OWNER_LOGOUT, OWNER_EDITPROFILE_REQUEST, OWNER_EDITPROFILE_SUCCESS, OWNER_EDITPROFILE_FAIL, OWNER_ADDCABS_REQUEST, OWNER_ADDCABS_SUCCESS, OWNER_ADDCABS_FAIL, OWNER_ADDHOMESTAY_REQUEST, OWNER_ADDHOMESTAY_SUCCESS, OWNER_ADDHOMESTAY_FAIL, OWNER_ADDHOTEL_REQUEST, OWNER_ADDHOTEL_SUCCESS, OWNER_ADDHOTEL_FAIL, OWNER_ADDBANNER_REQUEST, OWNER_ADDBANNER_SUCCESS, OWNER_ADDBANNER_FAIL } from "../constants/adminConstants";

export const ownerRegisterReducer = (state = {}, action) =>{
    switch (action.type) {
        case OWNER_REGISTER_REQUEST:
            return { loading:true }
        case OWNER_REGISTER_SUCCESS:
            return { loading:false, ownerInfo: action.payload}
        case OWNER_REGISTER_FAIL:
            return { loading:false, error: action.payload }
           
    
        default:
            return state;
    }
}

export const ownerLoginReducer = (state = {}, action) =>{
    switch (action.type) {
        case OWNER_LOGIN_REQUEST:
            return { loading:true }
        case OWNER_LOGIN_SUCCESS:
            return { loading:true, ownerInfo: action.payload}
        case OWNER_LOGIN_FAIL:
            return { loading:false, error: action.payload }
        case OWNER_LOGOUT:
            return {}    
    
        default:
            return state;
    }
}

export const ownerEditProfileReducer = (state = {}, action) =>{
    switch (action.type) {
        case OWNER_EDITPROFILE_REQUEST:
            return { loading:true }
        case OWNER_EDITPROFILE_SUCCESS:
            return { loading:false, adminsInfo: action.payload}
        case OWNER_EDITPROFILE_FAIL:
            return { loading:false, error: action.payload }
          
    
        default:
            return state;
    }
}



export const ownerAddHomeStayReducer = (state = {}, action) =>{
    switch (action.type) {
        case OWNER_ADDHOMESTAY_REQUEST:
            return { loading:true }
        case OWNER_ADDHOMESTAY_SUCCESS:
            return { loading:false, homestayAddInfo: action.payload}
        case OWNER_ADDHOMESTAY_FAIL:
            return { loading:false, error: action.payload }
          
    
        default:
            return state;
    }
}



export const ownerAddHotelReducer = (state = {}, action) =>{
    switch (action.type) {
        case OWNER_ADDHOTEL_REQUEST:
            return { loading:true }
        case OWNER_ADDHOTEL_SUCCESS:
            return { loading:false, hotelAddInfo: action.payload}
        case OWNER_ADDHOTEL_FAIL:
            return { loading:false, error: action.payload }
          
    
        default:
            return state;
    }
}



export const ownerAddCabsReducer = (state = {}, action) =>{
    switch (action.type) {
        case OWNER_ADDCABS_REQUEST:
            return { loading:true }
        case OWNER_ADDCABS_SUCCESS:
            return { loading:false, cabsAddInfo: action.payload}
        case OWNER_ADDCABS_FAIL:
            return { loading:false, error: action.payload }
          
    
        default:
            return state;
    }
}


export const ownerAddBannerReducer = (state = {}, action) =>{
    switch (action.type) {
        case OWNER_ADDBANNER_REQUEST:
            return { loading:true }
        case OWNER_ADDBANNER_SUCCESS:
            return { loading:false, cabsAddInfo: action.payload}
        case OWNER_ADDBANNER_FAIL:
            return { loading:false, error: action.payload }
        default:
            return state;
    }
}
