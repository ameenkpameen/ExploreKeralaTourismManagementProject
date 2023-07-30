import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes({type}) {
    const authConfig = {
        user: {
            token: 'userInfo',
            redirection_path: '/login'
        },
        owner: {
            token: 'ownerInfo',
            redirection_path: '/owner/login'
        },
        superadmin: {
            token: 'superadminInfo',
            redirection_path: '/superadmin/login'
        }
    }
    const redirectTo = authConfig[type].redirection_path;
    const tokenName = authConfig[type].token
    const auth = (JSON.parse(localStorage.getItem(tokenName)))?.token
  return auth ? <Outlet /> : <Navigate to={redirectTo} />
}

export default ProtectedRoutes
