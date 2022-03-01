import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Navbar from './component/nav bar/nav';
import Contactlist from './component/contact list/Contactlist';
import { Navigate, Route, Routes } from 'react-router-dom';
import Addcontact from './component/add contact/Addcontact';
import Editcontact from './component/edit contact/Editcontact';
import Viewcontact from './component/view contact/view contact'
import Spiner from "./component/spiner/Spinner"





function App() {
  return (<>

   <Navbar></Navbar>
 

  <Routes>
    <Route path={"/"} element={<Navigate to={"/contact/list"}></Navigate>}/>
    <Route path={"/contact/list"}  element={<Contactlist></Contactlist>}/>
    <Route path={"/contact/add"} element={<Addcontact></Addcontact>}/>
    <Route path={"/contact/edit/:contactId"} element={<Editcontact></Editcontact>}/>
    <Route path={"/contact/view/:contactId"} element={<Viewcontact></Viewcontact>}/>
  </Routes>
   </>
  );
}

export default App;
