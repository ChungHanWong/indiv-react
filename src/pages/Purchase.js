import React from 'react';
import {  ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';
import PurchaseForm from '../containers/PurchaseForm'

class createListOfPurchase extends React.Component {
    constructor(props){
    super(props);
    this.input = React.createRef();
    this.state = {
        purchased:[],
        bid : [],
    }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/sold/purchase', 
            { headers: { Authorization: `Bearer ${sessionStorage.getItem('autoken')}` } })
            .then(response => {
                console.log(response.data.purchase)
                // this.setState({purchased:response.data.purchase})
                for (let i =0;i<response.data.purchase.length;i++){
                    const { name, image, id, paid } = response.data.purchase[i]
                    this.setState({
                        purchased: [
                            ...this.state.purchased,
                            { name, image, id, paid }
                        ]
                    })
                }
                for (let i =0;i<response.data.bid.length;i++){
                    const { name, image, id, price} = response.data.bid[i]
                    this.setState({
                        bid: [
                            ...this.state.bid,
                            { name, image, id,price }
                        ]
                    })    
                }
                    // let newName = response.data.purchase[i].name
                    // let obj = {}
                    // obj['name'] = newName
            })
            .catch(error => {    
                console.log('ERROR: ', error)
            })
    }



    

    render(){
  		console.log(this.state.purchased)
	    return (
	    	<>
            <div className="biddingArtwork">
                <h3>Bidding Artwork</h3>
                {this.state.bid.map(bid =>
                    <>
                        <ListGroupItem tag={Link} to={`/detail/${bid.id}`}>
                            Name of Artwork :{bid.name}  
                            Id : {bid.id}
                            Bidding Price : {bid.price}
                        </ListGroupItem>
                    </>
                )}
            </div>
            <div className="biddingArtwork">
                <h3>Pending Purchases</h3>
                {
                this.state.purchased.map(pur =>
                    <>
                    {pur.paid===false?
                    <>
                        
                        <PurchaseForm purchase={pur} /> 
                    </>
                    :
                    ''}
                    </>
                )
                }
            </div>
            <div className="biddingArtwork">
                <h3>Successful Purchases</h3>
                {this.state.purchased.map(pur =>
                    <>
                    {pur.paid ===true?
                        <>
                        <ListGroupItem tag={Link} to={`/detail/${pur.id}`}>
                            Name of Artwork :{pur.name}  
                            Id : {pur.id}
                            
                        </ListGroupItem>
                    
                        </>
                        :
                        ''
                    }
                    </>
                )}
            </div>
	        </>	
	    )
  	}
}

export default createListOfPurchase



