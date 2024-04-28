import { useEffect, useState } from "react";
import { Link , useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';
const Checkup = () => {
    const location = useLocation();
    const { appointment_id, patient_id,checkup} = location.state;
    const [formData, setFormData] = useState({
        patient_id: patient_id,
        symptoms: '',
        diagnosis: '',
        treatment_plan: '',
        follow_up_date: '',
        notes: '',
        appointment_id: appointment_id
    });
    
    const navigate = useNavigate();
    const [tomorrow, setTomorrow] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(7, 0, 0, 0);
        const isoDateTime = currentDate.toISOString().slice(0, 16);
        setTomorrow(isoDateTime);
    }, []);
    useEffect(() => {
        if (checkup) {
            setFormData({
                patient_id: checkup.patient_id || patient_id,
                symptoms: checkup.symptoms || '',
                diagnosis: checkup.diagnosis || '',
                treatment_plan: checkup.treatment_plan || '',
                follow_up_date: checkup.follow_up_date || '',
                notes: checkup.notes || '',
                appointment_id: checkup.appointment_id || appointment_id
            });
        }
    }, [checkup, patient_id, appointment_id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        if (checkup) {
            await axios.put(`http://127.0.0.1:8000/api/checkups/${checkup.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        } else {
            await axios.post('http://127.0.0.1:8000/api/checkups', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        }
        navigate('/doctor');
    };

    return (
        <div id="signup-body">
            <Link to='/doctor' className="back">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div className="form-container">
                <h2 className="title" style={{ color: '#3498DB' }}>{checkup ? 'Edit Checkup' : 'Create Checkup'}</h2>
                <form onSubmit={handleSubmit} className="doctor-create" style={{ marginTop: '15px' }}>
                    <div className="input-group">
                        <label htmlFor="symptoms">Symptoms</label>
                        <input
                            type="text"
                            name="symptoms"
                            id="symptoms"
                            value={formData.symptoms}
                            onChange={handleChange}
                            placeholder="Enter Symptoms"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="diagnosis">Diagnosis</label>
                        <input
                            type="text"
                            name="diagnosis"
                            id="diagnosis"
                            value={formData.diagnosis}
                            onChange={handleChange}
                            placeholder="Enter Diagnosis"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="treatment_plan">Treatment Plan</label>
                        <input
                            type="text"
                            name="treatment_plan"
                            id="treatment_plan"
                            value={formData.treatment_plan}
                            onChange={handleChange}
                            placeholder="Enter Treatment Plan"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="follow_up_date">Follow-up Date</label>
                        <input
                            type="datetime-local"
                            name="follow_up_date"
                            id="follow_up_date"
                            value={formData.follow_up_date}
                            onChange={handleChange}
                            min={tomorrow}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            name="notes"
                            id="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Enter Notes"
                        />
                    </div>
                    <button type="submit" className="check-btn">{checkup ? 'Save Changes' : 'Create Checkup'}</button>
                </form>
            </div>
        </div>
    );
}

export default Checkup;