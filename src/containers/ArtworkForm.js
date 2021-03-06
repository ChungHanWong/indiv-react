import React from 'react';
import axios from 'axios';
import {  ListGroupItem,Button,Form } from 'reactstrap';
import { Link } from 'react-router-dom'

const ArtworkForm = ({ artwork }) => {
    const handleSubmitSold = (event) => {
        event.preventDefault()
        let fd = new FormData();
        fd.append('id', artwork.id )
        axios.post("https://aqueous-journey-66824.herokuapp.com/sold/", fd)
        .then(response => {
            console.log(response.data)
            window.location.reload()
        })
        .catch(error => {
        alert("error uploading")
        })
        
    }

    const handleSubmitDelete = (event) => {
        event.preventDefault()
        alert("Confirm Delete?")
        let fd = new FormData();
        fd.append('id', artwork.id )
        axios.post("https://aqueous-journey-66824.herokuapp.com/paintings/delete", fd)
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
        <div className='artworkListInner' >
            <div  >
                <ListGroupItem tag={Link} to={`/detail/${artwork.id}`}>
                    <span>Name of Artwork :{artwork.name}  </span>  
                    <span>Price : ${artwork.price}   </span>     
                    <span>Bidder's Name : {artwork.bidder_name}   </span> 
                    <img alt="pic" className = "imagelists" src ={artwork.image}/>     
                </ListGroupItem>
            </div>
            <div className="purchaseForm">
                    <Form onSubmit={handleSubmitDelete} >
                        <Button color="danger" type="submit"  > Delete </Button>
                    </Form>
            </div>
            {artwork.sold===false?
                <div className="purchaseForm">
                    <Form onSubmit={handleSubmitSold} >
                        <Button color="warning" type="submit"  > Accept Offer </Button>
                    </Form>
                </div>
                :
                <div className="purchaseForm">
                    <p className = "picSubmit">This Artwork is Sold</p>
                </div>
            }
        </div>
        </>
    )
}



export default ArtworkForm