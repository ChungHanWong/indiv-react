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
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('bio')
    sessionStorage.removeItem('profilepic')
    
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
              
              {sessionStorage.getItem('autoken')?
              <>
              <NavItem>
                <NavLink  href="/Profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  href="/Submit">Submit Artwork</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  href="/Purchase">Purchase & Bidding History</NavLink>
              </NavItem>
              <NavItem > 
                <NavLink onClick={this.handlelogout} href="/Login">Logout</NavLink>
              </NavItem>
              </>
              :
              <NavItem>
                <NavLink href="/Login">Login</NavLink>
              </NavItem>
              }
              
            </Nav>
          
        </Navbar>
      </div>
       
        </>
  )
  }
  
}

export default navbar;