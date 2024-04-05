import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        gender: '',
        birthday: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_number: '',
        insurance_provider: '',
        insurance_policy_number: '',
        last_visit: '',
        medical_history: '',
        allergies: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        const response = await axios.post('http://127.0.0.1:8000/api/patient/store', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        window.location.href = `/doctor/patients`;

    };

    return (
        <div id="login-body">
            <Link to='/doctor/patients' className="back">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div className="form-container" id='createP'>
                <h2 className="title" style={{ color: '#3498DB' }}>Create Patient</h2>
                <form onSubmit={handleSubmit} className="doctor-create" style={{ marginTop: '15px' }}>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" onChange={handleChange}>
                                <option value="" hidden>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone_number">Phone Number</label>
                            <input type="number" name="phone_number" id="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Enter Phone Number" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" />
                    </div>

                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="birthday">Birthday</label>
                            <input type="date" name="birthday" id="birthday" value={formData.birthday} onChange={handleChange} placeholder="Enter Birthday" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="last_visit">Last Visit</label>
                            <input type="date" name="last_visit" id="last_visit" value={formData.last_visit} onChange={handleChange} placeholder="Enter Last Visit" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="medical_history">Medical History</label>
                        <input type="text" name="medical_history" id="medical_history" value={formData.medical_history} onChange={handleChange} placeholder="Enter Medical History" />
                    </div>

                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="emergency_contact_name">Emergency Contact Name</label>
                            <input type="text" name="emergency_contact_name" id="emergency_contact_name" value={formData.emergency_contact_name} onChange={handleChange} placeholder="Contact Name" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="emergency_contact_number">Emergency Contact Number</label>
                            <input type="number" name="emergency_contact_number" id="emergency_contact_number" value={formData.emergency_contact_number} onChange={handleChange} placeholder="Contact Number" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="allergies">Allergies</label>
                        <input type="text" name="allergies" id="allergies" value={formData.allergies} onChange={handleChange} placeholder="Enter Allergies" />
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="insurance_provider">Insurance Provider</label>
                            <input type="text" name="insurance_provider" id="insurance_provider" value={formData.insurance_provider} onChange={handleChange} placeholder="Enter Insurance Provider" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="insurance_policy_number">Insurance Number</label>
                            <input type="number" name="insurance_policy_number" id="insurance_policy_number" value={formData.insurance_policy_number} onChange={handleChange} placeholder="Enter Insurance Number" />
                        </div>
                    </div>
                    <button type="submit" className="sign">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default PatientCreate;