import React from 'react';
import {  ListGroupItem} from 'reactstrap';
import { Link } from 'react-router-dom'

const listOfBid = ({pur}) => {
    return(
       <>
        <div>
           <ListGroupItem   tag={Link} to={`/detail/${pur.id}`}>
                <span>Name of Artwork :{pur.name} </span> 
                <span>Id : {pur.id} </span> 
                <span>Price : {pur.price} </span> 
            </ListGroupItem>
        </div>
       </>
 
    )
}

export default listOfBid