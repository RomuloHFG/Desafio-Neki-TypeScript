import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { ToastContainer, Bounce } from 'react-toastify'; // Importando Bounce
import 'react-toastify/dist/ReactToastify.css';

// Tipagem para a propriedade children
interface PrivateRouteProps {
  children: React.ReactNode;
}

interface PublicRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("userToken");
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("userToken");
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce} // Usando a animação Bounce
        />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
