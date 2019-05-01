import React from 'react';

class MyForm extends React.Component {
    state = {
        number :'',
    }
      
    handleClick = (event) => {
        this.setState({number:event.target.id})
    }
  
 
  
    render() {
        console.log(this.state.number)
      return (
        <div id="hello" onClick={this.handleClick}>
            
         
        </div>
  
      );
    }
  }

export default MyForm