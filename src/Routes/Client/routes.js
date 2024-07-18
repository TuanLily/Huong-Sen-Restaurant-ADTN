import ClientConfig from '../../Config/Client';

import Home from '../../Pages/Client/Home';
import About from '../../Pages/Client/About';
import Login from '../../Pages/Client/Authenticator/Login';



// Public routes
const publicClientRoutes = [
    // *Client routes
    { path: ClientConfig.routes.home, component: Home },
    { path: ClientConfig.routes.about, component: About },
    { path: ClientConfig.routes.login, component: Login },

];


export { publicClientRoutes };
