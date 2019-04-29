import React from 'react';
import axios from 'axios';
import { Media,Button } from 'reactstrap';
import {  Form } from 'reactstrap';
import nopic from './no_pic.gif'
import Modal from '../containers/Modal'
import { Link } from 'react-router-dom'
import {  ListGroupItem } from 'reactstrap';

class OtherProfiles extends React.Component {
    state = {
        username:'',
        profilepic:'',
        bio : '',
        artwork : '',

    }

    componentDidMount() {
        let id = this.props.match.params.id
        axios.get(`http://localhost:5000/profile/others/${id}` )
            .then(response => {
                console.log(response.data)
                this.setState({username:response.data.username})
                this.setState({bio:response.data.bio})
                this.setState({profilepic:response.data.profilepic})
                this.setState({artwork:response.data.artwork})
                
            })
            .catch(error => {    
                console.log('ERROR: ', error)
            })
    }

    createList = () => {
        let artwork = this.state.artwork
        let work = []
        
        for (let i = 0; i < artwork.length; i++) {
            work.push(<ListGroupItem tag={Link} to={`/detail/${artwork[i].id}`}>Name of Artwork :{artwork[i].name} Bidding Price : ${artwork[i].price} Bidder's Name : {artwork[i].bidder_name}</ListGroupItem>)
        }
        return work
    }

    render(){
        console.log(this.state.artwork)
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
               
                </Media>
                <Media body>
                    <Media heading className="mediaheading">
                    <h1>{this.state.username}</h1>
                    </Media>
                    {this.state.bio === null?
                    <p className = "details">This Artist Has Nothing To Say</p>
                    :
                    <p className = "details">{this.state.bio}</p>
                    }
                
                    </Media>
                </Media>
                
                
                <div class="listOfArtwork">
                <h3>Artist's Artwork</h3>
                    {this.createList()}
                    
                </div>
            </>
        )
    }
}

export default OtherProfiles