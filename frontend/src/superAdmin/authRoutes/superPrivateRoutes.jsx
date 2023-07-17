
import { Navigate } from "react-router-dom"

export default function SuperAdminPrivateRoute (props) {
    if(localStorage.getItem('superadminInfo')){
        console.log("bbbbbbbb");
        return props.children
    }else{
        return <Navigate to={'/superadmin/login'} />
    }
}

