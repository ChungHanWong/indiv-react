import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {  Form, FormGroup, Label, Input } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Edit Bio</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Bio</ModalHeader>
          <ModalBody>
          <Form onSubmit={this.props.handleSubmitBio}>
            <FormGroup>
                <Label for="name">Bio</Label>
                <Input
                    type="text"
                    name="bio"
                    placeholder="Blah Blah Blah"
                    onChange={this.props.editingbio}
                />
            </FormGroup>
            <Button color="primary" type="submit">Submit</Button>
        </Form>
          </ModalBody>
          <ModalFooter>
            
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;