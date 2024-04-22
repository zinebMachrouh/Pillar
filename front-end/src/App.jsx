import './App.css'
import SignUp from './components/signup';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Welcome from './components/welcome';
import DoctorCreate from './components/doctor/create';
import DoctorIndex from './components/doctor';
import PatientCreate from './components/doctor/patient/create';
import Checkup from './components/checkup/checkupCreate';
import Page404 from './components/404';
import AdminDashboard from './components/admin';
import { jwtDecode } from 'jwt-decode';
import Details from './components/doctor/details';
import AppRequests from './components/doctor/childs/requests';
import Main from './components/doctor/childs/main';
import PatientDetails from './components/doctor/patient/details';
import CreateMed from './components/doctor/createMed';
import PatienDashboard from './components/patient';

const App = () => {
  const token = sessionStorage.getItem('token');
  let role = sessionStorage.getItem('role');
  if (token) {
    const decoded = jwtDecode(token);
    const { role_id } = decoded;
    sessionStorage.setItem('role', role_id);
  }
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      {token && (
        <>
          <Route path='/doctor/create' element={<DoctorCreate />} />
          <Route path='/doctor' element={<DoctorIndex />} >
            <Route index path='' element={<Main />} />
            <Route path='/doctor/requests' element={<AppRequests />} />
          </Route>
          <Route path='/patient/create' element={<PatientCreate />} />
          <Route path='/create/checkup' element={<Checkup />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/appointment' element={<Details />} />
          <Route path='/patient/details' element={<PatientDetails />} />
          <Route path='/create/medication' element={<CreateMed />} />

          <Route path='/patient/dashboard' element={<PatienDashboard/>}/>
        </>
      )}
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

export default App;