import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

const ModifyInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;
    const userRole = user.user.role_id;

    const [userData, setUserData] = useState({
        name: '' || user.user.name,
        email: '' || user.user.email,
        cin: '' || user.user.cin,
        phone_number: '' || user.user.phone_number,
    });

    const [patientData, setPatientData] = useState({
        ...userData,
        gender: '' || user.gender,
        birthday: '' || user.birthday,
        address: '' || user.address,
        emergency_contact_name: '' || user.emergency_contact_name,
        emergency_contact_number: '' || user.emergency_contact_number,
        insurance_provider: '' || user.insurance_provider,
        insurance_policy_number: '' || user.insurance_policy_number,
        allergies: '' || user.allergies,
    })

    const [doctorData, setDoctorData] = useState({
        ...userData,
        gender: '' || user.gender,
        address: '' || user.address,
        speciality: '' || user.speciality,
        qualifications: '' || user.qualifications,
        license_number: '' || user.license_number,
        hospital_affiliation: '' || user.hospital_affiliation,
        experience: '' || user.experience,
        working_hours: '' || user.working_hours,
        appointment_fee: '' || user.appointment_fee,
        about: '' || user.about,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (userRole === 1) {
            setUserData({ ...userData, [name]: value });
        } else if (userRole === 3) {
            setPatientData({ ...patientData, [name]: value });
            setUserData({ ...userData, [name]: value });
        } else if (userRole === 2) {
            setDoctorData({ ...doctorData, [name]: value });
            setUserData({ ...userData, [name]: value });
        }
    };
    console.log(user.user.id)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        let dataToUpdate;
        let endpoint;

        switch (userRole) {
            case 1:
                dataToUpdate = userData;
                endpoint = 'admin';
                break;
            case 2:
                dataToUpdate = doctorData;
                endpoint = 'doctor';
                break;
            case 3:
                dataToUpdate = patientData;
                endpoint = 'patient';
                break;
            default:
                return;
        }

        await axios.put(`http://127.0.0.1:8000/api/${endpoint}/update/${user.user.id}`, dataToUpdate, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        navigate(`/${sessionStorage.getItem('redirect')}`);
    };

    const renderFields = () => {
        if (userRole === 3) {
            return (
                <div className="left-update">
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" onChange={handleChange}>
                                <option value={patientData.gender} selected hidden>{_.capitalize(patientData.gender)}</option>
                                <option value="" hidden>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" id="address" value={patientData.address} onChange={handleChange} placeholder="Enter Address" />
                        </div>
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="birthday">Birthday</label>
                            <input type="date" name="birthday" id="birthday" value={patientData.birthday} onChange={handleChange} placeholder="Enter Birthday" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="allergies">Allergies</label>
                            <input type="text" name="allergies" id="allergies" value={patientData.allergies} onChange={handleChange} placeholder="Enter Allergies" />
                        </div>
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="emergency_contact_name">Emergency Name</label>
                            <input type="text" name="emergency_contact_name" id="emergency_contact_name" value={patientData.emergency_contact_name} onChange={handleChange} placeholder="Contact Name" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="emergency_contact_number">Emergency Number</label>
                            <input type="number" name="emergency_contact_number" id="emergency_contact_number" value={patientData.emergency_contact_number} onChange={handleChange} placeholder="Contact Number" />
                        </div>
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="insurance_provider">Insurance Provider</label>
                            <input type="text" name="insurance_provider" id="insurance_provider" value={patientData.insurance_provider} onChange={handleChange} placeholder="Enter Insurance Provider" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="insurance_policy_number">Insurance Number</label>
                            <input type="number" name="insurance_policy_number" id="insurance_policy_number" value={patientData.insurance_policy_number} onChange={handleChange} placeholder="Enter Insurance Number" />
                        </div>
                    </div>
                </div>
            );
        } else if (userRole === 2) {
            return (
                <div className="left-update">
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" onChange={handleChange}>
                                <option value="" hidden>Select Gender</option>
                                <option value={doctorData.gender} hidden selected>{doctorData.gender}</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="speciality">Speciality</label>
                            <input type="text" name="speciality" id="speciality" value={doctorData.speciality} onChange={handleChange} placeholder="Enter Speciality" />
                        </div>
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="license_number">License Number</label>
                            <input type="text" name="license_number" id="license_number" value={doctorData.license_number} onChange={handleChange} placeholder="Enter License Number" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="hospital_affiliation">Hospital Affiliation</label>
                            <input type="text" name="hospital_affiliation" id="hospital_affiliation" value={doctorData.hospital_affiliation} onChange={handleChange} placeholder="Enter Hospital Affiliation" />
                        </div>
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="qualifications">Qualifications</label>
                            <input type="text" name="qualifications" id="qualifications" value={doctorData.qualifications} onChange={handleChange} placeholder="Enter Qualifications" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="experience">Experience</label>
                            <input type="number" name="experience" id="experience" value={doctorData.experience} onChange={handleChange} placeholder="Enter Experience" />
                        </div>
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="working_hours">Working Hours</label>
                            <input type="text" name="working_hours" id="working_hours" value={doctorData.working_hours} onChange={handleChange} placeholder="Enter Working Hours" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="appointment_fee">Appointment Fee</label>
                            <input type="number" name="appointment_fee" id="appointment_fee" value={doctorData.appointment_fee} onChange={handleChange} placeholder="Price in MAD" />
                        </div>
                    </div>
                    <div className="group">
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" id="address" value={doctorData.address} onChange={handleChange} placeholder="Enter Address" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="about">About</label>
                            <input type="text" name="about" id="about" value={doctorData.about} onChange={handleChange} placeholder="Tell Us About Yourself <3" />
                        </div>
                    </div>
                </div>
            );
        } else {
            return ('')
        }
    };

    return (
        <div className="details-body" id="login-body">
            <Link to={`/${sessionStorage.getItem('redirect')}`} className="back">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div className="form-container" id='createP'>
                <h2 className="title" style={{ color: '#3498DB' }}>Modify Information</h2>

                <form onSubmit={handleSubmit} className="doctor-create " style={{ marginTop: '15px' }}>
                    <div className="updateForm">
                        <div className="right-update">
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" value={userData.name} onChange={handleChange} placeholder="Enter Name" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={userData.email} onChange={handleChange} placeholder="Enter Email" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="cin">Cin</label>
                                <input type="text" name="cin" id="cin" value={userData.cin} onChange={handleChange} placeholder="Enter Cin" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="phone_number">Phone Number</label>
                                <input type="tel" name="phone_number" id="phone_number" value={userData.phone_number} onChange={handleChange} placeholder="Enter Phone Number" />
                            </div>
                        </div>
                        {renderFields()}

                    </div>
                    <button type="submit" className="updateBtn">Update Information</button>
                </form>
            </div>
        </div>
    );
}

export default ModifyInfo;