import { useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import AuthService from "../../../services/AuthService";



function AdminLayout(){
    const nav = useNavigate()
   
    const email = AuthService.getEmail()
    const userType = AuthService.getUserType()

    useEffect(() => {
        if (email == null || userType !== '1') {
            toast.error("Unauthorized")
            nav("/")
        }
    }, [])

    
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>
        </>
    )
}

export default AdminLayout