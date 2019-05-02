import React from 'react';
import axios from 'axios';
import {  ListGroupItem,Button,Form } from 'reactstrap';
import { Link } from 'react-router-dom'


const PurchaseForm = ({ purchase }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(purchase.id)
        let fd = new FormData();
        fd.append('id', purchase.id )
        axios.post("http://127.0.0.1:5000/sold/paid", fd)
        .then(response => {
            console.log(response.data.message)
            
            
            window.location.assign('http://localhost:3000/Braintree')
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
                    <Button color="primary" type="submit"  > Confirm Purchase</Button>
                </Form>
            </div>
        </div>
        </>
        
    )
}

export default PurchaseForm