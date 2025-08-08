import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './pages/painter/Signup';
import Login from './pages/painter/Login';
import PainterDashboard from './components/PainterDashboard';
import EditProfilePage from './pages/EditProfilePage'; // ✅ correct import

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/painter/signup" element={<Signup />} />
        <Route path="/painter/login" element={<Login />} />
        <Route path="/painter/dashboard" element={<PainterDashboard />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
