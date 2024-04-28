import axios from "axios";
import { useNavigate } from "react-router-dom";

const Med = ({ med, patient_id }) => {
    const formatDate = () => {
        const date = new Date(med.prescription_date);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${dayOfWeek} ${month} ${dayOfMonth} - ${time}`;
    };

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/create/medication', { state: { patient_id: patient_id, med: med } });
    }

    const handleDelete = async () => {
        const token = sessionStorage.getItem('token');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/medications/${med.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            navigate('/doctor');
        } catch (error) {
            alert('Error deleting medication')
        }

    }
    return (
        <div className="appt">
            <div className="appt-side" style={{ backgroundColor: '#2ECC71' }}></div>
            <div className="appt-main">
                <div className="appt-top">
                    <div>
                        <span>Prescription date</span>
                        <h4>{formatDate()}</h4>
                    </div>
                    <div className="pop">
                        <button type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        <div className="details">
                            <span onClick={handleNavigate}>Modify</span>
                            <span onClick={()=>handleDelete()}>Delete</span>
                        </div>
                    </div>
                </div>
                <div className="appt-body">
                    <div className="card-top">
                        <i class="fa-solid fa-tablets" style={{ color: '#2ECC71' }}></i>
                        <h4>{med.name}</h4>
                    </div>
                    <p>{med.dosage}/{med.frequency}</p>
                </div>
                <p className=''>{med.notes}</p>
            </div>
        </div>
    );
}

export default Med;