import React from 'react';
import axios from 'axios';
import { Media,Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import nopic from './no_pic.gif'


class Profile extends React.Component {
    state = {
        username:'',
        profilepic:'',
        bio : '',
        picture : null,

    }
    componentDidMount() {
        axios.get('http://localhost:5000/profile/', 
            { headers: { Authorization: `Bearer ${sessionStorage.getItem('autoken')}` } })
            .then(response => {
                
                console.log(response.data.logged_in_as.username)
                this.setState({username:response.data.logged_in_as.username})
                this.setState({bio:response.data.logged_in_as.bio})
                this.setState({profilepic:response.data.logged_in_as.profilepic})
                
                //this.setState({currentUser: this.props.currentUser})
            })
    }

    handleSubmit = event => {
        event.preventDefault()
        let {picture} = this.state;
        let fd = new FormData();
        fd.append('picture', picture )
        axios.post("http://127.0.0.1:5000/profile/edit/", fd, {headers: {
            'Content-Type': 'multipart/form-data'
          }})
        .then(response => {
            // console.log(response.data)
            // alert(response.data)
        })
        .catch(error => {
        alert("error uploading")
        })
        }

        
    fileSelectedHandler = event => {
        this.setState({ picture : event.target.files[0] })
    }   


    render() {
        console.log(this.state.picture)
        return(
            <>
                <h1>Profile Page</h1>
                <Media>
                <Media left href="#">
                    {/* <img src = {nopic} /> */}
                    <Media className="mediaprofilepic" src = {nopic} alt="Generic placeholder image" />
                    {/* <Media className="mediaimg" src = {this.state.profilepic} alt="Generic placeholder image" /> */}
                <Form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="file" onChange = {this.fileSelectedHandler} />
                    </div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Media>
                <Media body>
                    <Media heading className="mediaheading">
                    {this.state.username}
                    </Media>
                    <p className = "details">{this.state.bio}</p>
                   
                    </Media>
                </Media>
            </>
        )
    }
}


export default Profile;