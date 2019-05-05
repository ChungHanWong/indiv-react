import React from 'react';
import axios from 'axios';
import { Media } from 'reactstrap';
import nopic from './no_pic.gif'
import ArtworkForm from '../containers/ArtworkForm'
import Loader from '../components/Loader'

class OtherProfiles extends React.Component {
    state = {
        username:'',
        profilepic:'',
        bio : '',
        artwork : [],
        loading : true,
    }

    componentDidMount() {
        let id = this.props.match.params.id
        axios.get(`https://aqueous-journey-66824.herokuapp.com/profile/others/${id}` )
            .then(response => {
                
                this.setState({username:response.data.username})
                this.setState({bio:response.data.bio})
                this.setState({profilepic:response.data.profilepic})
                // this.setState({artwork:response.data.artwork})

                for (let i =0;i<response.data.artwork.length;i++){
                    const { name, price,bidder_name,sold,image,id } = response.data.artwork[i]
                    this.setState({
                        artwork: [
                            ...this.state.artwork,
                            { name, price, bidder_name,sold,image,id }
                        ]
                    })
                }

                this.setState({loading : false})
                
            })
            .catch(error => {    
                console.log('ERROR: ', error)
            })
    }


    render(){
        if(this.state.loading===true) {
            return(
                <>
                    <Loader/>
                </>
            )
        }
        else {
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
                
                    </Media>
                    <Media body>
                        <Media heading className="mediaheading">
                        {this.state.username}
                        </Media>
                        {this.state.bio === null ?
                        <p className = "details">This Artist Has Nothing To Say</p>
                        :
                        <p className = "details">{this.state.bio}</p>
                        }
                    
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
}

export default OtherProfiles