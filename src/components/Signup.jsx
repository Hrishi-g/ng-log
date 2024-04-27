import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function Login() {
    const navigate = useNavigate();

    const [details,setDeatails] = useState({
        name:"",
        email:"",
        password:"",
        c_password:"",
      })

      const [pass_sym,setPass_sym] = useState('password');
      const [click,setClick] = useState(false);

      const [c_pass_sym,c_setPass_sym] = useState('password');
      const [c_click,c_setClick] = useState(false);

      var email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      var pass_regex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,19}$/;
    
      const handleChange = (e) => {
        const {name,value} = e.target;
        setDeatails((prev)=>{
          return{...prev,[name]:value}
        })
      }
    
      const handleClick = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,details.email,details.password)
        .then((userCredentials)=>{
          console.log(userCredentials);
          alert("User Resgistered");
          navigate('/');
        }).catch((err)=>{
          alert(err);
        })
    }

    const passIconCick = () => {
      if(pass_sym==='password'){
        setPass_sym('text');
        setClick(true);
      }else{
        setPass_sym('password');
        setClick(false);
      }
    }
  
    const c_passIconCick = () => {
      if(c_pass_sym==='password'){
        c_setPass_sym('text');
        c_setClick(true);
      }else{
        c_setPass_sym('password');
        c_setClick(false);
      }
    }

  return (
    <div className="main-w3layouts wrapper">
		<h1>SignUp</h1>
		<div className="main-agileinfo">
			<div className="agileits-top">
				<form>
        {/* <label htmlFor="name">Name</label>
					<input className="text" type="text" name="name" required onChange={handleChange} value={details.name}/> */}
        <label htmlFor="email">Email</label>
					<input className="text email" type="email" name="email" required onChange={handleChange} value={details.email}/>
          <span className='span-error'>
            {
            (details.email.length)===0?"":
            (email_regex.test(details.email))?"":"Pattern Not Matched"
            }
          </span>
          <label htmlFor="password">Password</label>
          <div className='input-icon'>
					<input className="text" type={pass_sym} name="password" required onChange={handleChange} value={details.password}/>
          <span className='pass-span' onClick={passIconCick}>
            {
              (click)?<VisibilityIcon/>:<VisibilityOffIcon/>
            }
            </span>
            </div>
          <span className='span-error'>
            {
            (details.password.length)===0?"":
            (pass_regex.test(details.password))?"":"Pattern Not Matched"
            }
          </span>
          <label htmlFor="c_password">Confirm Password</label>
          <div className='input-icon'>
          <input className="text w3lpass" type={c_pass_sym} name="c_password" required onChange={handleChange} value={details.c_password}/>
          <span className='c_pass-span' onClick={c_passIconCick}>
            {
              (c_click)?<VisibilityIcon/>:<VisibilityOffIcon/>
            }
            </span>
          </div>
          <span className='span-error'>
            {
            ((details.c_password.length)===0)?"":
            (details.password===details.c_password)?"":"Password Not Matched"
            }
          </span>
					<input type="submit" onClick={handleClick} value="SIGNIN"/>
				</form>
				<p>Already have an Account? <span className='link-nav' onClick={()=>navigate('/')}>Login Now!</span></p>
			</div>
		</div>
	</div>
  )
}
