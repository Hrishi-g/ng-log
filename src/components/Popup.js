import React, { useEffect, useState } from 'react';
import '../css/AllData.css';
import { db } from '../firebase';
import { set,ref, update,onValue } from 'firebase/database';
import '../css/Popup.css';


export default function Popup(props) {
  const [userData,setsUserData] = useState({});

  const [values,setValue] = useState({
    // company_name:props.company_name,
    // customer_name:props.customer_name,
    // load:props.load,
    // unload:props.unload,
    // load_date:props.load_date,
    // unload_date:props.unload_date,
    // total_rate:props.total_rate,
    // diseal_rate:props.diseal_rate,
    // vehicle_no:props.vehicle_no
})
const [date,setdate] = useState(new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString());

const handleChange = (e) => {
    const {name,value} = e.target;
    setValue((prev)=>{
      return{...prev,[name]:value}
    })
  }

  const handleClick = async (e) => {
    e.preventDefault();
        setdate((new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString()));
        const {company_name,customer_name,load,unload,load_date,unload_date,total_rate,diseal_rate,vehicle_no} = values;
        const uuid=props.uid;
        update(ref(db,`/${props.uid}`),{
            company_name,
            customer_name,
            load,
            unload,
            load_date,
            unload_date,
            total_rate,
            diseal_rate,
            vehicle_no,
            date,
            uuid,
        });
        alert("Data Stored");
        setValue({
            company_name:"",
            customer_name:"",
            load:"",
            unload:"",
            load_date:"",
            unload_date:"",
            total_rate:"",
            diseal_rate:"",
            vehicle_no:""
        });
}
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={()=>props.setTrigger(false)}>close</button>
            <div className='entryform-main'>
    <div className='entry-background'>
        <div className='row-1'>
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" name='company_name' placeholder="Tata Transports" onChange={handleChange} value={values.company_name} required/>
            <label htmlFor="floatingInput">Company Name</label>
        </div>

        <div>
            <label htmlFor="exampleDataList" className="form-label">Loading location</label>
            <input className="form-control" list="load" id="exampleDataList" name='load' placeholder="Type to search..." onChange={handleChange} value={values.load} required/>
            <datalist id="load">
                <option value="Mumbai"/>
                <option value="Pune"/>
                <option value="Nashik"/>
                <option value="etc"/>
                <option value="etc"/>
            </datalist>
        </div>
        <div>
            <label htmlFor="load_date" className="form-label date-label">Loadind date</label>
            <input type="date" name="load_date" id="load Date" onChange={handleChange} value={values.load_date}></input>
        </div>
        <div className="input-group">
            <span className="input-group-text">₹</span>
            <div className="form-floating">
                <input type="number" className="form-control" id="floatingInputGroup1" name='total_rate' placeholder="rate" onChange={handleChange} value={values.total_rate} required/>
                <label htmlFor="floatingInputGroup1">Total Fare</label>
            </div>
        </div>
        </div>
        
        <div className='row-2'>
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" name='customer_name' placeholder="Ramlakan Gupta" onChange={handleChange} value={values.customer_name} required/>
            <label htmlFor="floatingPassword">Customer Name</label>
        </div>

        <div>
            <label htmlFor="exampleDataList" className="form-label">Unloading location</label>
            <input className="form-control" list="unload" id="exampleDataList" name='unload' placeholder="Type to search..." onChange={handleChange} value={values.unload} required/>
            <datalist id="unload">
                <option value="Mumbai"/>
                <option value="Pune"/>
                <option value="Nashik"/>
                <option value="etc"/>
                <option value="etc"/>
            </datalist>
        </div>
        <div>
            <label htmlFor="unload_date" className="form-label date-label">Unloading date</label>
        <input type="date" name="unload_date" id="unload Date" onChange={handleChange} value={values.unload_date}></input>
        </div>
        <div className="input-group">
            <span className="input-group-text">₹</span>
            <div className="form-floating">
                <input type="number" className="form-control" id="floatingInputGroup1" name='diseal_rate' placeholder="Diseal rate" onChange={handleChange} value={values.diseal_rate} required/>
                <label htmlFor="floatingInputGroup1">Diseal Rate</label>
            </div>
        </div>
        </div>
    </div>
    <input type="text" className='vehicle-no' placeholder="Vehicle No." name='vehicle_no' onChange={handleChange} value={values.vehicle_no} required/>
    <button type="button" onClick={handleClick} className="btn btn-success">Success</button>
    </div>
        </div>
    </div>
  ) : "";
}
