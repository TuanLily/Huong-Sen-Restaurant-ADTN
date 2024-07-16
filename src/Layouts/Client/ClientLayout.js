import React from 'react'

import { Outlet } from 'react-router-dom';
import ClientHeader from '../../Components/Client/ClientHeader';
import Navbar from '../../Components/Client/Navbar';
import ClientFooter from '../../Components/Client/ClientFooter';
import BackToTop from '../../Components/Client/BackToTop';
import Spinner from '../../Components/Client/Spinner';


export default function ClientLayout() {
    return (
        <div>
            <ClientHeader />
            {/* <Navbar /> */}
            <div className="content">
                <Outlet />
            </div>
            <BackToTop/>
            <ClientFooter />
        </div>
    )
}
