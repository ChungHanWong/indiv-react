
import React from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import {Button} from 'reactstrap';
import { Link } from 'react-router-dom'
 
class braintree extends React.Component {
  instance;
 
  state = {
    clientToken: null,
    transacted : false,
    message : '',
    transac : '',
    value : '',
  };
 
  async componentDidMount() {
    // Get a client token for authorization from your server
    axios.get('https://aqueous-journey-66824.herokuapp.com/braintree/')
        .then(result => {
            
            this.setState({clientToken:result.data.client_token})
        })

        .catch(error => {    
            console.log('ERROR: ', error)
        })
        
  }
 
  async buy() {
    // Send the nonce to your server
    let nounce  = await this.instance.requestPaymentMethod();
    
  
    axios.post("https://aqueous-journey-66824.herokuapp.com/braintree/checkouts", {
        payment_method_nonce : nounce.nonce,
        amount : this.state.value,
      })
    .then(response => {
        
        this.setState({transacted: true})
        this.setState({message : response.data.message})
        this.setState({transac : response.data.transac})
    })
    .catch(error => {
        alert("Payment Error")
    })
    
  }

  updateValue = (event) => {
    this.setState({value:event.target.value})
  }
 
  render() {
    
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    else if (this.state.transacted===true) {
      return(
        <>
          <div>
            <h1>{this.state.message.header}</h1>
            <h3>{this.state.message.icon}</h3>
            <h3>{this.state.message.message}</h3>
          </div>
          <Button tag={Link} to={`/Profile`}>Back to Profile</Button>
          <section>
            <h5>Transaction</h5>
              <table cellpadding="0" cellspacing="0">
                <tbody>
                  <tr>
                    <td>id</td>
                    <td>{this.state.transac.id}</td>
                  </tr>
                  <tr>
                    <td>type</td>
                    <td>{this.state.transac.type}</td>
                  </tr>
                  <tr>
                    <td>amount</td>
                    <td>{this.state.transac.amount}</td>
                  </tr>
                  <tr>
                    <td>status</td>
                    <td>{this.state.transac.status}</td>
                  </tr>
                </tbody>
              </table>
            </section>
        </>
      )
    } 
    


    else {
      return (
        <div>
          <label>Amount</label>
          <input onChange={this.updateValue}></input>
          <DropIn
            
            options={{ authorization: this.state.clientToken }}
            onInstance={instance => (this.instance = instance)}
          />
          <button onClick={this.buy.bind(this)}>Buy</button>
        </div>
      );
    }
  }
}

export default braintree
