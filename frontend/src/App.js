import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminLogin from './components/admin/AdminLogin';
import FacultySignup from './components/faculty/FacultySignup';
import FacultyLogin from './components/faculty/FacultyLogin';
//import Home from './components/admin/AdminHome';
import MainPage from './components/MainPage';
import AdminSignup from './components/admin/AdminSignup';
import AdminHome from './components/admin/AdminHome';
import FacultyHome from './components/faculty/FacultyHome';
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/faculty/signup" element={<FacultySignup />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/faculty/home" element={<FacultyHome/>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;