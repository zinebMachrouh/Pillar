import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorIndex = () => {
    const [patients, setPatients] = useState([]);

   

    const getPatients = async () => {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://127.0.0.1:8000/api/patients', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        setPatients([...response.data.patients])
    }
    useEffect(() => {
        getPatients()
        console.log(patients)
    }, []);
    return (
        <div className="dashboard">
            <div className="sidebar"></div>
            <div className="article">
                <h4>hello</h4>
            </div>
        </div>
    );
}

export default DoctorIndex;