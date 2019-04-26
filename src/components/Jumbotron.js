import { Jumbotron, Container } from 'reactstrap';
import React from 'react';


const jumbotron = () => {
	return(
		<>
            <div>
                <Jumbotron fluid className='jumbo'  >
                    <Container fluid>
                    <h1 className="display-3">Art Store</h1>
                    <p className="lead">Sell Your Brilliant Art Work to the World</p>
                    </Container>
                </Jumbotron>
            </div>
        </>
	)
}

export default jumbotron;