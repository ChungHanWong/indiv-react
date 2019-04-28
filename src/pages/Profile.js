import React from 'react';
import axios from 'axios';
import { Media,Button } from 'reactstrap';
import {  Form } from 'reactstrap';
import nopic from './no_pic.gif'
import Modal from '../containers/Modal'
import { pbkdf2 } from 'crypto';



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
                let propic = sessionStorage.getItem('profilepic')
                let bi = sessionStorage.getItem('bio')
                let name = sessionStorage.getItem('username')
                console.log(response.data.logged_in_as.username)
                this.setState({username:name})
                this.setState({bio:bi})
                this.setState({profilepic:propic})
                
                //this.setState({currentUser: this.props.currentUser})
            })
    }

    handleSubmit = event => {
        event.preventDefault()
        let {picture,username} = this.state;
        let fd = new FormData();
        fd.append('picture', picture )
        fd.append('username', username)
        axios.post("http://127.0.0.1:5000/profile/edit", fd, {headers: {
            'Content-Type': 'multipart/form-data'
          }})
        .then(response => {
            console.log(response.data)
            alert(response.data)
            sessionStorage.setItem('profilepic', response.data.profilepic)
            // this.setState({profilepic : response.data.profilepic})
            window.location.reload()
        })
        .catch(error => {
        alert("error uploading")
        })
        }

    handleSubmitBio = event => {
        event.preventDefault()
        let {bio,username} = this.state;
        let fd = new FormData();
        fd.append('bio', bio )
        fd.append('username', username)
        axios.post("http://127.0.0.1:5000/profile/editbio", fd, {headers: {
            'Content-Type': 'multipart/form-data'
            }})
        .then(response => {
            console.log(response.data)
            alert(response.data)
            sessionStorage.setItem('bio', response.data.bio)
            // this.setState({profilepic : response.data.profilepic})
            window.location.reload()
        })
        .catch(error => {
        alert("error uploading")
        })
        }


    fileSelectedHandler = event => {
        this.setState({ picture : event.target.files[0] })
    }   

    editingbio = event => {
        this.setState({bio : event.target.value})
    }

    
    render() {
        console.log(this.state.profilepic)
        
        return(
            <>
                <h1>Profile Page</h1>
                <Media>
                <Media left href="#">
                    {this.state.profilepic?
                    <Media className="mediaprofilepic" src = {this.state.profilepic} alt="Generic placeholder image" />
                    
                    :
                    <Media className="mediaprofilepic" src = {nopic} alt="Generic placeholder image" />
                    }
                <div className="picSubmit">
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="file" onChange = {this.fileSelectedHandler} />
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                </Media>
                <Media body>
                    <Media heading className="mediaheading">
                    <h1>{this.state.username}</h1>
                    </Media>
                    {this.state.bio === null?
                    <p className = "details">Write Something About Yourself</p>
                    :
                    <p className = "details">{this.state.bio}</p>
                    }
                    <div className='profilemodal'>
                    <Modal editingbio={this.editingbio} handleSubmitBio={this.handleSubmitBio} />
                    </div>
                    </Media>
                </Media>
            </>
        )
    }
    
}


export default Profile;