import React, { useState } from 'react';
import { db } from '../firebase';
import { set,ref } from 'firebase/database';
import { uid } from 'uid';
import '../css/EntryForm.css';
import Header from './Header';

export default function EntryForm() {
    const [values,setValue] = useState({
        company_name:"",
        customer_name:"",
        load:"",
        unload:"",
        chalan_no:"",
        driver_name:"",
        total_rate:"",
        other_exp:"",
        vehicle_no:""
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
        if(values.company_name.length!==0 && values.customer_name.length!==0 
            && values.other_exp.length!==0 && values.total_rate.length!==0 
            && values.load.length!==0 && values.unload.length!==0 &&
            values.driver_name.length!==0 && values.chalan_no.length!==0
            && values.vehicle_no){
            setdate((new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString()));
            const {company_name,customer_name,load,unload,chalan_no,driver_name,total_rate,other_exp,vehicle_no} = values;
            const uuid = uid();
            set(ref(db,`/${uuid}`),{
                company_name,
                customer_name,
                load,
                unload,
                chalan_no,
                driver_name,
                total_rate,
                other_exp,
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
                chalan_no:"",
                driver_name:"",
                total_rate:"",
                other_exp:"",
                vehicle_no:""
            });
            // const options = {
            //     method :'POST',
            //     headers : {
            //         'Content-Type':'application/json'
            //     },
            //     body : JSON.stringify({
            //         company_name,customer_name,load,unload,chalan_no,driver_name,total_rate,other_exp,vehicle_no,date,uid
            //     })
            // }
            // const res = await fetch('https://nglog-72cc6-default-rtdb.firebaseio.com/Data.json',options)
        }else{
            alert("Fill all fields \n Fields cannot be empty");
        }
    }

  return (
    <>
    <Header/>
    <div className='entryform-main'>
    <div className='entry-background'>
        <div className='row-1'>
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" name='company_name' onChange={handleChange} value={values.company_name} required/>
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
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" name='driver_name' onChange={handleChange} value={values.driver_name} required/>
            <label htmlFor="floatingInput">Driver Name</label>
        </div>
        <div className="input-group">
            <span className="input-group-text">₹</span>
            <div className="form-floating">
                <input type="number" className="form-control" id="floatingInputGroup1" name='total_rate' onChange={handleChange} value={values.total_rate} required/>
                <label htmlFor="floatingInputGroup1">Total Fare</label>
            </div>
        </div>
        </div>
        
        <div className='row-2'>
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" name='customer_name' onChange={handleChange} value={values.customer_name} required/>
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
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" name='chalan_no' onChange={handleChange} value={values.chalan_no} required/>
            <label htmlFor="floatingInput">Chalan Number</label>
        </div>
        <div className="input-group">
            <span className="input-group-text">₹</span>
            <div className="form-floating">
                <input type="number" className="form-control" id="floatingInputGroup1" name='other_exp' onChange={handleChange} value={values.other_exp} required/>
                <label htmlFor="floatingInputGroup1">Other Expenses</label>
            </div>
        </div>
        </div>
    </div>
    <input type="text" className='vehicle-no' name='vehicle_no' onChange={handleChange} value={values.vehicle_no} required/>
    <button type="button" onClick={handleClick} className="btn btn-success">Success</button>
    </div>
    </>

  )
}
