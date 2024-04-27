import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css';
import 'firebase/auth';
import { signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../firebase';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignUp() {
  const navigate = useNavigate();

  const [details,setDeatails] = useState({
    email:"",
    password:"",
    c_password:"",
  })

  const [pass_sym,setPass_sym] = useState('password');
  const [click,setClick] = useState(false);

  const [c_pass_sym,c_setPass_sym] = useState('password');
  const [c_click,c_setClick] = useState(false);

  // const[reset,setReset] = useState(true);

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
      signInWithEmailAndPassword(auth,details.email,details.password)
      .then(()=>{
        // let path = `home`;
        alert("welcome");
        navigate('/home');
        // localStorage.setItem("isAuthenticated", "true");
        // console.log(userCredentials);
        // window.location.pathname = "/home";
        // <Navigate to="/home"replace={true}/>
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

  // const resetPass = () => {
  //   setReset(false);
  //   var hiden = document.getElementsByClassName("below-email")[0];
  //   var hiden1 = document.getElementsByClassName("below-email")[1];
  //   hiden.style.display='none';
  //   hiden1.style.display='none'; 
  //   sendPasswordResetEmail(auth,details.email).then(() => {
  //     alert("Password reset email sent!");
  //   })
  //   .catch((err) => {
  //     alert(err);
  //   });
  // }

  const handleReset = () => {
    alert("Fill Email field only\nLeave Password fields empty")
    document.getElementById('target').style.display = 'none';
    document.getElementById('target1').style.display = 'none';
    sendPasswordResetEmail(auth,details.email).then(() => {
      alert("Password reset email sent!");
    })
    .catch((err) => {
      alert(err);
    });
  }

  // const backToLogin = () => {
  //   setReset(true);
  //   var hiden = document.getElementsByClassName("below-email")[0];
  //   var hiden1 = document.getElementsByClassName("below-email")[1];
  //   hiden.style.display='block';
  //   hiden1.style.display='block'; 
  // }

  return (
    <div className="main-w3layouts wrapper">
		<h1>Login</h1>
		<div className="main-agileinfo">
			<div className="agileits-top">
				<form>
          <label htmlFor="email">Email</label>
					<input className="text email" type="email" name="email" required="" onChange={handleChange} value={details.email} autoComplete='on'/>
          <span className='span-error'>
            {
            (details.email.length)===0?"":
            (email_regex.test(details.email))?"":"Pattern Not Matched"
            }
          </span>
          <div className='below-email' id='target'>   
            <label htmlFor="password">Password</label>
            <div className='input-icon'>
            <input className="text" type={pass_sym} name="password" required="" onChange={handleChange} value={details.password}/>
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
            <br />
            <label htmlFor="c_password">Confirm Password</label>
            <div className='input-icon'>
            <input className="text w3lpass" type={c_pass_sym} name="c_password" required="" onChange={handleChange} value={details.c_password}/>
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
          </div>
          <input id='target1' type="submit" onClick={handleClick} value="LOGIN"/>
				</form>
        <div className='below-email' >   
          {/* <p>Don't have an Account? <span className='link-nav' onClick={()=>navigate('/signup')}>SignUp Now!</span></p> */}
          <br />
          <p>Forgot Password? <span className='link-nav' onClick={handleReset}>Reset Password</span></p>
        </div>
			</div>
		</div>
	</div>
  )
}
