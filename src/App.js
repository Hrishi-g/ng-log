// import React, { useEffect, useState } from 'react';

// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import SignUp from "./components/Signup";
// import Home from "./components/Home";
// import Login from "./components/Login";
// // import {PrivateRoute} from "./components/PrivateRoute";
// import EntryForm from "./components/EntryForm";
// import AllData from "./components/AllData";
// import NoPage from "./components/NoPage";

// function App() {
//   const auth = getAuth();
//   const [login, setLogin] = useState(false);

//   useEffect(() => {
//     const subscribe = () => {
//       try {
//         onAuthStateChanged(auth, (user) => {
//           setLogin(!!user); // Set login based on the presence of a user
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     subscribe();
//   }, [auth, setLogin]);

//   const PrivateRoute = ({ path, element }) => {
//     if (!login) {
//       return <Navigate to="/login" />;
//     }

//     return <Route path={path} element={element} />;
//   };
//   return (
//     // <Auth>
//     //   <BrowserRouter>
//     //   <Routes>
//     //   <Route exact path='/' element={<Login/>}/>
//     //     <Route path = "/home" element={<Home/>}/>
//     //     <Route path = "/entry" element={<EntryForm/>}/>
//     //     <Route path = "/alldata" element={<AllData/>}/>
//     //   </Routes>
//     //   </BrowserRouter>
//     // </Auth>    
//     <BrowserRouter>
//     <Routes>
//     <Route exact path='/' element={<Login/>}/>
//     <PrivateRoute path="/home" element={<Home />} />
//       {/* <Route exact path='/' element={<Login/>}/>
//       <Route path='/home' element={<PrivateRoute/>}>
//         <Route path='/home' element={<Home/>}/>
//       </Route>
//       <Route path='/admin/signup' element={<PrivateRoute/>}>
//         <Route path='/admin/signup' element={<SignUp/>}/>
//       </Route>
//       <Route path='/entry' element={<PrivateRoute/>}>
//         <Route path='/entry' element={<EntryForm/>}/>
//       </Route>
//       <Route path='/alldata' element={<PrivateRoute/>}>
//         <Route path='/alldata' element={<AllData/>}/>
//       </Route> */}
//       <Route path='/*' element={<NoPage/>}/>
//     </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoadingScreen from 'react-loading-screen';
import SignUp from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import EntryForm from "./components/EntryForm";
import AllData from "./components/AllData";
import NoPage from "./components/NoPage";

function App() {
  const auth = getAuth();
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setLogin(!!user); 
  //     setLoading(false);
  //   });

  //   // Cleanup the listener when the component is unmounted
  //   return () => unsubscribe();
  // }, [auth, setLogin]);

  // if (loading) {
  //   // Render a loading indicator while checking authentication state
  //   return <div>
  //      <LoadingScreen
  //   loading={true}
  //   bgColor='#76b852'
  //   spinnerColor='#9ee5f8'
  //   textColor='white'
  //   logoSrc='load.png'
  //   text='Loading...'
  // > 
  // </LoadingScreen>
  //   </div>;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/entry" element={<EntryForm />} />
        <Route path="/alldata" element={<AllData />} />
        <Route path="/signup" element={<SignUp />} />
/
        {/* {login ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/entry" element={<EntryForm />} />
            <Route path="/admin/signup" element={<SignUp />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )} */}
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
