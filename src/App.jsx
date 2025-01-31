import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientRegistration from './components/PatientRegistration';


const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/register" element={<PatientRegistration />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
