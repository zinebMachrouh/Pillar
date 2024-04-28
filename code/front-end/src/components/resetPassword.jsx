import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const location = useLocation();

    const { email } = location.state || {};

    const [step, setStep] = useState(1);
    const [myEmail, setEmail] = useState('' || email);
    const [resetCode, setResetCode] = useState('');
    const [password, setpPssword] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const token = sessionStorage.getItem('token');
    const logged = sessionStorage.getItem('logged');
    const redirect = sessionStorage.getItem('redirect');

    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        console.log(myEmail)
        axios.post('http://127.0.0.1:8000/api/generatecode', {
            email: myEmail
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        setStep(2);
    }

    const handleResetCode = async (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/verifycode', {
            email: email,
            code:resetCode
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        setStep(3);
    }

    const handleNewPassword = async (e) => { 
        e.preventDefault();
        if (password.newPassword !== password.confirmPassword) {
            alert('Passwords do not match');
            navigate(`/${sessionStorage.getItem('redirect')}`);
        } else { 
            axios.put('http://127.0.0.1:8000/api/resetpassword', {
                email: email,
                password: password.newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            sessionStorage.clear();
            navigate('/login');
        }
    }

    return (
        <div id="signup-body">
            <Link to={logged ? `/${redirect}` : "/login"} className="back">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div className="form-container">
                <h2 style={{ color:'#3498DB'}}>Reset Password</h2>
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" required value={myEmail} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                        </div>
                        <button type="submit" className="btn">Send Email</button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handleResetCode}>
                        <div className="input-group">
                            <label htmlFor="code">Code</label>
                            <input type="number" name="code" id="code" required value={resetCode} onChange={(e) => setResetCode(e.target.value)} placeholder="Enter verification code"/>
                        </div>
                        <button type="submit" className="btn">Submit Reset Code</button>
                    </form>
                )}
                {step === 3 && (
                    <form onSubmit={handleNewPassword}>
                        <div className="input-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" name="newPassword" id="newPassword" required value={password.newPassword} onChange={(e) => setpPssword({ ...password, newPassword: e.target.value })} placeholder="Enter New Password"/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" required value={password.confirmPassword} onChange={(e) => setpPssword({ ...password, confirmPassword: e.target.value })} placeholder="Confirm Password"/>
                        </div>
                        <button type="submit" className="btn">Reset Password</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;