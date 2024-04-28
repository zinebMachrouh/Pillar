import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [message,setMesssage] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/' + sessionStorage.getItem('redirect'));
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = window.csrfToken;
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', loginData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            const token = response.data.authorisation.token;
            const redirect = response.data.redirect;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('logged', true);
            sessionStorage.setItem('redirect', redirect);

            navigate(`/${redirect}`);
        } catch ($e) {
            setMesssage('Invalid credentials');
        }

    };

    return (
        <div id="login-body">
            <Link to='/' className="back">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div class="form-container">
                <h2 className="title">P<img src="/logo.png" alt="logo" style={{ width: '12px' }} />llar</h2>
                <form class="form" method="POST" onSubmit={handleLoginSubmit}>
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@example.com" value={loginData.email} onChange={handleInputChange} />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Min : 8 characters" value={loginData.password} onChange={handleInputChange} />

                    </div>
                    <p className="message">
                        {(message) ? 
                            <div>
                                <i class="fa-solid fa-circle-exclamation"></i>
                                <span>{message}</span>
                        </div> : ''}
                    </p>
                    <div class="group">
                        <label for="remember_me" class="remember">
                            <input id="remember_me" type="checkbox" name="remember" />
                            <span>Remember me</span>
                        </label>

                        <div class="forgot">
                            <Link to='/resetPassword'>
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <button class="sign" type="submit">Sign in</button>
                </form>

                <div class="social-message">
                    <div class="line"></div>
                    <p class="message">Login with social accounts</p>
                    <div class="line"></div>
                </div>
                <div className="social-icons">
                    <a aria-label="Log in with Google" className="icon" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path
                                d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z">
                            </path>
                        </svg>
                    </a>
                    <button aria-label="Log in with Twitter" className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path
                                d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z">
                            </path>
                        </svg>
                    </button>
                    <a aria-label="Log in with Facebook" className="icon" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#34495E"
                                d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                        </svg>
                    </a>
                </div>
                <p class="signup">Don't have an account?
                    <Link to='/signup'>Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;