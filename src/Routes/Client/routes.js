import ClientConfig from '../../Config/Client';

import Home from '../../Pages/Client/Home';
import About from '../../Pages/Client/About';



// Public routes
const publicClientRoutes = [
    // *Client routes
    { path: ClientConfig.routes.home, component: Home },
    { path: ClientConfig.routes.about, component: About },

];


export { publicClientRoutes };
