import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import PatientAside from "./aside";
import Content from "./content";
import Appointment from "../appointment";

const PatientDetails = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [state, setState] = useState({
        medications: [],
        appointments: [],
        checkups: [],
    })

    const token = sessionStorage.getItem('token');

    const { user, patient, patients } = location.state;

    const handleLogout = async () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/patients/${patient.id}`, {
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
    const handleDestroy = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchData();
        } catch (error) {
            alert('Error deleting appointment:');
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="brand">
                    <img src="/public/light-icon.png" alt="icon" />
                </div>
                <nav>
                    <NavLink to='/doctor' end><i className="fa-solid fa-house"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-comments"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-heart-pulse"></i></NavLink>
                    <NavLink to='/doctor/requests'><i className="fa-solid fa-calendar-days"></i></NavLink>
                    <hr />
                    <NavLink to='/'><i className="fa-solid fa-gear"></i></NavLink>
                    <button className='logout' onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                </nav>
            </div>
            <div className="article">
                <div className="main">
                    <div className="header">
                        <div className="text">
                            <h4>Hi Dr. {sessionStorage.getItem('name')},</h4>
                            <h2>Welcome Back!</h2>
                        </div>
                        <div className="actions">
                            <Link to='/patient/create' className="create"><i className="fa-solid fa-plus"></i></Link>
                            <div className="search">
                                <input type="text" name="search" id="search" placeholder="Search Patients..." />
                                <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="reminder">
                        <Content patient={patient} apptsCount={state.appointments.length} checksCount={state.checkups.length} />
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
                                    <Appointment key={appt.id} appointment={appt} handleDelete={handleDestroy} patients={patients} />
                                )))
                        }
                    </div>

                </div>
                <PatientAside medications={state.medications} patient_id={patient.id} />
            </div>
        </div>
    );
}

export default PatientDetails;