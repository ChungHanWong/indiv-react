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
        artist_id:"",
        sold : "",
    }

    componentDidMount()  {
        let id = this.props.match.params.id
        axios.get(`http://127.0.0.1:5000/paintings/offer/${id}`)
        .then(result => {
            
            let name = result.data.name
            let category = result.data.category
            let description = result.data.description
            let image = result.data.image
            let price = result.data.price
            let artist = result.data.artist
            let artist_id = result.data.artist_id
            let sold = result.data.sold
            this.setState({
                name : name,
                category :category,
                description:description,
                image : image,
                price : price,
                artist : artist,
                artist_id : artist_id,
                sold : sold,
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
        
        return(
            <>
             <Media>
                <Media left href="#">
                    <Media className="mediaimg" src = {this.state.image} alt="Generic placeholder image" />
                </Media>
                <Media body>
                    <Media heading className="mediaheading">
                    {this.state.name} 
                    <br></br>
                    ~~~
                    <br></br>
                    <Button tag={Link} to={`/OtherProfiles/${this.state.artist_id}`}>{this.state.artist}</Button>
                    </Media>
                    <p className = "details">{this.state.description}</p>
                    <div>
                    <p className = "details">Bidding Price : $ {this.state.price}</p>
                    </div>
                    <div>
          
                    { sessionStorage.getItem('autoken') && this.state.sold===false?
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
                        <Button color="warning" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    :
                    <p>You Cannot Bid For the Following Reasons :This Artwork Has Been Sold or You Have Not Logged In</p>
                    }
                    </div>

                    </Media>
            </Media>
            <div className = "backtogallery">
                <Button  color="info" tag={Link} to={`/Gallery`}>Back to Gallery</Button>
            </div>
            </>
        )
    }
}

export default Detail