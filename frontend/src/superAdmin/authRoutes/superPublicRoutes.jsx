import { Navigate } from "react-router-dom"

export default function SuperAdminPublicRoute (props) {
   
        if(localStorage.getItem('superadminInfo')){
            return <Navigate to={'/superadmin'} />
        }else{
            return props.children
        }

   
}