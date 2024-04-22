import React, { createContext, useState, useEffect } from "react";
import { useNavigate, NavLink, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import Aside from "./aside";
import CreateModal from "./createModal";
import AddPatient from "./addModal";

export const MyContext = createContext();
const DoctorIndex = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const [state, setState] = useState({
        patients: [],
        appointments: [],
        checkups: [],
        pending: [],
        stats: {},
        user: {},
        searchTerm: '',
        showModal: false,
        openModal: false,
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/patients', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setState({
                patients: [...response.data.patients],
                user: response.data.user,
                stats: response.data.statistics,
                appointments: [...response.data.appointments],
                checkups: [...response.data.checkups],
                pending: [...response.data.pending]
            });
        } catch (error) {
            if (error.response && error.response.status === 500) {
                navigate('/login');
            } else {
                console.error('Error fetching patients:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    }
    const handleApprove = async (id) => {
        const response = await axios.patch(`http://127.0.0.1:8000/api/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        fetchData()
    }

    const handleSearch = async () => {
        if (state.searchTerm.trim() === '') {
            fetchData();
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/patients/search', {
                    query: state.searchTerm
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }); setState(prevState => ({
                    ...prevState,
                    patients: response.data.patients
                }));

            } catch (error) {
                console.error('Error searching patients:', error);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/refresh', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const newToken = response.data.authorisation.token;
                sessionStorage.setItem('token', newToken);
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        }, 1800000);

        return () => clearInterval(interval);
    }, [state.searchTerm]);

    useEffect(() => {
        handleSearch()
    }, [state.searchTerm])

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }, [navigate]);

    const handleLogout = async () => {
        sessionStorage.clear();
        navigate('/login');
    }

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
    const showModal = () => {
        setState(prevState => ({
            ...prevState,
            openModal: true
        }));
    };

    const shutModal = () => {
        setState(prevState => ({
            ...prevState,
            openModal: false
        }));
    };
    
    const handleRefresh = () => {
        window.location.reload();
    };

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
                    <button type="button" onClick={showModal}><i class="fa-solid fa-user-plus"></i></button>
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
                            <h4>Hi Dr. {state.user.name},</h4>
                            <h2>Welcome Back!</h2>
                        </div>
                        <div className="actions">
                            <Link to='/patient/create' className="create"><i className="fa-solid fa-plus"></i></Link>
                            <div className="search">
                                <input type="text" name="search" id="search" placeholder="Search Patients..." value={state.searchTerm}
                                    onChange={(e) => setState(prevState => ({ ...prevState, searchTerm: e.target.value }))} />
                                <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="reminder"></div>
                    <MyContext.Provider value={{ user: state.user, patients: state.patients, checkups: state.checkups, appointments: state.appointments, pending: state.pending, handleDelete: handleDelete, handleApprove: handleApprove }}>
                        <Outlet />
                    </MyContext.Provider>
                </div>
                <Aside appointments={state.appointments} patients={state.patients} openModal={openModal} handleDelete={handleDelete} />
            </div>
            <button type="button" className="refresh" onClick={handleRefresh}><i class="fa-solid fa-rotate"></i></button>
            {state.showModal && <CreateModal patients={state.patients} closeModal={closeModal} />}
            {state.openModal && <AddPatient closeModal={shutModal} />}
        </div>
    );
}

export default DoctorIndex; 
