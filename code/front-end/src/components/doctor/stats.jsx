const Stats = ({patients,appointments,checkups}) => {
    const patientsCount = patients ? patients.length : 0;

    return (
        <div className="stats">
            <div className="stat">
                <h4>{patientsCount}</h4>
                <span>Patients</span>
            </div>
        </div>
    );
}
 
export default Stats;