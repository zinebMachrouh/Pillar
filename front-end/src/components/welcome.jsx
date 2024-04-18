import { NavLink, Link } from "react-router-dom";

const Welcome = () => {
    const logged = sessionStorage.getItem('logged');
    const redirect = sessionStorage.getItem('redirect');
    return (
        <section id="welcome">
            <div className="hero">
                <header>
                    <h2>Pillar</h2>
                    <nav>
                        <NavLink to="/" end>Home</NavLink>
                        <a href="#">Services</a>
                        <a href="#">Blog</a>
                        <a href="#">About</a>
                        <a href="#">Contact Us</a>
                    </nav>
                    {logged ? (
                        <div>
                            <NavLink to={`/${redirect}`}>Dashboard</NavLink>
                        </div>
                    ) : (
                        <div>
                            <NavLink to='/signup'>SignUp</NavLink>
                            <NavLink to='/login'>LogIn</NavLink>
                        </div>
                    )}
                </header>
                <div className="big-rect"></div>
                <div className="mini-rect"></div>
                <div className="heart">
                    <img src="/public/heart.png" alt="heart" />
                </div>
                <div className="text">
                    <h4>The Best Reliable
                        Health <br />Service In
                        Your Hands
                    </h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor <br /> incididunt ut labore adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore
                    </p>
                    <div className="hero-acts">
                        <Link to='/login'>Make An Appointment</Link>
                        <div className="play">
                            <a href="#"><i className="fa-solid fa-play"></i></a>
                            <span>See How We Work</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="services">
                <div className="cards">
                    <div className="card">
                        <div className="card-icon"><i className="fa-regular fa-clock"></i></div>
                        <h4>Lorem Ipsum</h4>
                        <p>Lorem ipsum dolor sit amet, consec teturadi piscing elit sed</p>
                    </div>
                    <div className="card">
                        <div className="card-icon"><i className="fa-solid fa-fingerprint"></i></div>
                        <h4>Lorem Ipsum</h4>
                        <p>Lorem ipsum dolor sit amet, consec teturadi piscing elit sed</p>
                    </div>
                    <div className="card">
                        <div className="card-icon"><i className="fa-solid fa-tablets"></i></div>
                        <h4>Lorem Ipsum</h4>
                        <p>Lorem ipsum dolor sit amet, consec teturadi piscing elit sed</p>
                    </div>
                    <div className="card">
                        <div className="card-icon"><i className="fa-solid fa-truck-medical"></i></div>
                        <h4>Lorem Ipsum</h4>
                        <p>Lorem ipsum dolor sit amet, consec teturadi piscing elit sed</p>
                    </div>
                    <div className="card">
                        <div className="card-icon"><i className="fa-solid fa-hand-holding-medical"></i></div>
                        <h4>Lorem Ipsum</h4>
                        <p>Lorem ipsum dolor sit amet, consec teturadi piscing elit sed</p>
                    </div>
                </div>
            </div>
            <div className="w-main">
                <div className="m-stats">
                    <div className="m-stat">
                        <h4>10M</h4>
                        <span>Happy Patients</span>
                    </div>
                    <div className="m-stat">
                        <h4>04M</h4>
                        <span>Monthly Visitors</span>
                    </div>
                    <div className="m-stat">
                        <h4>120</h4>
                        <span>Countries Worldwide</span>
                    </div>
                    <div className="m-stat">
                        <h4>4.9</h4>
                        <span>Trust Pilot</span>
                    </div>
                </div>
                <div className="m-text">
                    <div className="m-left">
                        <h4>-WHO ARE WE</h4>
                        <h2>We Help To Get <br />Solutions</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero quasi hic eligendi ex delectus. Dolores maxime vero recusandae animi tenetur laboriosam architecto, soluta asperiores ut.</p>
                        <button type="button">Get Started</button>
                    </div>
                    <div className="m-right">
                        <i className="fa-regular fa-heart m-icon"></i>
                        <img src="/public/right.jpg" alt="right" />
                        <div className="right-card">
                            <h4>Looking For Assistance ?</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nobis dolorum. Dolorum dolorem dolores aliquid! </p>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                    <div class="list">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>

                    <div class="list">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>

                    <div class="list">
                        <h4>Contact Info</h4>
                        <ul>
                            <li><a href="#">98 West 21th Street</a></li>
                            <li><a href="#">info@pillar.com</a></li>
                            <li><a href="#">+(123)-123-1234</a></li>
                        </ul>
                    </div>

                    <div class="list">
                        <h4>Connect</h4>
                        <div class="social">
                            <a href="#"><i class='bx bxl-facebook' ></i></a>
                            <a href="#"><i class='bx bxl-instagram-alt' ></i></a>
                            <a href="#"><i class='bx bxl-twitter' ></i></a>
                            <a href="#"><i class='bx bxl-linkedin' ></i></a>
                        </div>
                    </div>
            </footer>
        </section>
    );
}

export default Welcome;