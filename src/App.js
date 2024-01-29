import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import {PrivateRoute} from "./components/PrivateRoute";
import EntryForm from "./components/EntryForm";
import AllData from "./components/AllData";
import NoPage from "./components/NoPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route path='/home' element={<PrivateRoute/>}>
        <Route path='/home' element={<Home/>}/>
      </Route>
      <Route path='/admin/signup' element={<PrivateRoute/>}>
        <Route path='/admin/signup' element={<SignUp/>}/>
      </Route>
      <Route path='/entry' element={<PrivateRoute/>}>
        <Route path='/entry' element={<EntryForm/>}/>
      </Route>
      <Route path='/alldata' element={<PrivateRoute/>}>
        <Route path='/alldata' element={<AllData/>}/>
      </Route>
      <Route path='/*' element={<NoPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
