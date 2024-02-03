// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const PrivateRoute = ({ element, ...rest }) => {
  const auth = getAuth();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const subscribe = () => {
      try {
        onAuthStateChanged(auth, (user) => {
          setLogin(!!user); // Set login based on the presence of a user
        });
      } catch (err) {
        console.error(err);
      }
    };

    subscribe();
  }, [auth, setLogin]);

  // Redirect to login page if not logged in
  if (!login) {
    return <Navigate to="/" />;
  }

   // Render the protected route if logged in
   return <Route {...rest} element={element} />;
  };

  // useEffect(() => {
  //   const subscribe = () => {
  //     try {
//         onAuthStateChanged(auth, (user) => {
//           setLogin(!!user); // Set login based on the presence of a user
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     subscribe();
//   }, [auth, setLogin]);

//   // Redirect to login page if not logged in
//   if (!login) {
//     return <Navigate to="/" />;
//   }

//   // Render the protected route if logged in
//   return <Route {...rest} element={element} />;
// };

// import React from "react";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { useEffect, useState } from 'react';
// import {  Outlet, useNavigate } from 'react-router-dom';
// // import LoadingScreen from 'react-loading-screen';

// export function PrivateRoute() {

//   const auth = getAuth();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [login,setLogin] = useState(false);

//   useEffect(()=>{
//     const subscribe = () => {
//       try{
//         onAuthStateChanged(auth, (user) => {
//           if (user) {
//             setLogin(true);
//           } else {
//             setLogin(false);
//           }
//         });
  //     }catch (err){
  //       console.log(err);
  //     }
  //   }
  //   subscribe();
  // },[auth,setLogin,navigate]);
  // useEffect(() => {
  //   console.log(login);
  //   if(login){
  //     navigate("/home");
  //   }
  // }, [login,navigate]);

  // return (
  //   <div>
  //     {/* Other components or content */}
  //     <Outlet />
  //   </div>
  // );
  // if(login){
  //   return <Outlet/>
  // }else{
  //   return <Navigate to="/" />
  // }
  // return login ? <Outlet /> : <Navigate to="/" />;
// }
      // useEffect(() => {
  //   const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
  //     console.log(currentUser);
  //     setUser(currentUser);
  //   });

  // }, []);
// //   return new Promise((res,rej)={
// //     onAuthStateChanged(auth, (user) => {
      
// //     });
// //   });

//   // useEffect(() => {
//   //   const unsub = onAuthStateChanged(auth, (user) => {
//   //     unstable_batchedUpdates(() => {
//   //       // setLoading(false);
//   //       setLogin(true);
//   //       setUser(user);
//   //     });
//   //     console.log(login);
//   //   });
//   //   return unsub;
//   // }, []);
  
//   // useEffect(()=>{
//   //   const unsubscribe = onAuthStateChanged(auth, (user) => {
//   //     if (user) {
//   //       setUser(user);
//   //       setLogin(true);
//   //     } else {
//   //       setLogin(false);
//   //     }
//   //   }, (error) => {
//   //     console.error('Firebase Auth Error:', error);
//   //   });
//   //   // Cleanup the listener when the component is unmounted
//   //   return () => unsubscribe();
//   // },[auth, user, islogin]);

//   // useEffect(() => {
//   //   // This effect will run whenever login changes
//   //   console.log(islogin);
//   // }, [islogin]); // Add login as a dependency if you want to log its changes
//   // console.log(user);

//   // console.log(user);
//   // If you want to show a loading indicator while checking the authentication state
//   // if (isAuthenticated === false) {
//   //   return(
//   //      <div>
//   //     Loading...homes
//   //     <LoadingScreen
//   //   loading={true}
//   //   bgColor='#76b852'
//   //   spinnerColor='#9ee5f8'
//   //   textColor='white'
//   //   logoSrc='load.png'
//   //   text='Loading...'
//   // > 
//   // </LoadingScreen>
//   //     </div>);
//   // }



// import React from 'react'
// import {Route} from "react-router-dom";
// import { useContext } from 'react'
// import { AuthContext } from './Auth'
// import { Navigate } from 'react-router-dom';
// export default function PrivateRoute({RouteComponent,...rest}) {
//   const {currentUser} = useContext(AuthContext)
//   return (
//     <Route
//     {...rest}
//     render = {routeProps =>
//     !!currentUser ? (
//       <RouteComponent {...routeProps} />
//   ) :( <Navigate to={"/"}/>
//   )
//     }
//     />
//   );
// }


