import React from 'react';
import axios from 'axios';
import { Media,Button } from 'reactstrap';
import {  Form,FormGroup,Input,Label } from 'reactstrap';
import nopic from './no_pic.gif'
import Modal from '../containers/Modal'
import { pbkdf2 } from 'crypto';
import {  ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom'
// import Purchase from '../containers/Purchase'


class Profile extends React.Component {
    constructor(props){
    super(props);
    this.input = React.createRef();
    this.state = {
        username:'',
        profilepic:'',
        bio : '',
        picture : null,
        artwork : '',
        id_sold : '',
        // purchased:'',

    }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/profile/', 
            { headers: { Authorization: `Bearer ${sessionStorage.getItem('autoken')}` } })
            .then(response => {
                let propic = sessionStorage.getItem('profilepic')
                let bi = sessionStorage.getItem('bio')
                let name = sessionStorage.getItem('username')
                
                this.setState({username:name})
                this.setState({bio:bi})
                this.setState({profilepic:propic})
                this.setState({artwork:response.data.artwork})
                // this.setState({purchased:response.data.purchase})
                //this.setState({currentUser: this.props.currentUser})
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

    handleIdSold = (event) => {
        this.setState({id_sold: event.target})
    }

    handleSubmitSold = event => {
        event.preventDefault()
        let fd = new FormData();
        fd.append('id', this.input.current.value )
        axios.post("http://127.0.0.1:5000/sold/", fd, {headers: {
            'Content-Type': 'multipart/form-data'
            }})
        .then(response => {
            console.log(response.data)
            alert(response.data)
            
            window.location.reload()
        })
        .catch(error => {
        alert("error uploading")
        })
        
    }

    createListOfArtwork = () => {
        let artwork = this.state.artwork
        let work = []
        for (let i = 0; i < artwork.length; i++) {
            work.push(
            <>
            {artwork[i].sold === false?
            <>
            <ListGroupItem tag={Link} to={`/detail/${artwork[i].id}`}>Name of Artwork :{artwork[i].name} Bidding Price : ${artwork[i].price} Bidder's Name : {artwork[i].bidder_name} 
            </ListGroupItem>
                <form onSubmit={this.handleSubmitSold}>
                    <input type="hidden" value={artwork[i].id} ref={this.input} />
                    <input type="submit" value="Accept The Offer" />
                </form>
            </>
            :
            ""
            }     
            </>
            )
        }
        return work
      }

    //   createListOfPurchase = () => {
    //     let purchase = this.state.purchased
    //     let bought = []
    //     for (let i = 0; i < purchase.length; i++) {
    //         purchase.push(
    //         <>
    //         <ListGroupItem tag={Link} to={`/detail/${purchase[i].id}`}>Name of Artwork :{purchase[i].name} Bidding Price : ${purchase[i].price} Bidder's Name : {purchase[i].bidder_name} 
    //         </ListGroupItem>
    //             <form >
    //                 <input type="hidden" value={purchase[i].id} ref={this.input} />
    //                 <input type="submit" value="Confirm Purchase" />
    //             </form>
    //         </>
    //         )
    //     }
    //     return bought
    //   }
    
    
    render() {
        
        console.log(this.state.purchased)
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
                
                
                <div class="listOfArtwork">
                    <h3>Artist's Artwork</h3>
                    {this.createListOfArtwork()}
                    
                </div>

                {/* { 
                    this.state.artwork.map(artwork => {
                        return(
                            <>
                            {artwork.sold === false?
                                <>
                                <ListGroupItem tag={Link} to={`/detail/${artwork.id}`}>Name of Artwork :{artwork.name} Bidding Price : ${artwork.price} Bidder's Name : {artwork.bidder_name} 
                                </ListGroupItem>
                                    <form onSubmit={this.handleSubmitSold}>
                                        <input type="hidden" value={artwork.id} ref={this.input} />
                                        <input type="submit" value="Accept The Offer" />
                                    </form>
                                </>
                                :
                                ""
                            }     
                            </>
                        )
                    })
                } */}
            </>
        )
    }
    
}


export default Profile;