import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/HeaderFooter.css';
import MenuIcon from '@mui/icons-material/Menu';
import { amber } from '@mui/material/colors';

export default function Header() {
  const [open,setOpen] = useState(false);
  const setNav = () => {
    setOpen(!open);
  }
  const logout = () => {
    localStorage.clear();
    window.location.pathname = "/";
  }
  return (
    <div className='page-header'>
    <div className="header">
      <Link to="/" className="logo"><img src="https://geekyhumans.com/wp-content/uploads/2022/09/owl.png?ezimgfmt=ng%3Awebp%2Fngcb5%2Frs%3Adevice%2Frscb5-1" alt=""/></Link>
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
      <Link to="/">Home</Link>
      <Link to="/alldata">Show Data</Link>
      <button className="book-button"><Link to="/entry">Entry</Link></button>
      <button className="book-button butt1" onClick={logout}>LogOut</button>
      </div>
      )}
    </div>
  )
}
