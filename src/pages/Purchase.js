import React from 'react';
import {  ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';

class createListOfPurchase extends React.Component {
    constructor(props){
    super(props);
    this.input = React.createRef();
    this.state = {
        purchased:[],
        // purchased : ''

    }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/sold/purchase', 
            { headers: { Authorization: `Bearer ${sessionStorage.getItem('autoken')}` } })
            .then(response => {
                console.log(response.data.purchase)
                // this.setState({purchased:response.data.purchase})
                for (let i =0;i<response.data.purchase.length;i++){
                    let newName = response.data.purchase[i].name
                    let newImage = response.data.purchase[i].image
                    let newId = response.data.purchase[i].id
                    let newPaid = response.data.purchase[i].paid
                    let obj = {}
                    obj['name'] = newName
                    obj['image'] = newImage
                    obj['id'] = newId
                    obj['paid'] = newPaid
                    let newnew= this.state.purchased
                    newnew.push(obj)
                    this.setState({purchased: newnew})
                }
                
                
            })
            .catch(error => {    
                console.log('ERROR: ', error)
            })
    }

    // createListOfPurchase = () => {
    //     let purchase = this.state.purchased
    //     let bought = []
    //     for (let i = 0; i < purchase.length; i++) {
    //         purchase.push(
    //         <>
    //         <ListGroupItem tag={Link} to={`/detail/${purchase[i].id}`}>
    //             Name of Artwork :{purchase[i].name} 
    //         </ListGroupItem>
    //             <form >
    //                 <input type="hidden" value={purchase[i].id} ref={this.input} />
    //                 <input type="submit" value="Confirm Purchase" />
    //             </form>
    //         </>
    //         )
    //     }
    //     return bought
    // }

    handleSubmit = event => {
        event.preventDefault()
        let fd = new FormData();
        fd.append('id', this.input.current.value )
        axios.post("http://127.0.0.1:5000/sold/paid", fd, {headers: {
            'Content-Type': 'multipart/form-data'
            }})
        .then(response => {
            console.log(response.data.message)
            alert(response.data.message)
            
            window.location.assign('http://localhost:3000/Braintree')
        })
        .catch(error => {
        alert("error uploading")
        })
        
    }
    

    render(){
  		console.log(this.state.purchased)
	    return (
	    	<>
            {/* {this.createListOfPurchase()} */}
            {
            this.state.purchased.map(pur =>
                <>
                {pur.paid ===false?
                    <>
                    <h3>Pending Purchases</h3>
                    <ListGroupItem tag={Link} to={`/detail/${pur.id}`}>
                        Name of Artwork :{pur.name}  
                        Id : {pur.id}
                        
                    </ListGroupItem>
                    <form onSubmit={this.handleSubmit} >
                        <input type="hidden" value={pur.id} ref={this.input} />
                        <button type="submit"  > Confirm Purchase</button>
                    </form>
                    </>
                    :
                    ''
                }
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



// {
//     this.state.purchased.map(pur =>
//         <>
//             <ListGroupItem tag={Link} to={`/detail/${pur.id}`}>
//                 Name of Artwork :{pur.name}  
//                 Id : {pur.id}
//             </ListGroupItem>
//             <form onSubmit={this.handleSubmit} >
//                 <input  value={pur.id}  />
//                 <button type="submit">Submit</button>
//             </form>
//         </>
//     )
    
//     }