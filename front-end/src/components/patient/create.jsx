import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateAppointment = ({ doctors, closeModal, appointment }) => {
    const [formData, setFormData] = useState({
        doctor_id: '',
        date: '',
        notes: ''
    })
    const [tomorrow, setTomorrow] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1); 
        currentDate.setHours(7, 0, 0, 0); 
        const isoDateTime = currentDate.toISOString().slice(0, 16); 
        setTomorrow(isoDateTime);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (appointment) {
            setFormData({
                doctor_id: appointment.doctor_id,
                date: appointment.date,
                notes: appointment.notes,
            });
        }
    }, [appointment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        if (appointment) {
            await axios.put(`http://127.0.0.1:8000/api/appointments/${appointment.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        }
        else {
            await axios.post('http://127.0.0.1:8000/api/appointment/create', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        }
        navigate('/patient/requests');
        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-top">
                    <h2>{appointment ? 'Edit Appointment' : 'Create Appointment'}</h2>
                    <h4 className="close" onClick={closeModal}><i className="fa-solid fa-xmark"></i></h4>
                </div>
                <div className="modal-body">
                    <form className="createModal" onSubmit={handleSubmit} method="post">
                        <div className="input-group">
                            <label htmlFor="doctor_id">Doctors</label>
                            <select name="doctor_id" id="doctor_id" onChange={handleChange} >
                                <option value="" hidden>Select doctor</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" name="date" id="date" value={formData.date} onChange={handleChange} min={tomorrow} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="notes">Notes</label>
                            <textarea name="notes" id="notes" rows="6" value={formData.notes} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit">{appointment ? 'Save Changes' : 'Create Appointment'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAppointment;