import React, { useContext } from 'react';
import Patient from "../patient";
import Stats from "../stats";
import { MyContext } from '../index';
const Main = () => {
    const { patients, checkups, appointments, user } = useContext(MyContext);
    return (  
        <section>
            <div className="statistics">
                <h2>My Patients</h2>
                <Stats patients={patients} />
            </div>
            <div className="patients">
                {patients.length === 0 ? (
                    <p>No Patients found!</p>
                ) : (patients.map((patient) => (
                    <Patient key={patient.id} patient={patient} user={user} patients={patients} />
                )))}
            </div>
        </section>
    );
}

export default Main;