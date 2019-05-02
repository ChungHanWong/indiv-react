import React from 'react';
import axios from 'axios';
import {  ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom'

const ArtworkForm = ({ artwork }) => {
    const handleSubmitSold = (event) => {
        event.preventDefault()
        let fd = new FormData();
        fd.append('id', artwork.id )
        axios.post("http://127.0.0.1:5000/sold/", fd)
        .then(response => {
            console.log(response.data)
            window.location.reload()
        })
        .catch(error => {
        alert("error uploading")
        })
        
    }

    return (
        <>
            <ListGroupItem tag={Link} to={`/detail/${artwork.id}`}>
                Name of Artwork :{artwork.name}  
                Id : {artwork.id}    
                Price : {artwork.price}
                Bidder's Name : {artwork.bidder_name}      
            </ListGroupItem>
            <form onSubmit={handleSubmitSold} >
                <button type="submit"  > Accept Offer </button>
            </form>
        </>
    )
}



export default ArtworkForm