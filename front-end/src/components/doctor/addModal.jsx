import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddPatient = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        cin: '',
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        await axios.post('http://127.0.0.1:8000/api/patients/attach', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        closeModal()
        navigate('/doctor');
    }
    return (
        <div className="modal">
            <div className="modal-content" style={{height:'fit-content'}}>
                <div className="modal-top">
                    <h2>Add Patient</h2>
                    <h4 className="close" onClick={closeModal}><i className="fa-solid fa-xmark"></i></h4>
                </div>
                <div className="modal-body">
                    <form className="createModal" onSubmit={handleSubmit} method="post">
                        <div className="input-group">
                            <label htmlFor="cin">CIN</label>
                            <input type="text" name="cin" id="cin" value={formData.cin} onChange={handleChange} placeholder="Enter CIN"/>
                        </div>
                        <button type="submit">Add Patient</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPatient;