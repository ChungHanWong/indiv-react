import React from 'react';
import {  ListGroupItem} from 'reactstrap';
import { Link } from 'react-router-dom'

const listOfBid = ({pur}) => {
    return(
       <>
        <div>
           <ListGroupItem   tag={Link} to={`/detail/${pur.id}`}>
                Name of Artwork :{pur.name}  
                Id : {pur.id}
            </ListGroupItem>
        </div>
       </>
 
    )
}

export default listOfBid