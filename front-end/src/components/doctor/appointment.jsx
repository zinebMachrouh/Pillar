const Appointment = ({ appointment }) => {
    const formatDate = () => {
        const date = new Date(appointment.date);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${dayOfWeek} ${month} ${dayOfMonth} - ${time}`;
    };
    return (
        <div className="appt">
            <div className="appt-side"></div>
            <div className="appt-main">
                <div className="appt-top">
                    <div>
                        <span>Appointment date</span>
                        <h4><i className="fa-regular fa-clock"></i> {formatDate()}</h4>
                    </div>
                    <button type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button>
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
                    {
                        appointment.status === 1 && new Date(appointment.date) > new Date() ? (
                            <p className="cap upc">Upcoming</p>
                        ) : (
                            appointment.status === 1 && new Date(appointment.date) <= new Date() &&
                                new Date(appointment.date).getTime() >= new Date(new Date().getTime() - (60 * 60 * 1000)).getTime() ? (
                                <p className="cap in-pro">In Progress</p>
                            ) : (
                                <p className="cap exp">Expired</p>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Appointment;