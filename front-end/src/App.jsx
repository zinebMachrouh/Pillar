import { useState } from 'react'
import './App.css'
import SignUp from './components/signup';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Welcome from './components/welcome';
import DoctorCreate from './components/doctor/create';
import DoctorIndex from './components/doctor';

const App = () => {
  return ( 
    <Routes>
      <Route path='/' element={<Welcome/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/doctor/create' element={<DoctorCreate/>} />
      <Route path='/doctor/patients' element={<DoctorIndex/>} />
    </Routes>
  );
}

export default App;