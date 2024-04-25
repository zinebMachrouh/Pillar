const AsideAdmin = ({ stats, patients, banPatient, restorePatient }) => {
    return (
        <div className="aside">
            <div className="aside-header-admin">
                <div className="mac">
                    <h2>All Patients</h2>
                    <div className="notif">
                        <i class="fa-regular fa-bell"></i>
                    </div>
                </div>
                <div className="stats">
                    <div className="stat">
                        <h4>{stats.patients_count}</h4>
                        <span>Patients</span>
                    </div>
                    <div className="stat">
                        <h4>{stats.active_patients_count}</h4>
                        <span>Active</span>
                    </div>
                    <div className="stat">
                        <h4>{stats.banned_patients_count}</h4>
                        <span>Banned</span>
                    </div>
                </div>
            </div>
            <div className="aside-patients">
                {patients.length === 0 ? (
                    <p>No Patients found!</p>
                ) : (patients.map((patient) => (
                    <div className="aside-patient">
                        <div className="patient-content">
                            {patient.patient.gender === 'male' ? (
                                <div className="patient-top">
                                    <i className="fa-solid fa-mars" style={{ color: "#3498DB" }} ></i>
                                    <h4>{patient.name}</h4>
                                </div>

                            ) : (
                                <div className="patient-top">
                                    <i className="fa-solid fa-venus" style={{ color: "#ec4ba9" }} ></i>
                                    <h4>{patient.name}</h4>
                                </div>
                            )}
                            <span>{patient.email}</span>
                        </div>
                        {(!patient.deleted_at) ? (
                            <div className="patient-ban"><button type="button" title="ban" onClick={() => banPatient(patient.id)}><i className="fa-solid fa-ban"></i></button></div>
                        ) : (
                            <div className="patient-restore"><button type="button" title="restore" onClick={() => restorePatient(patient.id)}><i className="fa-solid fa-arrows-rotate"></i></button></div>
                        )}
                    </div>
                )))}

            </div>
        </div >
    );
}

export default AsideAdmin;