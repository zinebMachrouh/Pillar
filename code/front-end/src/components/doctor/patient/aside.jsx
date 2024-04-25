import { useNavigate } from "react-router-dom";
import Med from "./med";

const PatientAside = ({ medications, patient_id }) => {
    const navigate = useNavigate()
    
    const handleNavigate = () => { 
        navigate('/create/medication', { state: {patient_id: patient_id} });
    }
    return (
        <div className="aside">
            <div className="aside-header">
                <h2>All Medications</h2>
                <button type="button" onClick={handleNavigate}>+</button>
            </div>
            <div className="appts">
                {
                    medications.length === 0 ? (
                        <p>No Medications Found!</p>
                    ) : (
                        medications.map((med) => (
                            <Med key={med.id} med={med} patient_id={ patient_id} />
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default PatientAside;