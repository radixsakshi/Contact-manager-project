import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contactservice } from "../../service/Contactservice";

let Addcontact=()=>{
    let navigate= useNavigate()
  let [state,setState]=useState({
      loading:false,
      contact:{
          name:"",
          photo:"",
          mobile:"",
          email:"",
          company:"",
          groupId:""
      },
      groups:[],
      errorMessage:""
  })
  let updateInput=(e)=>{
      setState(
          {
              ...state,
              contact:{
                  ...state.contact,
                  [e.target.name]:e.target.value
              }
          }
      )

  }

useEffect(
    async()=>{
        try{
        setState({...state, loading:true})
        let response= await Contactservice.getGroups();

        setState(
            {
                ...state,
                loading:false,
                groups:response.data


            }
        )
        }
        catch(error){

        }
    },[]
)

let submitFrom = async(event)=>{
    event.preventDefault();
    try{
        let response= await Contactservice.createContact(state.contact);
        if(response){
            navigate('/contact/list',{replace:true})
        }
    }
    catch(error){
       setState({...state, errorMessage:error.message})
       navigate('/contact/add',{replace:false})
    }
}

  let {loading,contact,groups, errorMessage}=state
    return(
        <>
            <section className="add-contact p-3">
            <div className="container">
                <div className="row">
                    <div className="col">
                    <h3 className="text-success "> Create Contact</h3>
                    <p className="fst-italic"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type  centuries. </p>
                    </div>
                </div>
              <div className="row">
                  <div className="col-md-4">
                      <form onSubmit={submitFrom}> 
                          <div className="mb-2">
                              <input type="text" className="form-control" placeholder="Name" name="name" value={contact.name} onChange={updateInput} required={true}></input>
                          </div>
                          <div className="mb-2">
                              <input type="text" className="form-control" placeholder="Photo Url" name="photo" value={contact.photo} onChange={updateInput} required={true}></input>
                          </div>
                          <div className="mb-2">
                              <input type="number" className="form-control" placeholder="Mobile" name="mobile" value={contact.mobile} onChange={updateInput} required={true}></input>
                          </div>
                          <div className="mb-2">
                              <input type="email" className="form-control" placeholder="Email" name="email" value={contact.email} onChange={updateInput} required={true}></input>
                          </div>
                          <div className="mb-2">
                              <input type="text" className="form-control" placeholder="Company" name="company" value={contact.company} onChange={updateInput} required={true}></input>
                          </div>
                          <div className="mb-2">
                              <input type="text" className="form-control" placeholder="Title" name="title" value={contact.title} onChange={updateInput} required={true}></input>
                          </div>
                          <div className="mb-2">
                              <select className="form-control" name="groupId" value={contact.groupId} onChange={updateInput} required={true}>
                              <option value="">select a group</option>
                              {
                                  groups.length> 0 && 
                                  groups.map(group=>{
                                      return(
                                          <option key={group.id} value={group.id}> {group.name}</option>
                                      )

                                  })
                              }
                             

                              </select>
                          </div>
                          <div className="mb-2">
                              <input type="submit" className="btn btn-success" value="Create"></input>
                              <Link to={"/contact/list"} className="btn btn-dark ms-2">Cancel</Link>
                          </div>
                      </form>
                  </div>
              </div>
             
            </div>

            </section>
        </>
    )
}
export default Addcontact;