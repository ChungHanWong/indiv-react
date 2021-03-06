import React from 'react';
import axios from 'axios';
import {  ListGroupItem,Button,Form } from 'reactstrap';
import { Link } from 'react-router-dom'


const PurchaseForm = ({ purchase }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        let fd = new FormData();
        fd.append('id', purchase.id )
        axios.post("https://aqueous-journey-66824.herokuapp.com/sold/paid", fd)
        .then(response => {
            window.location.assign('https://ancient-springs-26000.herokuapp.com/Braintree')
        })
        .catch(error => {
        alert("error uploading")
        })
    }


    return (
        <>
        <div >
            <div className="purchaseForm">
                <ListGroupItem tag={Link} to={`/detail/${purchase.id}`}>
                    Name of Artwork :{purchase.name}  
                    Id : {purchase.id}          
                </ListGroupItem>
            </div>
            <div className="purchaseForm">
                <Form onSubmit={handleSubmit} >
                    <Button color="primary" type="submit"> Confirm Purchase</Button>
                </Form>
            </div>
        </div>
        </>
        
    )
}

export default PurchaseForm