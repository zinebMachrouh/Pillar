import axios from 'axios';
import { MyContext } from '../index';
import React, { useContext } from 'react';

const AppRequests = () => {
    const { pending, handleDelete, handleApprove } = useContext(MyContext);


    return (
        <section>
            <div className="statistics">
                <h2>Appointment Requests</h2>
                <div className="stats">
                    <div className="stat">
                        <h4>{pending.length}</h4>
                        <span>Appointments</span>
                    </div>
                </div>
            </div>
            <table style={{marginTop:'25px'}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {pending.length === 0 ? (
                        <p>No Appointments found!</p>
                    ) : (pending.map((appt) => (
                        <tr>
                            <td>#</td>
                            <td>{appt.patient.user.name}</td>
                            <td>{appt.date}</td>
                            {
                                (appt.notes) ? (
                                    <td>{appt.notes}</td>
                                ) : (
                                        <td><span>-</span></td>
                                )
                            }
                            <td >
                                <button type="button" className='approve' onClick={() => handleApprove(appt.id)}><i class="fa-solid fa-check"></i></button>
                                <button type="button" className='delete' onClick={() => handleDelete(appt.id)}><i class="fa-solid fa-ban"></i></button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </section>
    );
}

export default AppRequests;