import React from "react";
import { Link } from "react-router-dom";



let Navbar=()=>{
    return(
        <>
             <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
             <Link to={"/"} className="navbar-brand">
                     <h2 className="text-white">  
                     <i class="fa-brands fa-facebook-f text-primary px-2"></i>
                     Contact-Manger</h2></Link>
                    
                </div>
            </nav>
        </>
    )
}
export default Navbar;