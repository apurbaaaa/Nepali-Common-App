import './App.css';
import Student from './components/student/student'; // Ensure paths are correctly cased
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login/login'; // Ensure paths are correctly cased
import Signup from './components/SignUp/signup'; // Ensure paths are correctly cased
import College from './components/College/college'; // Ensure paths are correctly cased
import HandleApplication from './components/College/handleApplications'; // Corrected import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Dashboards */}
        <Route path="/student-dashboard" element={<Student />} />
        <Route path="/college-dashboard" element={<College />} />
        <Route path="/handle-applications" element={<HandleApplication />} /> {/* Corrected Route for HandleApplication */}
      </Routes>
    </Router>
  );
}

export default App;
