import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Submit extends React.Component {
    constructor(props) {
        super(props);
         this.state = { 
             name : '',
             category : '',
             description : '' ,
             picture : null,
             userid : sessionStorage.getItem('id'), };
        
    }

  
    handleSubmit = event => {
    event.preventDefault()
    let {name,category,description,picture,userid} = this.state;
    let fd = new FormData();
    fd.append('picture', picture )
    fd.append('name', name)
    fd.append('category', category)
    fd.append('description', description)
    fd.append('id', userid)
    axios.post("https://aqueous-journey-66824.herokuapp.com/paintings/paintingsubmit", fd, {headers: {
        'Content-Type': 'multipart/form-data'
      }})
    .then(response => {
        console.log(response.data)
        alert(response.data)
    })
    .catch(error => {
    alert("error uploading")
    })
    }

    handleNameInput = event => {
        this.setState({ name: event.target.value })
    }

    handleCategoryInput = event => {
        this.setState({ category: event.target.value })
    }

    handleDescriptionInput = event => {
        this.setState({ description: event.target.value })
    }

    fileSelectedHandler = event => {
        this.setState({ picture : event.target.files[0] })
    }

    render() {
        
        return (
            
          <div >
                <Form onSubmit={this.handleSubmit}>
                    <h1> Painting </h1>
                    <hr></hr>
                    <div className="backtogallery" >
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Name of Painting"
                            onChange={this.handleNameInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Select Category</Label>
                        <Input type="select" name="category" onChange={this.handleCategoryInput} >
                            <option> ---- </option>
                            <option>Romantic</option>
                            <option>Modern</option>
                            <option>Drawing</option>
                            <option>Photography</option>
                            
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={this.handleDescriptionInput}
                        />
                    </FormGroup>
                    <div>
                        <input type="file" onChange = {this.fileSelectedHandler} />
                    
                    </div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </div>
                </Form>
            
            
          </div>
        );
    }

}

export default Submit;