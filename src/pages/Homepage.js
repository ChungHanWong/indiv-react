import React from 'react';
import Carousel from '../containers/Carousel'
import { Container, Row, Col } from 'reactstrap';

class Homepage extends React.Component {
    state = {
        username : sessionStorage.getItem('username')
    }

    render(){
        return(
            <>
                <h1>Welcome to Artsy Fartsy</h1>
                <h2>{this.state.username}</h2>
                <Container>

                    <Row>
                    <Col>
                    <h3>About </h3>
                    <h4>For Artists</h4>
                    <p className="picSubmit">Artsy Fartsy empowers fresh artists to be able to sell their artwork to the ditigal world.</p>
                    </Col>
                    <Col> <h3>About </h3>
                    <h4>For Buyers</h4>
                    <p className="picSubmit">Artsy Fartsy allows you to search millions of artwork and buy the one that you admire most by bidding.</p></Col>
                    <Col>.col</Col>
                    <Col>.col</Col>
                    </Row>
                </Container>
                <Carousel/>
            </>
        )
    }

}

export default Homepage