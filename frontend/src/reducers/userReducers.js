import { USER_EDITPROFILE_FAIL, USER_EDITPROFILE_REQUEST, USER_EDITPROFILE_SUCCESS, USER_GETFILTEREDDATA_FAIL, USER_GETFILTEREDDATA_REQUEST, USER_GETFILTEREDDATA_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) =>{
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading:true }
        case USER_LOGIN_SUCCESS:
            return { loading:true, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return { loading:false, error: action.payload }
        case USER_LOGOUT:
            return {}    
    
        default:
            return state;
    }
}


export const userRegisterReducer = (state = {}, action) =>{
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading:true }
        case USER_REGISTER_SUCCESS:
            return { loading:false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return { loading:false, error: action.payload }
           
    
        default:
            return state;
    }
}


export const userEditProfileReducer = (state = {}, action) =>{
    switch (action.type) {
        case USER_EDITPROFILE_REQUEST:
            return { loading:true }
        case USER_EDITPROFILE_SUCCESS:
            return { loading:false, userInfo: action.payload}
        case USER_EDITPROFILE_FAIL:
            return { loading:false, error: action.payload }
           
    
        default:
            return state;
    }
}

export const getFilteredDataReducer = (state = {}, action) =>{
    switch (action.type) {
        case USER_GETFILTEREDDATA_REQUEST:
            return { loading:true }
        case USER_GETFILTEREDDATA_SUCCESS:
            return { loading:false, filteredData: action.payload}
        case USER_GETFILTEREDDATA_FAIL:
            return { loading:false, error: action.payload }
           
    
        default:
            return state;
    }
}


