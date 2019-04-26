import React from 'react';
import axios from 'axios';


class Profile extends React.Component {
    state = {
        username:'',
        email:'',
    }
    componentDidMount() {
        axios.get('http://localhost:5000/profile/', 
            { headers: { Authorization: `Bearer ${sessionStorage.getItem('autoken')}` } })
            .then(response => {
                alert(response.data)
                console.log(response.data)
                // this.setState({images:response.data})
                // this.setState({isLoading:false})
                //this.setState({currentUser: this.props.currentUser})
            })
    }


    render() {
        return(
            <>
                <h1>Profile Page</h1>
                {/* <Media>
                <Media left href="#">
                    <Media className="mediaimg" src = "" alt="Generic placeholder image" />
                </Media>
                <Media body>
                    <Media heading className="mediaheading">
                    {this.state.name}
                    </Media>
                    <p className = "details">{this.state.description}</p>
                    <div>
                    <p className = "details">Price :{this.state.price}</p>
                    </div>
                    </Media>
            </Media> */}
            </>
        )
    }
}


export default Profile;