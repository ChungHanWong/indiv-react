import React from 'react';
import loadinggif from '../Images/loader2.gif'



const Loader = () => {
	return(
	<div className="gifContainer">
    	<img src = {loadinggif} className="gif" alt="gif" />
	</div>

)}

export default Loader
