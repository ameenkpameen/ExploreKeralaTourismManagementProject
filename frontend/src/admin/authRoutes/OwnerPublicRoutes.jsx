import { Navigate } from "react-router-dom"

export default function OwnerPublicRoute (props) {
   
        if(localStorage.getItem('ownerInfo')){
            return <Navigate to={'/owner'} />
        }else{
            return props.children
        }

   
}