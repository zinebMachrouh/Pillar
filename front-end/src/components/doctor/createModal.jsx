import  axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateModal = ({ patients, closeModal, appointment }) => {
    const [formData, setFormData] = useState({
        patient_id: '',
        date: '',
        notes: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    useEffect(() => { 
        if (appointment) {
            setFormData({
                patient_id: appointment.patient_id,
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
            await axios.post('http://127.0.0.1:8000/api/appointments', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });        }
        navigate('/doctor');
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
                            <label htmlFor="patient_id">Patient</label>
                            <select name="patient_id" id="patient_id" onChange={handleChange} >
                                <option value="" hidden>Select Patient</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>{patient.user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" name="date" id="date" value={formData.date} onChange={handleChange} />
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

export default CreateModal;