import axios from 'axios';
import { MyContext } from "./index";
import React, { useContext } from 'react';

const PatientRequests = () => {
    const { pending, fetchData } = useContext(MyContext);
    const token = sessionStorage.getItem('token');

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

    const formatDate = (apptDate) => {
        const date = new Date(apptDate);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${dayOfWeek} ${month} ${dayOfMonth} - ${time}`;
    };

    return (
        <section>
            <div className="statistics">
                <h2>Appointment Requests</h2>
                <div className="stats">
                    <div className="stat">
                        <h4>{pending.length}</h4>
                        <span>Appointments</span>
                    </div>
                </div>
            </div>
            <table style={{ marginTop: '25px' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Doctor</th>
                        <th>Speciality</th>
                        <th>Hospital</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {pending.length === 0 ? (
                        <p>No Appointments found!</p>
                    ) : (pending.map((appt) => (
                        <tr>
                            <td>#</td>
                            <td>{appt.doctor.user.name}</td>
                            <td>{appt.doctor.speciality}</td>
                            <td>{appt.doctor.hospital_affiliation}</td>
                            <td>{formatDate(appt.date)}</td>
                            <td >
                                <button type="button" className='delete' onClick={()=>handleDelete(appt.id)}><i class="fa-solid fa-ban"></i></button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </section>
    );

}

export default PatientRequests;