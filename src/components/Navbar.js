import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import React from 'react';   




class navbar extends React.Component {
  
  handlelogout = () => {
    sessionStorage.removeItem('autoken')
    
  }

  render(){
	return(
		<>
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">HOME</NavbarBrand> 
            <Nav  navbar>
              <NavItem>
                <NavLink href="/Gallery/">Gallery</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.handlelogout} href="/Login">Logout</NavLink>
              </NavItem>
              
            </Nav>
          
        </Navbar>
      </div>
       
        </>
  )
  }
  
}

export default navbar;