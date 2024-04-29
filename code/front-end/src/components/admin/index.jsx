import { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import AsideAdmin from "./aside";

const AdminDashboard = () => {
    const token = sessionStorage.getItem('token');

    const [state, setState] = useState({
        patients: [],
        doctors: [],
        stats: {
            patients_count: 0,
            doctors_count: 0,
            active_patients_count: 0,
            active_doctors_count: 0,
            banned_patients_count: 0,
            banned_doctors_count: 0,
        },
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/index', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setState(prev => ({
                ...prev,
                patients: response.data.patients || [],
                doctors: response.data.doctors || [],
            }));
        } catch (error) {
            if (error.response && error.response.status === 500) {
                navigate('/login');
            } else {
                console.error('Error fetching patients:', error);
            }
        }
    }
    const fetchStats = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/viewstatistics', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setState(prev => ({
                ...prev,
                stats: response.data.statisctics || prev.stats,
            }));
        } catch (error) {
            if (error.response && error.response.status === 500) {
                navigate('/login');
            } else {
                console.error('Error fetching patients:', error);
            }
        }
    }

    const banPatient = async (patientId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/banpatient/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData();
            fetchStats();
        } catch (error) {
            alert('Error banning patient');
        }
    };

    const banDoctor = async (doctorId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/bandoctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData();
            fetchStats();
        } catch (error) {
            alert('Error banning doctor');
        }
    };

    const restorePatient = async (patientId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/restorepatient/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData();
            fetchStats();
        } catch (error) {
            alert('Error restoring patient');
        }
    };

    const restoreDoctor = async (doctorId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/restoredoctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData();
            fetchStats();
        } catch (error) {
            alert('Error restoring doctor');
        }
    };
    const navigate = useNavigate();
    const handleLogout = async () => {
        sessionStorage.clear();
        navigate('/login');
    }

    useEffect(() => {
        fetchData();
        fetchStats();
    }, [])
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="brand">
                    <img src="/public/light-icon.png" alt="icon" />
                </div>
                <nav>
                    <NavLink to='/admin/dashboard' end><i className="fa-solid fa-house"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-comments"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-heart-pulse"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-chart-pie"></i></NavLink>
                    <hr />
                    <NavLink to='/resetPassword'><i className="fa-solid fa-gear"></i></NavLink>
                    <button className='logout' onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                </nav>
            </div>
            <div className="article">
                <div className="main">
                    <div className="header">
                        <div className="text">
                            <h4>Hello Adam Smith,</h4>
                            <h2>Welcome Back!</h2>
                        </div>
                        <div className="actions">
                            <div className="search">
                                <input type="text" name="search" id="search" placeholder="Search Patients..."
                                    onChange={(e) => setState(prevState => ({ ...prevState, searchTerm: e.target.value }))} />
                                <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="reminder" style={{height:'200px',color:'#fff',padding:'0px 70px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <h2>“Wellness is the complete integration of body, mind, and spirit – the realization that everything we do, think, feel, and believe has an effect on our state of well-being.”</h2>
                        <h4 style={{alignSelf:'flex-end',marginTop:'20px',paddingRight:'35px'}}>– Greg Anderson</h4>
                    </div>
                    <div className="statistics">
                        <h2>All Doctors</h2>
                        <div className="stats">

                            <div className="stat">
                                <h4>{state.stats.doctors_count}</h4>
                                <span>Doctors</span>
                            </div>
                            <div className="stat">
                                <h4>{state.stats.active_doctors_count}</h4>
                                <span>Active</span>
                            </div>
                            <div className="stat">
                                <h4>{state.stats.banned_doctors_count}</h4>
                                <span>Banned</span>
                            </div>
                        </div>
                    </div>
                    <div className="patients">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Doctor</th>
                                    <th>Email</th>
                                    <th>Speciality</th>
                                    <th>License Number</th>
                                    <th>Hospital Affiliation</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {state.doctors.length === 0 ? (
                                    <p>No Doctors found!</p>
                                ) : (state.doctors.map((doctor) => (
                                    <tr>
                                        <td>{doctor.doctor.gender === 'male' ? (
                                            <i className="fa-solid fa-mars" style={{ color: "#3498DB" }} ></i>

                                        ) : (
                                            <i className="fa-solid fa-venus" style={{ color: "#ec4ba9" }} ></i>

                                        )}</td>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.email}</td>
                                        <td>{doctor.doctor.speciality}</td>
                                        <td>{doctor.doctor.license_number}</td>
                                        <td>{doctor.doctor.hospital_affiliation}</td>
                                        {(!doctor.deleted_at) ? (
                                            <td className="ban"><button type="button" title="ban" onClick={() => banDoctor(doctor.id)}><i className="fa-solid fa-ban"></i></button></td>
                                        ) : (
                                            <td className="restore"><button type="button" title="restore" onClick={() => restoreDoctor(doctor.id)}><i className="fa-solid fa-arrows-rotate"></i></button></td>
                                        )}
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <AsideAdmin stats={state.stats} patients={state.patients} banPatient={banPatient} restorePatient={ restorePatient} />
            </div>
        </div>
    );
}

export default AdminDashboard;