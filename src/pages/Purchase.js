import React from 'react';
import axios from 'axios';
import PurchaseForm from '../containers/PurchaseForm'
import ListOfBid from '../components/listOfBid'
import ListOfSuccessfulPurchases from '../components/listOfSuccessfulPurchases'

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
  		
	    return (
	    	<>
            <div className="biddingArtwork">
                <h3>Bidding Artwork</h3>
                {this.state.bid.map(bid =>
                    <ListOfBid key={bid.id} bid={bid}/>
                )}
            </div>
            <div className="biddingArtwork">
                <h3>Pending Purchases</h3>
                {
                this.state.purchased.map(pur =>
                    <>
                    {pur.paid===false?
                        <PurchaseForm key={pur.id} purchase={pur} /> 
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
                        <ListOfSuccessfulPurchases key={pur.id} pur={pur}/>
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



