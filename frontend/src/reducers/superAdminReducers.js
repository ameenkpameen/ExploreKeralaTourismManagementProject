import { SUPERADMIN_ADDBANNER_FAIL, SUPERADMIN_ADDBANNER_REQUEST, SUPERADMIN_ADDBANNER_SUCCESS, SUPERADMIN_ADDDEST_FAIL, SUPERADMIN_ADDDEST_REQUEST, SUPERADMIN_ADDDEST_SUCCESS, SUPERADMIN_LOGIN_FAIL, SUPERADMIN_LOGIN_REQUEST, SUPERADMIN_LOGIN_SUCCESS, SUPERADMIN_LOGOUT, SUPERADMIN_REGISTER_FAIL, SUPERADMIN_REGISTER_REQUEST, SUPERADMIN_REGISTER_SUCCESS } from "../constants/superAdminConstants"


export const superadminLoginReducer = (state = {}, action) =>{
    switch (action.type) {
        case SUPERADMIN_LOGIN_REQUEST:
            return { loading:true }
        case SUPERADMIN_LOGIN_SUCCESS:
            return { loading:false, superadminInfo: action.payload}
        case SUPERADMIN_LOGIN_FAIL:
            return { loading:false, error: action.payload }
        case SUPERADMIN_LOGOUT:
            return {}    
    
        default:
            return state;
    }
}

export const superadminRegisterReducer = (state = {}, action) =>{
    switch (action.type) {
        case SUPERADMIN_REGISTER_REQUEST:
            return { loading:true }
        case SUPERADMIN_REGISTER_SUCCESS:
            return { loading:false, superadminInfo: action.payload}
        case SUPERADMIN_REGISTER_FAIL:
            return { loading:false, error: action.payload }
           
    
        default:
            return state;
    }
}

export const addDestinationReducer = (state = {}, action) =>{
    switch (action.type) {
        case SUPERADMIN_ADDDEST_REQUEST:
            return { loading:true }
        case SUPERADMIN_ADDDEST_SUCCESS:
            return { loading:false}
        case SUPERADMIN_ADDDEST_FAIL:
            return { loading:false, error: action.payload }
           
    
        default:
            return state;
    }
}

export const addBannerReducer = (state = {}, action) =>{
    switch (action.type) {
        case SUPERADMIN_ADDBANNER_REQUEST:
            return { loading:true }
        case SUPERADMIN_ADDBANNER_SUCCESS:
            return { loading:false}
        case SUPERADMIN_ADDBANNER_FAIL:
            return { loading:false, error: action.payload }
           
    
        default:
            return state;
    }
}



