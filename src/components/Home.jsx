import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import Header from './Header';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState hook
import { auth } from '../firebase'; // Import your Firebase auth instance

export default function Home() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth); // Get the user state

  // Check if the user is authenticated
  if (!user) {
    // If not authenticated, redirect to the login page
    navigate('/*');
    // return null; // Render nothing while redirecting
  }

  // If authenticated, render the home page content
  return (
    <>
      <Header />
      <div className='home-main'>
        <div className='home-top-img'>
          <img src="truck4.jpg" alt="truck img" />
        </div>
        <div className='home-discription'>
          <p>
            Logistics is a critical component of the global economy, serving as the backbone for the efficient movement of goods and services across various industries. The logistics business encompasses a wide range of activities, including transportation, warehousing, distribution, and supply chain management, all working together to ensure the seamless flow of products from manufacturers to consumers.
          </p>
          <p>
            At its core, logistics involves the planning, implementation, and control of the efficient and effective movement and storage of goods, services, and information from the point of origin to the point of consumption. In a world where businesses operate on a global scale, logistics has become more complex and integral than ever before.
          </p>
        </div>
        <div className="signUp-btn">
          <button onClick={() => { let path = `/signup`; navigate(path); }}>Sign Up new User</button>
        </div>
      </div>
    </>
  );
}
