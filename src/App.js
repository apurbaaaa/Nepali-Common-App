import './App.css';
import Student from './components/student/student';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/navbar';
import Login from './components/Login/login';
import Signup from './components/SignUp/signup';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* dashboards */}
      <Route path="/student-dashboard" element={
        <><Navbar /><Student /></>
      }/> 
    </Routes>
  </Router>
  );
}

export default App;

