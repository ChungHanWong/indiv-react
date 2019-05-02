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
                    // let newName = response.data.purchase[i].name
                    // let newImage = response.data.purchase[i].image
                    // let newId = response.data.purchase[i].id
                    // let newPaid = response.data.purchase[i].paid
                    // let obj = {}
                    // obj['name'] = newName
                    // obj['image'] = newImage
                    // obj['id'] = newId
                    // obj['paid'] = newPaid
                    // let newnew= this.state.purchased
                    // newnew.push(obj)
                    // this.setState({purchased: newnew})
                }
                
                
            })
            .catch(error => {    
                console.log('ERROR: ', error)
            })
    }



    

    render(){
  		console.log(this.state.purchased)
	    return (
	    	<>
            {
            this.state.purchased.map(pur =>
                <>
                {pur.paid===false?
                <>
                    <h3>Pending Purchases</h3>
                    <PurchaseForm purchase={pur} /> 
                </>
                :
                ''}
                {pur.paid ===true?
                    <>
                    <h3>Successful Purchases</h3>
                    <ListGroupItem tag={Link} to={`/detail/${pur.id}`}>
                        Name of Artwork :{pur.name}  
                        Id : {pur.id}
                        
                    </ListGroupItem>
                   
                    </>
                    :
                    ''
                }
                </>
	    	)
            }
	    	</>
	    )
  	}
}

export default createListOfPurchase



