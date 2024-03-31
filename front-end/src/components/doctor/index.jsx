import { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

const DoctorIndex = () => {
    const [patients, setPatients] = useState([]);
    const [stats, setStats] = useState({});
    const [user, setUser] = useState({});
    const token = sessionStorage.getItem('token');

    const navigate = useNavigate();
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }, []);
    const getPatients = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/patients', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setPatients([...response.data.patients])
            setUser(response.data.user);
            setStats(response.data.statistics)
            console.log(response)
        } catch (error) {
            if (error.response && error.response.status === 500) {
                navigate('/login');
            } else {
                console.error('Error fetching patients:', error);
            }
        }
    }

    const handleLogout = async () => {
        // await axios.post('http://127.0.0.1:8000/api/logout');
        sessionStorage.clear();
        navigate('/login')
        console.log()
    }

    useEffect(() => {
        getPatients()
        console.log(patients)
    }, []);

    useEffect(() => {

    }, [token]);
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="brand">
                    <img src="/public/light-icon.png" alt="icon" />
                </div>
                <nav>
                    <NavLink to='/doctor/patients' end><i className="fa-solid fa-house"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-comments"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-heart-pulse"></i></NavLink>
                    <NavLink to='/'><i className="fa-solid fa-chart-pie"></i></NavLink>
                    <hr />
                    <NavLink to='/'><i className="fa-solid fa-gear"></i></NavLink>
                    <button className='logout' onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                </nav>
            </div>
            <div className="article">
                <div className="main">
                    <div className="header">
                        <div className="text">
                            <h4>Hi {user.name},</h4>
                            <h2>Welcome Back!</h2>
                        </div>
                        <div className="actions">
                            <Link to='/patient/create' className="create"><i class="fa-solid fa-plus"></i></Link>
                            <div className="search">
                                <input type="text" name="search" id="search" placeholder="Search..." />
                                <button type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="reminder"></div>
                    <div className="statistics">
                        <h2>My Patients</h2>
                        <div className="stats">
                            {Object.entries(stats).map(([key, value], index) => (
                                <div className="stat" key={index}>
                                    <h4>{value}</h4>
                                    <span>{key}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="patients">
                        {
                            patients.map((patient) => (
                                <div className="patient">
                                    {patient.gender === 'male' ? (
                                        <div className="card-top">
                                            <i className="fa-solid fa-mars" style={{ color: "#3498DB" }} ></i>
                                            <h4>{patient.name}</h4>
                                        </div>
                                    ) : (
                                        <div className="card-top">
                                            <i className="fa-solid fa-venus" style={{ color: "#ec4ba9" }} ></i>
                                            <h4>{patient.name}</h4>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <span>{patient.email}</span>
                                        <h4>Contact Information</h4>
                                        <ul>
                                            <li><strong>Number:</strong> {patient.user.phone_number}</li>
                                        </ul>
                                        <h4>Emergency Contact</h4>
                                        <ul>
                                            <li><strong>Name:</strong> {patient.emergency_contact_name}</li>
                                            <li><strong>Number:</strong> {patient.emergency_contact_number}</li>
                                        </ul>
                                        <button type="button">View Details</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="aside"></div>
            </div>
        </div>
    );
}

export default DoctorIndex;