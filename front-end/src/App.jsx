import { useState } from 'react'
import './App.css'
import SignUp from './components/signup';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Welcome from './components/welcome';

const App = () => {
  return ( 
    <Routes>
      <Route path='/' element={<Welcome/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  );
}

export default App;