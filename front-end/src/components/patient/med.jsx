const MedPatient = ({ med }) => {
    const formatDate = () => {
        const date = new Date(med.prescription_date);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${dayOfWeek} ${month} ${dayOfMonth} - ${time}`;
    };

    return (
        <div className="appt">
            <div className="appt-side" style={{ backgroundColor: '#2ECC71' }}></div>
            <div className="appt-main">
                <div className="appt-top">
                    <div>
                        <span>Prescription date</span>
                        <h4>{formatDate()}</h4>
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

export default MedPatient;