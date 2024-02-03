import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import { amber } from '@mui/material/colors';
const auth = getAuth();

export default function Header() {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [logOutModal,setlogOutModal] = useState(false);

  const setNav = () => {
    setOpen(!open);
  }

  const logout = () => {
    setlogOutModal(!logOutModal);
    
  }

  const confirmLogOut = () => {
    signOut(auth);
    sessionStorage.clear();
    let path = `/`; 
    navigate(path, { replace: true });
  }

  return (
    <div className='page-header'>
    <div className="header">
      <Link to="/home" className="logo"><img src="load1.png" alt="logo img"/></Link>
      <div className='on-min' onClick={setNav}>
      <MenuIcon sx={{ color: amber[50],fontSize: 30 }}/>
      </div>
      <div className="header-right">
      <Link to="/home">Home</Link>
      <Link to="/alldata">Show Data</Link>
      <button className="book-button"><Link to="/entry">Entry</Link></button>
      <button className="book-button butt1" onClick={logout}>LogOut</button>
      </div>
    </div>
    {open && (
    <div className='on-minDiv'>
      <Link to="/home">Home</Link>
      <Link to="/alldata">Show Data</Link>
      <button className="book-button"><Link to="/entry">Entry</Link></button>
      <button className="book-button butt1" onClick={logout}>LogOut</button>
      </div>
      )}
      {
  logOutModal  && (
    <div className='logOut-popup'>
      <div className='inside-logOut'>
        <div className='logOut-top'>
        <button className='logOut-btn' onClick={()=>setlogOutModal(!logOutModal)}>X</button>
        </div>
        <div className='logOut-bottom'>
        <button onClick={confirmLogOut}>Confirm Log Out</button>
        </div>
      </div>
    </div>
  )}
    </div>

  )
}
