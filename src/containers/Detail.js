import React from 'react';
import axios from 'axios';
import { Media,Button } from 'reactstrap';
import { Link } from 'react-router-dom'


class Detail extends React.Component {
    state = {
        name : "",
        category :"",
        description :"",
        price: "",
        image:"",
    }

    componentDidMount()  {
        let id = this.props.match.params.id
        axios.get(`http://127.0.0.1:5000/paintings/offer/${id}`)
        .then(result => {
            console.log(result)
            let name = result.data.name
            let category = result.data.category
            let description = result.data.description
            let image = result.data.image
            let price = result.data.price
            
            this.setState({
                name : name,
                category :category,
                description:description,
                image : image,
                price : price,
            })
            
        })
        .catch(error => {    
            console.log('ERROR: ', error)
        })
    }

    

    render() {
        console.log(this.state.name)
        return(
            <>
             <Media>
                <Media left href="#">
                    <Media className="mediaimg" src = {this.state.image} alt="Generic placeholder image" />
                </Media>
                <Media body>
                    <Media heading className="mediaheading">
                    <h1>{this.state.name}</h1>
                    </Media>
                    <p className = "details">{this.state.description}</p>
                    <div>
                    <p className = "details">Price :{this.state.price}</p>
                    </div>
                    </Media>
            </Media>

            <Button tag={Link} to={`/Gallery`}>Back to Gallery</Button>
            </>
        )
    }
}

export default Detail