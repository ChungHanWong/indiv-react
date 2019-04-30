
import React from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';

 
class braintree extends React.Component {
  instance;
 
  state = {
    clientToken: null,
    transacted : false,
    message : '',
    transac : '',
  };
 
  async componentDidMount() {
    // Get a client token for authorization from your server
    axios.get('http://127.0.0.1:5000/braintree/')
        .then(result => {
            console.log(result.data)
            this.setState({clientToken:result.data.client_token})
        })

        .catch(error => {    
            console.log('ERROR: ', error)
        })
        
  }
 
  async buy() {
    // Send the nonce to your server
    let nounce  = await this.instance.requestPaymentMethod();
    console.log(nounce.nonce)
    
    axios.post("http://127.0.0.1:5000/braintree/checkouts", {
        payment_method_nonce : nounce.nonce
      })
    .then(response => {
        console.log(response.data)
        alert(response.data)
        this.setState({transacted: true})
        this.setState({message : response.data.message})
        this.setState({transac : response.data.transac})
    })
    .catch(error => {
        alert("Payment Error")
    })
    
  }
 
  render() {
      console.log(this.state.transacted)
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
