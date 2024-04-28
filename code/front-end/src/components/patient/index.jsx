import React, { createContext, useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import PatientInfo from "./info";
import AsidePatient from "./aside";
import CreateAppointment from "./create";

export const MyContext = createContext();
const PatienDashboard = () => {
    const [state, setState] = useState({
        checkups: [],
        appointments: [],
        doctors: [],
        pending: [],
        searchTerm: '',
        patient: {},
        showModal: false,
    })

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const handleLogout = async () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/patient', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        setState({
            patient: response.data.patient,
            appointments: [...response.data.appointments],
            checkups: [...response.data.checkups],
            pending: [...response.data.pending],
            doctors: [...response.data.doctors],
        });
        console.log(response.data);
    }

    const handleSearch = async () => {
        if (state.searchTerm.trim() === '') {
            fetchData();
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/doctors/search', {
                    query: state.searchTerm
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }); setState(prevState => ({
                    ...prevState,
                    doctors: response.data.doctors
                }));
            } catch (error) {
                console.error('Error searching doctors:', error);
            }
        }
    };

    useEffect(() => {
        handleSearch()
    }, [state.searchTerm])

    useEffect(() => {
        fetchData()
    }, [])

    const openModal = () => {
        setState(prevState => ({
            ...prevState,
            showModal: true
        }));
    };

    const closeModal = () => {
        setState(prevState => ({
            ...prevState,
            showModal: false
        }));
    };

    const resetPassword = async () => { 
        navigate('/resetPassword', { state: { email: state.patient.user.email } });
    }

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
                    <button type="button" onClick={resetPassword}><i className="fa-solid fa-gear"></i></button>
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
                            <div className="search">
                                <input type="text" name="search" id="search" placeholder="Search Doctors..." value={state.searchTerm}
                                    onChange={(e) => setState(prevState => ({ ...prevState, searchTerm: e.target.value }))} />
                                <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="reminder">
                        {state.patient.user && (
                            <PatientInfo patient={state.patient} checksCount={state.checkups.length} apptsCount={state.appointments.length} />
                        )}
                    </div>
                    <MyContext.Provider value={{ doctors: state.doctors, patient:state.patient, pending:state.pending, fetchData:fetchData}}>
                        <Outlet />
                    </MyContext.Provider>
                </div>
                <AsidePatient appointments={state.appointments} doctors={state.doctors} openModal={openModal} />
            </div>
            {state.showModal && <CreateAppointment doctors={state.doctors} closeModal={closeModal} />}
        </div>
    );
}

export default PatienDashboard; 
