import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends React.Component {
	state={
		username : '',
		emailaddress: '' ,
		password: '',
	}
	

    handleSubmit = event => {
    	let {username, emailaddress, password} = this.state;
	    event.preventDefault();
	    axios.post("http://127.0.0.1:5000/users/", {
		  username: username,
		  email: emailaddress,
		  password: password,
        })
        .then(response => {
            alert("You Have SignedUp")
        })
		.catch(error => {
			
			alert("error")
		})

  	}

  	handleUserNameInput = event => {
    	this.setState({ username: event.target.value })
  	}

  	handleEmailInput = event => {
    	this.setState({ emailaddress: event.target.value })
  	}

  	handlePasswordInput = event => {
    	this.setState({ password: event.target.value })
    }

    render(){
        console.log(this.state.username)
        return(
            <>
                <Form onSubmit={this.handleSubmit}>
                    <h1> SignUp </h1>
                    <hr></hr>
                    <FormGroup>
                        <Label for="name">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleUserNameInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            onChange={this.handleEmailInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handlePasswordInput}
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </>
			)
		}
			

}


export default SignUp;
      
