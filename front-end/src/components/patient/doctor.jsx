import { useNavigate } from "react-router-dom";

const Doctor = ({ doctor,patient ,doctors}) => {
    const navigate = useNavigate()

    const handleNavigate = () => { 
        navigate('/doctor/details', { state: { doctor: doctor, patient:patient , doctors:doctors} });
    }
    return (  
        <section>
            <div className="d-card">
                <div class="card-header">
                    <span class="title">{doctor.speciality}</span>
                    <span class="price text-trim" >{doctor.user.name}</span>
                </div>
                <p class="desc">{doctor.working_hours}</p>
                <ul class="lists">
                    <li className="list">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span>{doctor.qualifications}</span>
                    </li>
                    <li className="list">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span>Hospital: {doctor.hospital_affiliation}</span>
                    </li>
                    <li className="list">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span>Experience: {doctor.experience} Years</span>
                    </li>
                </ul>
                <div className="buttons">
                    <button type="button" class="action" onClick={handleNavigate}>View Details</button>
                    <h4 className="d-price">{doctor.appointment_fee} Dhs</h4>
                </div>
            </div>
        </section>
    );
}
 
export default Doctor;