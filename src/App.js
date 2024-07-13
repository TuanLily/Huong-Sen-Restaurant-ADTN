import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from './Components/404/NotFound';
import ClientLayout from './Layouts/Client/ClientLayout';
import AdminLayout from './Layouts/Admin/AdminLayout';
import ClientConfig from './Config/Client';
import AdminConfig from './Config/Admin';
import { publicClientRoutes } from './Routes/Client';
import { publicAdminRoutes } from './Routes/Admin';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          {publicClientRoutes
            .filter(route => route.path.startsWith(ClientConfig.routes.home))
            .map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {publicAdminRoutes
            .filter(route => route.path.startsWith(AdminConfig.routes.dashboard)) // Filter admin routes
            .map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
