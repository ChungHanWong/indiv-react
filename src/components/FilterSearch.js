import React from 'react';
import { Form, FormGroup,Input,Label } from 'reactstrap';

const filterSearch = ({search,updateSearch,category}) => {
    return(
        <>
            <h3> Category : {category}</h3>
            <Form>
                <FormGroup>
                    <Label for="name">Search</Label>
                    <Input
                        type="text"
                        value = {search}
                        placeholder="Name of Painting"
                        onChange={updateSearch}
                    />
                </FormGroup>
            </Form>
        </>
        
    )
}

export default filterSearch