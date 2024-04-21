import './App.css';
import Student from './components/student/student';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/navbar';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={
        <><Navbar /><Student /></>
      }/>
    </Routes>
  </Router>
  );
}

export default App;
