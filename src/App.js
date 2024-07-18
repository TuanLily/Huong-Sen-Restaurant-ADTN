import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from './Components/404/NotFound';
import ClientLayout from './Layouts/Client/ClientLayout';
import ClientConfig from './Config/Client';
import { publicClientRoutes } from './Routes/Client';
import Login from './Pages/Client/Authenticator/Login';

function App() {
  return (
    <div className="App">
      <Routes>

        {/* Định nghĩa route cho trang Login */}
        <Route path="/login" element={<Login />} />

        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          {publicClientRoutes
            .filter(route => route.path.startsWith(ClientConfig.routes.home))
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
