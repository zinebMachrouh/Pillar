const AsideAdmin = ({stats,patients}) => {
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
            <div className="appts">
                
            </div>
        </div>
    );
}
 
export default AsideAdmin;