const Stats = ({patients,appointments,checkups}) => {
    const patientsCount = patients ? patients.length : 0;
    const appointmentsCount = appointments ? appointments.length : 0;
    const checkupsCount = checkups ? checkups.length : 0;

    return (
        <div className="stats">
            <div className="stat">
                <h4>{patientsCount}</h4>
                <span>Patients</span>
            </div>
            <div className="stat">
                <h4>{appointmentsCount}</h4>
                <span>Appointments</span>
            </div>
            <div className="stat">
                <h4>{checkupsCount}</h4>
                <span>Checkups</span>
            </div>
        </div>
    );
}
 
export default Stats;