import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateModal from "./createModal";

const Appointment = ({ appointment, handleDelete, patients }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const formatDate = () => {
        const date = new Date(appointment.date);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${dayOfWeek} ${month} ${dayOfMonth} - ${time}`;
    };
    function getAppointmentStatus() {
        const currentDate = new Date();
        const oneHourAgo = new Date(currentDate.getTime() - 60 * 60 * 1000);
        const appointmentDate = new Date(appointment.date);

        if (appointment.status === 1 && appointmentDate > currentDate) {
            return { label: "Upcoming", className: "cap upc" };
        } else if (appointment.status === 1 && appointmentDate <= currentDate && appointmentDate >= oneHourAgo) {
            return { label: "In Progress", className: "cap in-pro" };
        } else {
            return { label: "Overdue", className: "cap exp" };
        }
    }
    const status = getAppointmentStatus();

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/create/checkup', { state: { appointment_id: appointment.id, patient_id: appointment.patient.id, checkup: appointment.checkup } });
    };
    const handleDetails = () => { 
        if (appointment.checkup) {
            navigate('/appointment', { state: { appointment: appointment, patient: appointment.patient, checkup: appointment.checkup } });   
        } else {
            handleNavigate();
        }
    }
    return (
        <div className="appt">
            <div className="appt-side"></div>
            <div className="appt-main">
                <div className="appt-top">
                    <div>
                        <span>Appointment date</span>
                        <h4><i className="fa-regular fa-clock"></i> {formatDate()}</h4>
                    </div>
                    <div className="pop">
                        <button type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        {
                            (status.label === 'Upcoming') ? (
                                <div className="details">
                                    <span onClick={openModal}>Modify</span>
                                    <span onClick={()=>handleDelete(appointment.id)}>Delete</span>
                                </div>
                            ) : ((status.label === 'In Progress') ? (
                                <div className="details">
                                    <span onClick={handleNavigate}>Checkup</span>
                                </div>
                            ) : (
                                <div className="details">
                                    <span onClick={handleDetails}>Details</span>
                                    <span onClick={handleNavigate}>Checkup</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="appt-body">
                    <div>
                        {appointment.patient.gender === 'male' ? (
                            <div className="card-top">
                                <i className="fa-solid fa-mars" style={{ color: "#3498DB" }} ></i>
                                <h4>{appointment.patient.user.name}</h4>
                            </div>
                        ) : (
                            <div className="card-top">
                                <i className="fa-solid fa-venus" style={{ color: "#ec4ba9" }} ></i>
                                <h4>{appointment.patient.user.name}</h4>
                            </div>
                        )}
                        <p>{appointment.patient.user.email}</p>
                    </div>
                    <p className={status.className}>{status.label}</p>
                </div>
            </div>
            {showModal && <CreateModal patients={patients} closeModal={closeModal} appointment={appointment} />}

        </div>
    );
}

export default Appointment;