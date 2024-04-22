import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CreateMed = () => {
    const location = useLocation();
    const { patient_id , med} = location.state;

    const [formData, setFormData] = useState({
        patient_id: patient_id,
        name: '',
        dosage: '',
        frequency: '',
        prescription_date: new Date().toISOString().slice(0, 16),
        notes: '',
    });

    const navigate = useNavigate();
    useEffect(() => {
        if (med) {
            setFormData({
                patient_id: med.patient_id || patient_id,
                name: med.name || '',
                dosage: med.dosage || '',
                frequency: med.frequency || '',
                prescription_date: med.prescription_date || new Date().toISOString().slice(0, 16),
                notes: med.notes || '',
            });
        }
    }, [med, patient_id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        if (med) {
            await axios.put(`http://127.0.0.1:8000/api/medications/${med.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        } else {
            await axios.post('http://127.0.0.1:8000/api/medications', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        }
        navigate('/doctor');
    };
    return (  
        <div className="details-body" id="login-body">
            <Link to='/doctor' className="back">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div className="form-container" id="createP">
                <h2 className="title" style={{ color: '#3498DB' }}>
                    {med ? 'Edit Medicine' : 'Create Medicine'}
                </h2>
                <form onSubmit={handleSubmit} className="doctor-create" style={{ marginTop: '15px' }}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="dosage">Dosage</label>
                        <input
                            type="text"
                            name="dosage"
                            id="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            placeholder="Enter Dosage"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="frequency">Frequency</label>
                        <input
                            type="text"
                            name="frequency"
                            id="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            placeholder="Enter Frequency"
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
                    <button type="submit" className="check-btn">{med ? 'Save Changes' : 'Create Medicine'}</button>

                </form>
            </div>
        </div>
    );
}
 
export default CreateMed;