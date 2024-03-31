import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientCreate = () => {
    const [formData, setFormData] = useState({
        gender: '',
        address: '',
        speciality: '',
        qualifications: '',
        license_number: '',
        hospital_affiliation: '',
        experience: '',
        availability: '',
        working_hours: '',
        appointment_fee: '',
        about: ''
    });
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }, []);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        const response = await axios.post('http://127.0.0.1:8000/api/doctors/create', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        window.location.href = `/${response.data.redirect}`;

    };

    return (
        <div id="login-body">
            <div className="form-container">
                <h2 className="title" style={{ color: '#3498DB' }}>Complete Profile</h2>
                <form onSubmit={handleSubmit} className="doctor-create" style={{ marginTop: '15px' }}>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" onChange={handleChange}>
                                <option value="" hidden>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="speciality">Speciality</label>
                            <input type="text" name="speciality" id="speciality" value={formData.speciality} onChange={handleChange} placeholder="Enter Speciality" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="qualifications">Qualifications</label>
                        <input type="text" name="qualifications" id="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="Enter Qualifications" />
                    </div>

                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="license_number">License Number</label>
                            <input type="text" name="license_number" id="license_number" value={formData.license_number} onChange={handleChange} placeholder="Enter License Number" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="hospital_affiliation">Hospital Affiliation</label>
                            <input type="text" name="hospital_affiliation" id="hospital_affiliation" value={formData.hospital_affiliation} onChange={handleChange} placeholder="Enter Hospital Affiliation" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="experience">Experience</label>
                        <input type="number" name="experience" id="experience" value={formData.experience} onChange={handleChange} placeholder="Enter Experience" />
                    </div>

                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="working_hours">Working Hours</label>
                            <input type="text" name="working_hours" id="working_hours" value={formData.working_hours} onChange={handleChange} placeholder="Enter Working Hours" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="appointment_fee">Appointment Fee</label>
                            <input type="number" name="appointment_fee" id="appointment_fee" value={formData.appointment_fee} onChange={handleChange} placeholder="Price in MAD" />
                        </div>
                    </div>

                    <button type="submit" className="sign">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default PatientCreate;