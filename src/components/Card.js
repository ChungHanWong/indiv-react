import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const card = ({image}) => {
    return(
        <>
        <div className="galleryimg">
            <Card className="card">
                <CardImg className="hi" src={image.image} alt="Card image cap" />
                <CardBody>
                <CardTitle>{image.name}</CardTitle>
                <CardSubtitle>{image.category}</CardSubtitle>
                <CardText>{image.description}</CardText>
                
                <Button tag={Link} to={`/detail/${image.id}`}>View Detail</Button>
                </CardBody>
            </Card>
        </div>
        </>
        
    )
}

export default card

