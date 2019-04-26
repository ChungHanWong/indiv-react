import React from 'react';
import axios from 'axios';
import { Media,Button } from 'reactstrap';


class Profile extends React.Component {
    state = {
        username:'',
        profilepic:'',
        bio : '',

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


    render() {
        return(
            <>
                <h1>Profile Page</h1>
                <Media>
                <Media left href="#">
                    <Media className="mediaimg" src = {this.state.profilepic} alt="Generic placeholder image" />
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