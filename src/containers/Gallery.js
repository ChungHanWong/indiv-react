import React from 'react';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
    import "../App.css"
import { Link } from 'react-router-dom'

class Gallery extends React.Component {
    state = {
        category : 'Modern',
        images : [],
    }

    componentDidMount()  {
        axios.get('http://127.0.0.1:5000/paintings/offer')
        .then(result => {
            
            for (let i =0;i<result.data.length;i++){
                let newName = result.data[i].name
                let description = result.data[i].description
                let category = result.data[i].category
                let image = result.data[i].image
                let id = result.data[i].id
                let obj = {}
                obj['name'] = newName
                obj['category'] = category
                obj['description'] = description
                obj['image'] = image
                obj['id'] = id
                
                let newnew= this.state.images
                newnew.push(obj)
            
                this.setState({
                    images : newnew,
                })
            }
        })
        .catch(error => {    
            console.log('ERROR: ', error)
        })
    }
        
    handleClickModern = () => {
        this.setState({category : 'Modern'})
    }

    handleClickBaroque = () => {
        this.setState({category : 'Baroque'})
    }

    handleClickRomantic = () => {
        this.setState({category : 'Romantic'})
    }

    handleClickMedieval = () => {
        this.setState({category : 'Medieval'})
    }

    handleClickDrawing = () => {
        this.setState({category : 'Drawing'})
    }

    handleClickPhotography = () => {
        this.setState({category : 'Photography'})
    }
       
    

    
    render(){
        
        if (this.state.category === "Photography") {
        return (
            <>
            <div className="button">
                <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickBaroque} color="secondary" className="butt">Baroque</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickMedieval} color="info" className="butt">Medieval</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
            </div>  
            <h3>Category : {this.state.category}</h3>
                { 
                    this.state.images.map(image => {
                        return(
                            image.category==="Photography"
                            ? <div className="galleryimg">
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
                            : ""
                        )
                    }
                    )	
                } 
            </>
            
                
        )
        }
        else if (this.state.category === "Modern") {
            return(
                <>
                <div className="button">
                    <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickBaroque} color="secondary" className="butt">Baroque</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickMedieval} color="info" className="butt">Medieval</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div> 
                <h3>Category : {this.state.category}</h3>
                { 
                    this.state.images.map(image => {
                        return(
                            image.category==="Modern"
                            ? <div className="galleryimg">
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
                            : ""
                        )
                    }
                    )	
                } 
                </>
            )
        }
        else if (this.state.category === "Drawing") {
            return(
                <>
                <div className="button">
                    <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickBaroque} color="secondary" className="butt">Baroque</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickMedieval} color="info" className="butt">Medieval</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div> 
                <h3>Category : {this.state.category}</h3>
                { 
                    this.state.images.map(image => {
                        return(
                            image.category==="Drawing"
                            ? <div className="galleryimg">
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
                            : ""
                        )
                    }
                    )	
                } 
                </>
            )
        }
        
        else{
            return(
                <>
                <div className="button">
                    <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickBaroque} color="secondary" className="butt">Baroque</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickMedieval} color="info" className="butt">Medieval</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div> 
                <p>No Artwork Available</p>
                </>
            )
        }
    }
    


}

export default Gallery