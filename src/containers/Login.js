import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'

class Login extends React.Component {
    state = {
        emailaddress: '' ,
        password: '',
        
    }

    handleSubmit = event => {
	    event.preventDefault()
	    let {password,emailaddress} = this.state;
	    axios.post("https://aqueous-journey-66824.herokuapp.com/sessions/", {
		  email: emailaddress,
		  password: password
		})
		.then(response => {
            if (response.data.message==='Email Address Does Not Exist' || response.data.message==='Wrong Password' ){
		 	    alert(response.data.message)
            }
            else {
                sessionStorage.setItem('autoken', response.data.access_token)
                sessionStorage.setItem('id', response.data.id)
                sessionStorage.setItem('username', response.data.username)
                sessionStorage.setItem('email', response.data.email)
                sessionStorage.setItem('profilepic', response.data.profilepic)
                sessionStorage.setItem('bio', response.data.bio)
                window.location.assign('https://ancient-springs-26000.herokuapp.com/')
            }
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
                    <div className="backtogallery" >
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
                    </div>
                </Form>
               

                <div className="backtogallery">
                
                <Button  color="link" tag={Link} to={`/SignUp`}>New Member? Sign Up Now</Button>
            
                </div>

            </>
			)
		}  

}

export default Login;
