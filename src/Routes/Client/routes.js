import About from '../../Pages/Client/About';
import Home from '../../Pages/Client/Home';
import ClientConfig from '../../Config/Client';



// Public routes
const publicClientRoutes = [
    // *Client routes
    { path: ClientConfig.routes.home, component: Home },
    { path: ClientConfig.routes.about, component: About },

];


export { publicClientRoutes };
