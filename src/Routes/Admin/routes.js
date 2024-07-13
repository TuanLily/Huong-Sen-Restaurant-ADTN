import AdminConfig from '../../Config/Admin';
import Dashboard from '../../Pages/Admin/Dashboard';
import List from '../../Pages/Admin/List';



// Public routes
const publicAdminRoutes = [
    // *Admin routes
    { path: AdminConfig.routes.dashboard, component: Dashboard },
    { path: AdminConfig.routes.list, component: List },

];


export { publicAdminRoutes };
