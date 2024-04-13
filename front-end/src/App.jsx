import { useState } from 'react'
import './App.css'
import SignUp from './components/signup';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Welcome from './components/welcome';
import DoctorCreate from './components/doctor/create';
import DoctorIndex from './components/doctor';
import PatientCreate from './components/patient/create';
import Checkup from './components/doctor/checkupCreate';

const App = () => {
  return ( 
    <Routes>
      <Route path='/' element={<Welcome/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/doctor/create' element={<DoctorCreate/>} />
      <Route path='/doctor/patients' element={<DoctorIndex />} />
      <Route path='/patient/create' element={<PatientCreate/>} />
      <Route path='/create/checkup' element={<Checkup/>} />
    </Routes>
  );
}

export default App;