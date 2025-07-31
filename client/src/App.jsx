import { Routes, Route } from 'react-router-dom';
import Signup from './pages/painter/Signup';
import Login from './pages/painter/Login';
import PainterDashboard from './components/PainterDashboard';

function App() {
  return (
    <Routes>
      <Route path="/painter/signup" element={<Signup />} />
      <Route path="/painter/login" element={<Login />} />
      <Route path="/painter/dashboard" element={<PainterDashboard />} />

    </Routes>
  );
}

export default App;
