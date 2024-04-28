import { useNavigate } from "react-router-dom";

const DoctorInfo = ({ doctor, checksCount, apptsCount }) => {
    const role = sessionStorage.getItem('role');
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/modify/user', { state: { user: doctor } })
    }
    return (
        <div className="content">
            <div className="rem-right">
                <h2>{doctor.user.name}</h2>
                <h4 className="email">{doctor.user.email}</h4>
                <div className="rem-stats">
                    <div className="rem-stat">
                        <h4>{apptsCount}</h4>
                        <span>Appointments</span>
                    </div>
                    <div className="rem-stat">
                        <h4>{checksCount}</h4>
                        <span>Checkups</span>
                    </div>
                </div>
            </div>
            <div className="rem-left">
                <div className="rem-top">
                    <div className="rem-mini">
                        <p>Gender</p>
                        <span>{doctor.gender}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Speciality</p>
                        <span>{doctor.speciality}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Address</p>
                        <span>{(doctor.address) ? (doctor.address) : ('-')}</span>
                    </div>
                    <div className="rem-mini">
                        <p>LicenseNumber</p>
                        <span>{doctor.license_number}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Hospital</p>
                        <span>{doctor.hospital_affiliation}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Qualifications</p>
                        <span>{doctor.qualifications}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Experience</p>
                        <span>{doctor.experience}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Working Hours</p>
                        <span>{doctor.working_hours}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Appointment Fee</p>
                        <span>{doctor.appointment_fee} Dhs</span>
                    </div>

                </div>
                <div className="rem-btm">
                    <span><strong>About:</strong> {(doctor.about) ? (doctor.about) : ('-')}</span>
                </div>
            </div>
        </div>
    );
}

export default DoctorInfo;