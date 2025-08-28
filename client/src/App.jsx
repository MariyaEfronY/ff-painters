import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------- Main Pages ---------- */
import PaintersList from "./pages/PaintersList";
// import LandingPage from "./pages/LandingPage";
import PainterDetail from "./pages/PainterDetail";


/* ---------- Painter Pages ---------- */
import Signup from "./pages/painter/Signup";
import Login from "./pages/painter/Login";
import PainterDashboard from "./components/PainterDashboard";
import EditProfilePage from "./pages/EditProfilePage";
import UploadGallery from "./components/UploadGallery";  
import GalleryPage from "./components/GalleryPage";
import PainterBookings from "./pages/PainterBookings"; // ✅ Added painter bookings page

/* ---------- User Pages ---------- */
import UserSignup from "./pages/user/UserSignup";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import UserEditProfile from "./pages/user/UserEditProfile";
import BookingPage from "./pages/BookingPage"; // ✅ Added booking page
import UserBookings from "./pages/user/UserBookings";


function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        {/* ---------- Main Page ----------  <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<PaintersList />} /> 
       
        <Route path="/painters/:id" element={<PainterDetail />} />

        {/* ---------- Painter Routes ---------- */}
        <Route path="/painter/signup" element={<Signup />} />
        <Route path="/painter/login" element={<Login />} />
        <Route path="/dashboard" element={<PainterDashboard />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/upload-gallery" element={<UploadGallery />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/painter/bookings" element={<PainterBookings />} /> {/* ✅ */}

        {/* ---------- User Routes ---------- */}
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/edit-profile" element={<UserEditProfile />} />
        <Route path="/book/:id" element={<BookingPage />} /> {/* ✅ User booking page */}
        <Route path="/user/bookings" element={<UserBookings />} />

      </Routes>
    </Router>
  );
}

export default App;
