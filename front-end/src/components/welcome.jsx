import { NavLink } from "react-router-dom";

const Welcome = () => {
    return (  
        <nav>
            <NavLink to='/' end>Home</NavLink>
            <NavLink to='/signup'>SignUp</NavLink>
            <NavLink to='/login'>LogIn</NavLink>
        </nav>
    );
}
 
export default Welcome;