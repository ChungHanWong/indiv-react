import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Login extends React.Component {
    state = {
        emailaddress: '' ,
        password: '',
        
    }

    handleSubmit = event => {
	    event.preventDefault()
	    let {password,emailaddress} = this.state;
	    axios.post("http://localhost:5000/sessions/", {
		  email: emailaddress,
		  password: password
		})
		.then(response => {
		 	console.log(response.data)
		 	alert(response.data.username)
		 	    sessionStorage.setItem('autoken', response.data.access_token)
		 	    sessionStorage.setItem('id', response.data.id)
                sessionStorage.setItem('username', response.data.username)
                sessionStorage.setItem('email', response.data.email)
                sessionStorage.setItem('profilepic', response.data.profilepic)
                sessionStorage.setItem('bio', response.data.bio)
                window.location.reload()
		//  	sessionStorage.setItem('currentUserPic', `http://next-curriculum-instagram.s3.amazonaws.com/${response.data.user.profile_picture}`)
		})
		.catch(error => {
			
			alert("error")
			
  		})
  	}
    

    handleEmailInput = event => {
        this.setState({ emailaddress: event.target.value })
  	}

  	handlePasswordInput = event => {
    	this.setState({ password: event.target.value })
    }
      
    render(){
        console.log(this.state.login)
        return(
            <>
                <Form onSubmit={this.handleSubmit}>
                    <h1> Login </h1>
                    <hr></hr>
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

export default Login;
