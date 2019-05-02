import React from 'react';
import {  ListGroupItem} from 'reactstrap';
import { Link } from 'react-router-dom'

const listOfBid = ({bid}) => {
    return(
        <>
        <div>
            <ListGroupItem  tag={Link} to={`/detail/${bid.id}`}>
                Name of Artwork :{bid.name}  
                Id : {bid.id}
                Bidding Price : {bid.price}
            </ListGroupItem>
        </div>
       </>
        
    )
}

export default listOfBid