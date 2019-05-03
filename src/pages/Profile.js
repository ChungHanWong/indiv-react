import React from 'react';
import axios from 'axios';
import { Media,Button } from 'reactstrap';
import {  Form } from 'reactstrap';
import nopic from './no_pic.gif'
import Modal from '../containers/Modal'


import ArtworkForm from '../containers/ArtworkForm'


class Profile extends React.Component {
    constructor(props){
    super(props);
    this.input = React.createRef();
    this.state = {
        username:'',
        profilepic:'',
        bio : '',
        picture : null,
        artwork : [],
    }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/profile/', 
            { headers: { Authorization: `Bearer ${sessionStorage.getItem('autoken')}` } })
            .then(response => {
                let propic = sessionStorage.getItem('profilepic')
                let bi = sessionStorage.getItem('bio')
                let username = sessionStorage.getItem('username')
                
                this.setState({username:username})
                this.setState({bio:bi})
                this.setState({profilepic:propic})
                for (let i =0;i<response.data.artwork.length;i++){
                    const { name, price, id, bidder_name,sold,image } = response.data.artwork[i]
                    this.setState({
                        artwork: [
                            ...this.state.artwork,
                            { name, price, id, bidder_name,sold,image }
                        ]
                    })
                }
            })
            .catch(error => {    
                console.log('ERROR: ', error)
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
        
        return(
            <>
                <h1>Profile Page</h1>
                <Media>
                <Media left href="#">
                    {this.state.profilepic === 'http://hanagram.s3.amazonaws.com/None' ?
                    <Media className="mediaprofilepic" src = {nopic} alt="Generic placeholder image" />
                    :
                    <Media className="mediaprofilepic" src = {this.state.profilepic} alt="Generic placeholder image" />

                    }
                <div className="picSubmit">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="purchaseForm">
                            <input type="file" onChange = {this.fileSelectedHandler} />
                        </div>
                        <div className="purchaseForm">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
                </Media>
                <Media body>
                    <Media heading className="mediaheading">
                    {this.state.username}
                    </Media>
                    {this.state.bio === 'null'  ?
                    <p className = "details">Write Something About Yourself</p>
                    :
                    <p className = "details">{this.state.bio}</p>
                    }
                    <div className='profilemodal'>
                    <Modal editingbio={this.editingbio} handleSubmitBio={this.handleSubmitBio} />
                    </div>
                    </Media>
                </Media>
                
                
                <div className="listOfArtwork">
                    <h3>List of Artist's Artwork</h3>
                    {this.state.artwork.map(art =>
                        <ArtworkForm key={art.name} artwork={art} />
                    )
                    }
                    
                </div>
            </>
        )
    }
    
}

export default Profile;