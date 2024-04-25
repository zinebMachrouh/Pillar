import Appointment from "./appointment";

const AsidePatient = ({appointments, doctors, openModal}) => {
    return (  
        <div className="aside">
            <div className="aside-header">
                <h2>All Appointments</h2>
                <button type="button" title="Add Appointment" onClick={openModal}>+</button>
            </div>
            <div className="appts">
                {
                    appointments.length === 0 ? (
                        <p>No Appointments Found!</p>
                    ) : (appointments.sort((a, b) => {
                        if (a.status === 1 && new Date(a.date) <= new Date() &&
                            new Date(a.date).getTime() >= new Date(new Date().getTime() - (60 * 60 * 1000)).getTime()) {
                            return -1;
                        } else if (a.status === 1 && new Date(a.date) > new Date()) {
                            return a.date.localeCompare(b.date);
                        } else {
                            return 1;
                        }
                    }).map((appt) => (
                        <Appointment key={appt.id} appointment={appt}/>
                    )))
                }
            </div>
        </div>
    );
}
 
export default AsidePatient;