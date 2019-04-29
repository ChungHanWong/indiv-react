import React from 'react';
import axios from 'axios';
import { Media,Button,Form,FormGroup,Label,Input } from 'reactstrap';
import { Link } from 'react-router-dom'


class Detail extends React.Component {
    state = {
        name : "",
        category :"",
        description :"",
        price: "",
        image:"",
        artist:"",
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
            let artist = result.data.artist
            this.setState({
                name : name,
                category :category,
                description:description,
                image : image,
                price : price,
                artist : artist,
            })
            
        })
        .catch(error => {    
            console.log('ERROR: ', error)
        })
    }

    handleSubmitPrice = event => {
        event.preventDefault()
        let id = sessionStorage.getItem('id')
        let {price,description} = this.state;
        let fd = new FormData();
        fd.append('description', description )
        fd.append('price', price)
        fd.append('id', id)
        axios.post("http://127.0.0.1:5000/paintings/bid", fd, {headers: {
            'Content-Type': 'multipart/form-data'
            }})
        .then(response => {
            console.log(response.data.message)
            alert(response.data.message)
            // sessionStorage.setItem('bio', response.data.bio)
            // // this.setState({profilepic : response.data.profilepic})
            window.location.reload()
        })
        .catch(error => {
        alert("error uploading")
        })
        }

    handlePriceInput = event => {
        this.setState({ price: event.target.value })
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
                    <h1>{this.state.name} </h1> 
                    <h3>by</h3>
                    <h4 >{this.state.artist}</h4>
                    </Media>
                    <p className = "details">{this.state.description}</p>
                    <div>
                    <p className = "details">Bidding Price :{this.state.price}</p>
                    </div>
                    <div>
                    <Form onSubmit={this.handleSubmitPrice}>
                        <FormGroup>
                            <Label for="name">How Much Would Like to Bid?</Label>
                            <Input
                                type="text"
                                name="price"
                                placeholder="$100"
                                onChange={this.handlePriceInput}
                            />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    </div>

                    </Media>
            </Media>

            <Button tag={Link} to={`/Gallery`}>Back to Gallery</Button>
            </>
        )
    }
}

export default Detail