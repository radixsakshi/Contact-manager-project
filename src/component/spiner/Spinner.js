import React from "react";
import spinnerImg from '../asset/img/d3f472b06590a25cb4372ff289d81711_w200.gif'

let Spiner=()=>{

    return(
        <>
            <div>
                <img src={spinnerImg} className="d-block m-auto" style={{width:"150px"}} ></img>
            </div>
        </>
    )
}
export default Spiner;