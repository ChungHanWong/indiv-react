import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageUploader from 'react-images-upload';

class Submit extends React.Component {
    constructor(props) {
        super(props);
         this.state = { 
             name : '',
             category : '',
             description : '' ,
             picture : null,
             userid : sessionStorage.getItem('id'), };
        //  this.onDrop = this.onDrop.bind(this);
    }
    // onDrop(picture) {
    //     this.setState({
    //         pictures: this.state.pictures.concat(picture),
    //     });
    // }
  
    handleSubmit = event => {
    event.preventDefault()
    let {name,category,description,picture,userid} = this.state;
    let fd = new FormData();
    fd.append('picture', picture )
    fd.append('name', name)
    fd.append('category', category)
    fd.append('description', description)
    fd.append('id', userid)
    axios.post("http://127.0.0.1:5000/paintings/paintingsubmit", fd, {headers: {
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
        console.log(this.state.userid)
        return (
            
          <div >
                <Form onSubmit={this.handleSubmit}>
                    <h1> Painting </h1>
                    <hr></hr>
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
                            <option>Baroque</option>
                            <option>Romantic</option>
                            <option>Medieval</option>
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
                </Form>
                
                <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif','.jpeg']}
                maxFileSize={5242880}
                />
            
          </div>
        );
    }

}

export default Submit;