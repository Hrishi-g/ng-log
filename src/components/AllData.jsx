import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref,onValue,remove,update } from 'firebase/database';
import Header from './Header';
import '../css/AllData.css';
import '../css/EntryForm.css';

export default function AllData() {
    const [userData,setsUserData] = useState([]);
    const [modal,setModal] = useState(false);
    const [delModal,setdelModal] = useState(false);
    const [uid,setUid] = useState("");
    const [search,setSearch] = useState("");  
    const [delValue,setDelValue] = useState({
      chalan:"",
      cust_name:"",
      uid:""
    });
    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerPage = 4;
    const lastIndex  = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records =  userData.slice(firstIndex,lastIndex);
    const npage = Math.ceil(userData.length /recordsPerPage);
    const numbers = [...Array(npage+1).keys()].slice(1);
    
    const [values,setValue] = useState({
      company_name:"",
      customer_name:"",
      load:"",
      unload:"",
      chalan_no:"",
      driver_name:"",
      total_rate:"",
      other_exp:"",
      vehicle_no:"",
  })

  const [date,setdate] = useState(new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString());

  useEffect(()=>{
    onValue(ref(db),(snapshot)=>{
      if(snapshot.exists()){
        const data = snapshot.val();
        const newData = Object.keys(data).map(key=>({
          id:key,
          ...data[key]
        }))
        setsUserData(newData);
      }else{
        setsUserData([]);
      }
    });
  },[]);

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
          update(ref(db,`/${uid}`),{
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
          });
          alert("Data Edited Sucessfully");
          setModal(!modal);
        }else{
          alert("Fill all fields \n Fields cannot be empty");
      }
  }

    const toggleModal = (vehicle_no,company_name,customer_name,load,unload,chalan_no,driver_name,total_rate,other_exp,uuid) => {
      setUid(uuid);
      setModal(!modal);
      setValue({
        company_name:company_name,
        customer_name:customer_name,
        load:load,
        unload:unload,
        chalan_no:chalan_no,
        driver_name:driver_name,
        total_rate:total_rate,
        other_exp:other_exp,
        vehicle_no:vehicle_no,
    })
    }

    const deleteData = (uid,chalan,cust_name) => {
      setDelValue({
        chalan:chalan,
        cust_name:cust_name,
        uid:uid
      });
      setdelModal(!delModal);
    }

    const confirmDel = (uid) => {
      console.log(uid);
      remove(ref(db,`/${uid}`));
      alert("Data Deleted");
      setdelModal(!delModal);
    }

    // const changeFormat = (vald) =>{
    //   const myArray = vald.split("-");
    //   let year = myArray[0];
    //   let month = myArray[1];
    //   let day = myArray[2];

    //   let format = day+"-"+month+"-"+year;
    //   return format;
    // }

    const changeFormat1 = (vald) =>{
      const myArray = vald.split("/");
      let month = myArray[0];
      let day = myArray[1];
      let year = myArray[2];

      let format = day+"-"+month+"-"+year;
      return format;
    }
    const prevPage = () => {
      if(currentPage !== 1){
        setCurrentPage(currentPage - 1);
      }
    }
    const changePage = (id) => {
      setCurrentPage(id)
    }
    const nextPage = () => {
      if(currentPage !== npage){
        setCurrentPage(currentPage + 1);
      }
    }
    
  return (
    <>
    <Header/>
    <div className='main-data'>
      <div className='main-head'>
      <input type="text" name="search" 
      onChange={
        (e)=>setSearch(e.target.value)
      }
      value={search}
      placeholder="Search.."/>
      </div>
      <div className="table-responsive">
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Vehicle No.</th>
      <th scope="col">Entered Date & Time</th>
      <th scope="col">Company Name</th>
      <th scope="col">Customer Name</th>
      <th scope="col">Load</th>
      <th scope="col">Unload</th>
      <th scope="col">Chalan Number</th>
      <th scope="col">Driver Name</th>
      <th scope="col">Total Fare</th>
      <th scope="col">Expenses</th>
      <th scope="col">Edit Data</th>
      <th scope="col">Delete Data</th>
    </tr>
  </thead>  
  <tbody>
    {(search.length>0) ? 
    userData.filter((item)=>item.company_name.toLowerCase().includes(search) ||
    changeFormat1(item.date).toLowerCase().includes(search) ||
     item.vehicle_no.toLowerCase().includes(search) ||
      item.customer_name.toLowerCase().includes(search) ||
       item.load.toLowerCase().includes(search) ||
        item.unload.toLowerCase().includes(search) ||
        item.chalan_no.toLowerCase().includes(search)  ||
        item.driver_name.toLowerCase().includes(search)  ||
           item.other_exp.toLowerCase().includes(search)  ||
            item.total_rate.toLowerCase().includes(search)).map((item,index)=>{
      return(
         <tr key={index}>
          <th scope="row">{lastIndex-recordsPerPage+index+1}</th>
          <td>{item.vehicle_no}</td>
          <td>{changeFormat1(item.date)}</td>
          <td>{item.company_name}</td>
          <td>{item.customer_name}</td>
          <td>{item.load}</td>
          <td>{item.unload}</td>
          <td>{item.chalan_no}</td>
          <td>{item.driver_name}</td>
          <td>{item.total_rate}</td>
          <td>{item.other_exp}</td>
          <td><button onClick={()=>toggleModal(item.vehicle_no,item.company_name,item.customer_name,item.load,item.unload,item.chalan_no,item.driver_name,item.total_rate,item.other_exp,item.uuid)}>Edit</button> 
          </td>
           <td><button onClick={()=>deleteData(item.uuid,item.chalan_no,item.customer_name)}>Delete</button></td>
       </tr>
      )
    }): records.filter((item)=>item.company_name.toLowerCase().includes(search) ||
    changeFormat1(item.date).toLowerCase().includes(search) ||
     item.vehicle_no.toLowerCase().includes(search) ||
      item.customer_name.toLowerCase().includes(search) ||
       item.load.toLowerCase().includes(search) ||
        item.unload.toLowerCase().includes(search) ||
        item.chalan_no.toLowerCase().includes(search)  ||
        item.driver_name.toLowerCase().includes(search)  ||
           item.other_exp.toLowerCase().includes(search)  ||
            item.total_rate.toLowerCase().includes(search)).map((item,index)=>{
      return(
         <tr key={index}>
          <th scope="row">{lastIndex-recordsPerPage+index+1}</th>
          <td>{item.vehicle_no}</td>
          <td>{changeFormat1(item.date)}</td>
          <td>{item.company_name}</td>
          <td>{item.customer_name}</td>
          <td>{item.load}</td>
          <td>{item.unload}</td>
          <td>{item.chalan_no}</td>
          <td>{item.driver_name}</td>
          <td>{item.total_rate}</td>
          <td>{item.other_exp}</td>
          <td><button onClick={()=>toggleModal(item.vehicle_no,item.company_name,item.customer_name,item.load,item.unload,item.chalan_no,item.driver_name,item.total_rate,item.other_exp,item.uuid)}>Edit</button> 
          </td>
           <td><button onClick={()=>deleteData(item.uuid,item.chalan_no,item.customer_name)}>Delete</button></td>
       </tr>
      )
    })
    }
  </tbody>
</table>
<div className='data-page'>
<nav>
  <ul className='pagination'>
  <li className='page-item'>
    <a href="#" className='page-link' onClick={prevPage}>Prev</a>
  </li>
  {
    numbers.map((n, i) => (
      <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
        <a href="#" className='page-link' onClick={()=>changePage(n)}>{n}</a>
      </li>
    ))
  }
  <li className='page-item'>
    <a href="#" className='page-link' onClick={nextPage}>Next</a>
  </li>
</ul>
</nav>
</div>
{modal && (
  <div className='modal'>
  <div className='overlay'>
    <div className='modal-content'>
    <div className='entryform-main in-alldata'>
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
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" name='driver_name' placeholder="" onChange={handleChange} value={values.driver_name} required/>
            <label htmlFor="floatingInput">Driver Name</label>
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
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" name='chalan
            _no' placeholder="Tata Transports" onChange={handleChange} value={values.chalan_no} required/>
            <label htmlFor="floatingInput">Chalan Number</label>
        </div>
        <div className="input-group">
            <span className="input-group-text">₹</span>
            <div className="form-floating">
                <input type="number" className="form-control" id="floatingInputGroup1" name='other_exp' placeholder="Diseal rate" onChange={handleChange} value={values.other_exp} required/>
                <label htmlFor="floatingInputGroup1">Other Expenses</label>
            </div>
        </div>
        </div>
    </div>
    <input type="text" className='vehicle-no' placeholder="Vehicle No." name='vehicle_no' onChange={handleChange} value={values.vehicle_no} required/>
    <button type="button" onClick={handleClick} className="btn btn-success">Success</button>
    </div>
      <button className='close-modal' onClick={toggleModal}>X</button>
    </div>
  </div>
</div>
)}
{
  delModal  && (
    <div className='del-popup'>
      <div className='inside-del'>
      <button className='del-but' onClick={()=>setdelModal(!delModal)}>X</button>
        <div className='del-top'>
        <div className='del_data'>
          <h2>Customer Name:{delValue.cust_name}</h2>
        <h2>Chalan No.:{delValue.chalan}</h2>
        </div>
        </div>
        <div className='del-bottom'>
        <button onClick={()=>confirmDel(delValue.uid)}>Confirm Delete</button>
        </div>
      </div>
    </div>
  )}
</div>
    </div>
  </>
  )
}
