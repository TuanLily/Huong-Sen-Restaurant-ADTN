import React from 'react'

import { Outlet } from 'react-router-dom';
import ClientHeader from '../../Components/Client/ClientHeader';
import Navbar from '../../Components/Client/Navbar';
import ClientFooter from '../../Components/Client/ClientFooter';


export default function ClientLayout() {
    return (
        <div>
            <ClientHeader />
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
            <ClientFooter />
        </div>
    )
}
