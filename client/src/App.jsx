import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------- Painter Pages ---------- */
import Signup from "./pages/painter/Signup";
import Login from "./pages/painter/Login";
import PainterDashboard from "./components/PainterDashboard";
import EditProfilePage from "./pages/EditProfilePage";

/* ---------- User Pages ---------- */
import UserSignup from "./pages/user/UserSignup";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import UserEditProfile from "./pages/user/UserEditProfile";


function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* ---------- Painter Routes ---------- */}
        <Route path="/painter/signup" element={<Signup />} />
        <Route path="/painter/login" element={<Login />} />
        <Route path="/painter/dashboard" element={<PainterDashboard />} />
        <Route path="/painter/edit-profile" element={<EditProfilePage />} />

        {/* ---------- User Routes ---------- */}
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/edit-profile" element={<UserEditProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
