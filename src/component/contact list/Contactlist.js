import React, { useEffect, useState } from "react";
import{Link} from "react-router-dom"
import {Contactservice} from "../../service/Contactservice";
import Spiner from "../spiner/Spinner";

let Contactlist=()=>{
    
    let [query,setQuery]=useState({
        text:""
    })
    let [state,setState]=useState({loading:false,
                                   contacts:[],
                                   filteredContacts:[],
                                    errorMessage:''})

    useEffect(
        
        
        async()=>{
            try{
                setState({...state, loading:true});
            let response= await Contactservice.getAllContacts();
             setState({
                 ...state,
                 loading:false,
                 contacts:response.data,
                 filteredContacts:response.data
               
             })
            }
            catch (error){
                setState({
                    ...state,
                    errorMessage: error.messgae
                })
                
            }
        },[]
    
    )

    let clickDelete = async(contactId) =>{
        try{
            let response= await Contactservice.deleteContact(contactId)
            if(response){
            setState({...state, loading:true});
            let response= await Contactservice.getAllContacts();
             setState({
                 ...state,
                 loading:false,
                 contacts:response.data,
                 filteredContacts:response.data
               
             })}

        }
        catch(error){
            setState(
                {
                    ...state,
                    errorMessage:error.messgae,
                    loading:false
                }
            )

        }


    }

    let searchContacts=(event)=>{
        setQuery({...query, text: event.target.value})
       let theContacts = state.contacts.filter(contact=>{
           return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
       })
       setState({
           ...state,
           filteredContacts:theContacts
       })

    }

    let{loading, contacts, errorMessage, filteredContacts}=state;
    return(
       <>
 
  
   <section className="contact-search p-3 ">
  <div className="container">
 <div className="grid">
 <div className="row">
 <div className="col">
 <h3>Contact Manger
 <Link to={'/contact/add'} className="btn btn-primary ms-3">
 <i className="fa fa-plus-circle"></i> New 
</Link>
</h3>
<p className="fst-italic"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. </p>
 </div>

 </div>  

<div className="row mt-2">
    <div className="col-md-6">
   <form className="row">
   <div className="col">
       <div className="mb-2">
           <input className="form-control" type="text" name="text" value={query.text} onChange={searchContacts}></input>
       </div>
   </div>
   <div className="col">
       <div className="mb-2">
           <input className="btn btn-outline-dark" type="submit" value="search" ></input>
       </div>
   </div>

   </form>
    </div>
</div>

 </div>
</div>
 </section>
 {
     loading?<Spiner></Spiner>:<React.Fragment>
     <section className="contact-lsit">
 <div className="container">
     <div className="row">
     {
        filteredContacts.length> 0 &&
        filteredContacts.map(contact=>{
             return(<>
                <div className="col-md-6 " key={contact.id}>
             <div className="card p-1 my-2">
                 <div className="card-body "></div>
                 <div className="row col-12 align-item-center">
                     <div className="col-md-4">
                    <img src={contact.photo} className="contact-img"></img>
                     </div>
                     <div className="col-md-7">
                         <ul className="list-grou[">
                             <li className="list-group-item list-group-item-action">
                                 Name: <span className="fw-bold">{contact.name}</span>
                             </li>
                             <li className="list-group-item list-group-item-action">
                                 Mobile: <span className="fw-bold">{contact.mobile}</span>
                             </li>
                             <li className="list-group-item list-group-item-action">
                                 Email: <span className="fw-bold">{contact.email}</span>
                             </li>
                         </ul>
                     </div>
                     <div className="col-md-1 align-items-center">
                     <Link to={`/contact/view/${contact.id}`} className="btn btn-warning ">
                         <i className="fa fa-eye"></i>
                     </Link>
                     <Link to={`/contact/edit/${contact.id}`} className="btn btn-primary my-1">
                         <i className="fa fa-pen"></i>
                     </Link>
                     <button className="btn btn-danger " onClick={()=>clickDelete(contact.id)}>
                         <i className="fa fa-trash"></i>
                     </button>
                     </div>
                 </div>
             </div>
         </div>

             </>)
         })
     }
        
        
     </div>
 </div>

 </section>
     </React.Fragment>
 }
 
       </>
    )
}
export default Contactlist;