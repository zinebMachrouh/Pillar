import { useContext } from "react";
import { MyContext } from "./index";
import Doctor from "./doctor";

const MainContent = () => {
    const { doctors, patient} = useContext(MyContext);

    return (  
        <section>
            <div className="statistics">
                <h2>My Doctors</h2>
            </div>
            <div className="doctors">
                {
                    doctors.length === 0 ? (
                        <p>No Doctors found!</p>
                    ) : (doctors.map((doctor) => (
                        <Doctor key={doctor.id} doctor={doctor} patient={patient} doctors={doctors} />
                    ))
                    )
                }
            </div>
        </section>
    );
}
 
export default MainContent;