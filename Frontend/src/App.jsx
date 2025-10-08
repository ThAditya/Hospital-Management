import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Appointment from './components/Appointment/Appointment';
import ContactUs from './components/ContactUs/ContactUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register/SignUp/Register';
import SignIn from './components/Register/LogIn/SignIn';

import Doctor from './components/Register/SignUp/Doctor';
import Patient from './components/Register/SignUp/Patient';

import LogIn from './components/Register/LogIn/LogIn';

// import PrivateRoute from './components/PrivateRoute';
// import PatientDashboard from './components/Patient-Dashboard/PatientDashboard';
// import DoctorDashboard from './components/Doctor-Dashboard/DoctorDashboard';

const App = () => {
  const location = useLocation();

  const noFooterRoutes = ['/Register', '/Register/Admin', '/Register/Patient', '/Register/Doctor','/Login', '/LogIn/Admin', '/LogIn/Doctor', '/LogIn/Patient',];

  const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Appointment' element={<Appointment />} />
        <Route path='/ContactUs' element={<ContactUs />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<SignIn />} />

        <Route path='/Register/Patient' element={<Patient />} />
        <Route path='/Register/Doctor' element={<Doctor />} />

        {/* <Route path='/patient/*' element={
          <PrivateRoute>
            <PatientDashboard />
          </PrivateRoute>
        } />
        <Route path='/doctor/*' element={
          <PrivateRoute>
            <DoctorDashboard />
          </PrivateRoute>
        } /> */}

      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;
