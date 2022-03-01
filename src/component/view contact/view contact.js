import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Contactservice } from "../../service/Contactservice";
import Spiner from "../spiner/Spinner";

let Viewcontact=()=>{
    let {contactId} =useParams();
    let [state,setState]=useState({
        loading:false,
        contact:{},
        errorMessage:"",
        group:{}
    })

     useEffect(
         async ()=>{
             try{
                 setState({...state, loading:true})
           let response= await Contactservice.getContact(contactId);
           let groupResponse = await Contactservice.getGroup(response.data)
             setState({...state,
            loading:false,
            contact:response.data,
            group:groupResponse.data})
             }
             catch(error){
                 setState({
                     ...state,
                     loading:false,
                     errorMessage:error.message
                 })
                 
             }
         },[]
     )
     let {loading,contact,errorMessage,group}=state;
    return(
        <>
       
          <section className="view-contact">
              <div className="container">
                  <div className="row">
                      <div className="col">
                          <h3 className="text-warning">View Contact</h3>
                          <p className="fst-italic"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type  centuries. </p>
                      </div>
                  </div>
              </div>
          </section>
          {
              loading ? <Spiner></Spiner>:<React.Fragment>
             {
                 Object.keys(contact).length> 0 && Object.keys(group).length &&
                 <section className="view-contact-list">
              <div className="container">
                  <div className="row">
                      <div className="col-md-4">
                      <img src={contact.photo} className="contact-img"></img>
                      </div>
                      <div className="col-md-8">
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
                             <li className="list-group-item list-group-item-action">
                                 Company: <span className="fw-bold">{contact.company}</span>
                             </li>
                             <li className="list-group-item list-group-item-action">
                                 Title: <span className="fw-bold">{contact.title}</span>
                             </li>
                             <li className="list-group-item list-group-item-action">
                                 Group: <span className="fw-bold">{group.name}</span>
                             </li>
                         </ul>
                        
                      <div className="col">
                          <Link to={"/contact/list"} className="btn btn-warning ms-5"><i className="fa fa-arrow-left"></i> &nbsp;&nbsp;Back</Link>
                      
                  </div>
                      </div>
                      
                  </div>
                 
              </div>
          </section>
             }
              </React.Fragment>
          }
        
        </>
    )
}
export default Viewcontact;