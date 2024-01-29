import React from 'react';
import '../css/Home.css';
import Header from './Header';

export default function Home() {
  return (
    <>
        <Header/>
    <div className='home-main'>
        <div className='home-top-img'>
            <img src="truck4.jpg" alt="" />
        </div>
        <div className='home-discription'>
       <p>
       Logistics is a critical component of the global economy, serving as the backbone for the efficient movement of goods and services across various industries. The logistics business encompasses a wide range of activities, including transportation, warehousing, distribution, and supply chain management, all working together to ensure the seamless flow of products from manufacturers to consumers.
       </p>
       <p>
       At its core, logistics involves the planning, implementation, and control of the efficient and effective movement and storage of goods, services, and information from the point of origin to the point of consumption. In a world where businesses operate on a global scale, logistics has become more complex and integral than ever before.
       </p>
       {/* <p>
       ne of the key elements of the logistics business is transportation. Whether by land, sea, or air, the movement of goods requires careful planning and coordination. Trucks, trains, ships, and planes are the lifelines of the logistics industry, each playing a crucial role in ensuring that products reach their destination in a timely and cost-effective manner. The choice of transportation mode depends on factors such as the type of goods, distance, urgency, and cost considerations.
       </p>
       <p>
       One of the key elements of the logistics business is transportation. Whether by land, sea, or air, the movement of goods requires careful planning and coordination. Trucks, trains, ships, and planes are the lifelines of the logistics industry, each playing a crucial role in ensuring that products reach their destination in a timely and cost-effective manner. The choice of transportation mode depends on factors such as the type of goods, distance, urgency, and cost considerations.
       </p>
        <p>
        Distribution centers are strategically located facilities that play a critical role in the logistics network. They act as hubs where goods are received, sorted, and then shipped to their respective destinations. The optimization of distribution networks is essential for minimizing transportation costs and ensuring timely deliveries. Companies often use sophisticated software and analytics to design optimal distribution networks that balance cost efficiency with service quality.
        </p> */}
        </div>
        {/* <div className='home-btn'>
            {/* <button type='submit' onClick={event =>  window.location.href='/signup'}>Login</button>
            <button type='submit' onClick={event =>  window.location.href='/entry'}>New Entry</button>
            <button type='submit' onClick={event =>  window.location.href='/alldata'}>Data</button> 
        </div> */}
    </div>
        </>
  )
}
