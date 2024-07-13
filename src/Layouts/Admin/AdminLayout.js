import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminSidebar from '../../Components/Admin/AdminSidebar';
import AdminFooter from '../../Components/Admin/AdminFooter';




export default function AdminLayout() {
    return (
        <div>
            <AdminHeader />
            <AdminSidebar />
            <div className="content">
                <Outlet />
            </div>
            <AdminFooter />
        </div>
    )
}
