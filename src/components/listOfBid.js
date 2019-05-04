import React from 'react';
import {  ListGroupItem} from 'reactstrap';
import { Link } from 'react-router-dom'

const listOfBid = ({bid}) => {
    return(
        <>
        <div>
            <ListGroupItem  tag={Link} to={`/detail/${bid.id}`}>
                <span> Name of Artwork :{bid.name}  </span>
                <span> Id : {bid.id} </span>
                <span> Bidding Price : {bid.price} </span>
            </ListGroupItem>
        </div>
       </>
        
    )
}

export default listOfBid