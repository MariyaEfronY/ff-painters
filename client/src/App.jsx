import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------- Main Pages ---------- */
import HomePage from "./pages/HomePage";   // ✅ New Homepage
import PaintersList from "./pages/PaintersList";
import PainterDetail from "./pages/PainterDetail";

/* ---------- Painter Pages ---------- */
import Signup from "./pages/painter/Signup";
import Login from "./pages/painter/Login";
import PainterDashboard from "./components/PainterDashboard";
import EditProfilePage from "./pages/EditProfilePage";
import UploadGallery from "./components/UploadGallery";  
import GalleryPage from "./components/GalleryPage";
import PainterBookingsPage from "./pages/painter/PainterBookingsPage"; 

/* ---------- User Pages ---------- */
import UserSignup from "./pages/user/UserSignup";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import UserEditProfile from "./pages/user/UserEditProfile";
import BookingPage from "./pages/BookingPage"; 
import UserBookingsPage from "./pages/user/UserBookingsPage"; 

/* ---------- Admin Pages ---------- */
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManagePainters from "./pages/admin/ManagePainters";
import ManageBookings from "./pages/admin/ManageBookings";

/* ---------- Protected Route ---------- */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* ---------- Main Page ---------- */}
        <Route path="/" element={<HomePage />} />    {/* ✅ Default homepage */}
        <Route path="/painters" element={<PaintersList />} /> {/* Painter list */}
        <Route path="/painters/:id" element={<PainterDetail />} />

        {/* ---------- Painter Routes ---------- */}
        <Route path="/painter/signup" element={<Signup />} />
        <Route path="/painter/login" element={<Login />} />
        <Route path="/dashboard" element={<PainterDashboard />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/upload-gallery" element={<UploadGallery />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/painter/bookings" element={<PainterBookingsPage />} />

        {/* ---------- User Routes ---------- */}
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/edit-profile" element={<UserEditProfile />} />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/user/bookings" element={<UserBookingsPage />} />

        {/* ---------- Admin Routes ---------- */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/painters" element={<ManagePainters />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
