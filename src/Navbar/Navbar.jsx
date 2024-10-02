import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../features/users/userSlice';
import './Navbar.scss'

const Navbar = () => {

    const dispatch=useDispatch()
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem("user"))

    function logout(){
        localStorage.removeItem("user")
        dispatch(setUser(""))
        navigate("/")
    }

  return (
    <nav className='nav'>
      <div className="nav-left">
        <ul>
          <li onClick={()=>navigate("/home")}>Home</li>
          <li onClick={()=>navigate("/admin")}>Admin</li>
        </ul>
      </div>
      <div className="nav-right">
        <ul>
            {user && <li
                onClick={logout}
            >
                Logout
            </li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;