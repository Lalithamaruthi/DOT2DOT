import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import WhatsAppLogo from "./Images/whatsapplogo.png";
import Signup from "./Components/Login/Signup";
import ApplicationForm from "./Components/ApplicationForm/ApplicationForm";
import PropTypes from "prop-types";
import { AuthProvider, useUserAuth } from "./AuthContex/AuthContext";
import Buy from "./Components/Home/Orders/Buy/Buy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PrivateRoute({ element, role, children }) {
  const { currentUser } = useUserAuth();

  if (!currentUser) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  if (role && currentUser.role !== role) {
    // Redirect to home if user doesn't have the required role
    return <Navigate to="/" />;
  }

  return children || element;
}

PrivateRoute.propTypes = {
  element: PropTypes.element,
  role: PropTypes.string,
  children: PropTypes.node,
};

function App() {
  return (
    <div className="App">
      <Router>
        <div className="top-line-bar" />
        <div className="all-components-container">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Signup />} />
              <Route path="/view/:id" element={<Buy />} />
              {/* <Route path="/upload" element={<Dummy />} /> */}
              {/* Protected routes for users */}
              <Route
                path="/user/*"
                element={
                  <PrivateRoute role="user">
                    <ApplicationForm />
                  </PrivateRoute>
                }
              />

              {/* Protected routes for admins */}
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute role="admin">
                    <ApplicationForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </div>
        <div
          className="whatsapp-logo"
          onClick={() => (window.location.href = "https://wa.me/919741546178")}
        >
          <img src={WhatsAppLogo} alt="whatsapp" />
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
