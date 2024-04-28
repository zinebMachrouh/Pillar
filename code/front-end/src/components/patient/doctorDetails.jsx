
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import PatientAside from "./aside";
import Appointment from "./appointment";
import PatientInfo from "./info";
import MedPatient from "./med";
import DoctorInfo from "./docInfo";

const DoctorDetails = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [state, setState] = useState({
        medications: [],
        appointments: [],
        checkups: [],
    })

    const token = sessionStorage.getItem('token');

    const { patient, doctor, doctors } = location.state;

    const handleLogout = async () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/patients/${patient.id}/${doctor.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            setState({
                medications: [...response.data.medications],
                appointments: [...response.data.appointments],
                checkups: [...response.data.checkups],
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(patient)
        fetchData()
    }, [])


    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="brand">
                    <img src="/public/light-icon.png" alt="icon" />
                </div>
                <nav>
                    <NavLink to='/patient' end><i className="fa-solid fa-house"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-bell"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-heart-pulse"></i></NavLink>
                    <NavLink to='/patient/requests'><i className="fa-solid fa-calendar-days"></i></NavLink>
                    <hr />
                    <NavLink to='/'><i className="fa-solid fa-gear"></i></NavLink>
                    <button className='logout' onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                </nav>
            </div>
            <div className="article">
                <div className="main">
                    <div className="header">
                        <div className="text">
                            <h4>Hi {sessionStorage.getItem('name')},</h4>
                            <h2>Welcome Back!</h2>
                        </div>
                        <div className="actions">
                            <Link to='/patient/create' className="create"><i className="fa-solid fa-plus"></i></Link>
                            <div className="search">
                                <input type="text" name="search" id="search" placeholder="Search Doctors..." />
                                <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="reminder">
                        {patient && (
                            <DoctorInfo doctor={doctor} checksCount={state.checkups.length} apptsCount={state.appointments.length} />
                        )}
                    </div>
                    <div className="stat" style={{ marginTop: '20px' }}>
                        <h2>All Appointments</h2>
                    </div>
                    <div className="p-appts">
                        {
                            (state.appointments.length === 0) ?
                                ('No appointments Found')
                                :
                                (state.appointments.map((appt) => (
                                    <Appointment key={appt.id} appointment={appt}  />
                                )))
                        }
                    </div>

                </div>
                <div className="aside">
                    <div className="stat">
                        <h2>All Medications</h2>
                    </div>
                    {
                        (state.medications.length === 0) ?
                            ('No medications Found')
                            :
                            (state.medications.map((med) => (
                                <MedPatient key={med.id} med={med} />
                            )))
                    }
                </div>
            </div>
        </div>
    );

}
 
export default DoctorDetails;