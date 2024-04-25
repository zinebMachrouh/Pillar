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
import MainContent from './components/patient/main';
import PatientRequests from './components/patient/requests';
import DoctorDetails from './components/patient/doctorDetails';
import ModifyInfo from './components/modifyInfo';

const App = () => {
  const token = sessionStorage.getItem('token');
  let role = sessionStorage.getItem('role');
  if (token) {
    const decoded = jwtDecode(token);
    const { role_id , name} = decoded;
    sessionStorage.setItem('role', role_id);
    sessionStorage.setItem('name', name);
  }
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/appointment' element={<Details />} />
      <Route path='/modify/user' element={<ModifyInfo/>} />
      {token ? (
        <>
          {role === '1' && (
            <Route path='/admin' element={<AdminDashboard />} />
          )}
          {role === '2' && (
            <>
              <Route path='/doctor/create' element={<DoctorCreate />} />

              <Route path='/doctor' element={<DoctorIndex />} >
                <Route index path='' element={<Main />} />
                <Route path='/doctor/requests' element={<AppRequests />} />
              </Route>

              <Route path='/patient/create' element={<PatientCreate />} />
              <Route path='/create/checkup' element={<Checkup />} />
              <Route path='/patient/details' element={<PatientDetails />} />
              <Route path='/create/medication' element={<CreateMed />} />
            </>
          )}
          {role === '3' && (
            <>
              <Route path='/patient' element={<PatienDashboard />} >
                <Route index path='' element={<MainContent />} />
                <Route path='/patient/requests' element={<PatientRequests />} />
              </Route>
              <Route path='/doctor/details' element={<DoctorDetails />} />
            </>
          )}
        </>
      ) : (
        <Route path='/login' element={<Login />} />
      )}
      <Route path='*' element={<Page404 />} />

    </Routes>
  );
}

export default App;