import React from 'react';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Form, FormGroup,Input,Label } from 'reactstrap';
    import "../App.css"
import { Link } from 'react-router-dom'

class Gallery extends React.Component {
    state = {
        category : '',
        images : [],
        search : '',
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

    handleClickDrawing = () => {
        this.setState({category : 'Drawing'})
    }

    handleClickPhotography = () => {
        this.setState({category : 'Photography'})
    }
       
    updateSearch = (event) => {
        this.setState({search: event.target.value})
    }

    
    render(){
        console.log(this.state.category)
        let filteredNames = this.state.images.filter(
            (image) => {
                return image.name.toLowerCase().indexOf(this.state.search) !== -1
            }
        )
        if (this.state.category === "Photography") {
        return (
            <>
            <div className="button">
                <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickBaroque} color="info" className="butt">Baroque</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
            </div>  
            <h3>Category : {this.state.category}</h3>
            <Form>
                <FormGroup>
                    <Label for="name">Search</Label>
                    <Input
                        type="text"
                        value = {this.state.search}
                        placeholder="Name of Painting"
                        onChange={this.updateSearch}
                    />
                </FormGroup>
            </Form>
            
                { 
                   filteredNames.map(image => {
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
                    <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickBaroque} color="info" className="butt">Baroque</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div> 
                <h3>Category : {this.state.category}</h3>
                <Form>
                    <FormGroup>
                        <Label for="name">Search</Label>
                        <Input
                            type="text"
                            value = {this.state.search}
                            placeholder="Name of Painting"
                            onChange={this.updateSearch}
                        />
                    </FormGroup>
                </Form>
                { 
                    filteredNames.map(image => {
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
                    <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickBaroque} color="info" className="butt">Baroque</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div>
                <h3>Category : {this.state.category}</h3>
                <Form>
                    <FormGroup>
                        <Label for="name">Search</Label>
                        <Input
                            type="text"
                            value = {this.state.search}
                            placeholder="Name of Painting"
                            onChange={this.updateSearch}
                        />
                    </FormGroup>
                </Form>
                { 
                    filteredNames.map(image => {
                        return(
                            image.category==="Drawing"
                            ? <div className="galleryimg">
                                    <Card className="gallerycards">
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

        else if (this.state.category === "Romantic") {
            return(
                <>
                <div className="button">
                    <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickBaroque} color="info" className="butt">Baroque</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div>
                <h3>Category : {this.state.category}</h3>
                <Form>
                    <FormGroup>
                        <Label for="name">Search</Label>
                        <Input
                            type="text"
                            value = {this.state.search}
                            placeholder="Name of Painting"
                            onChange={this.updateSearch}
                        />
                    </FormGroup>
                </Form>
                { 
                    filteredNames.map(image => {
                        return(
                            image.category==="Romantic"
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

        else if (this.state.category === "Baroque") {
            return(
                <>
                <div className="button">
                    <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickBaroque} color="info" className="butt">Baroque</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div>
                <h3>Category : {this.state.category}</h3>
                <Form>
                    <FormGroup>
                        <Label for="name">Search</Label>
                        <Input
                            type="text"
                            value = {this.state.search}
                            placeholder="Name of Painting"
                            onChange={this.updateSearch}
                        />
                    </FormGroup>
                </Form>
                { 
                    filteredNames.map(image => {
                        return(
                            image.category==="Baroque"
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
                    <Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickBaroque} color="info" className="butt">Baroque</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div>
                <h3>Category : {this.state.category}</h3>
                <Form>
                    <FormGroup>
                        <Label for="name">Search</Label>
                        <Input
                            type="text"
                            value = {this.state.search}
                            placeholder="Name of Painting"
                            onChange={this.updateSearch}
                        />
                    </FormGroup>
                </Form>
                { 
                    filteredNames.map(image => {
                        return(
                            
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
                            
                        )
                    }
                    )	
                } 
                </>
            )
        }
    }
    


}

export default Gallery