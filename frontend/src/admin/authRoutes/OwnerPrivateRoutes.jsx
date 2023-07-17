import { Navigate } from "react-router-dom"

export default function OwnerPrivateRoute (props) {
    if(localStorage.getItem('ownerInfo')){
        console.log("bbbbbbbbbbbbbbbb");
        return props.children
    }else{
        console.log("wwwwwwwwwwwww");
        return <Navigate to={'/owner/login'} />
    }
}