import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../Styles/Fileupload.css'
import _ from 'lodash';

export default class MyVerticallyCenteredModal extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      selectedFiles: []
    }
    // this.filesSelected = this.filesSelected.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
  }


  handleChecked (id) {
    console.log(id)
    this.setState({
      selectedFiles: [...this.state.selectedFiles, id]
    })
  }

  render() {

    // var {trigger} = this.props;
    const body = this.props.body ? this.props.body.map((state, index) => (
      <Form.Check key={index}   type='checkbox' id={index} >
        <Form.Check.Input onChange={() => this.handleChecked(index)} type='checkbox' isValid />
        <Form.Check.Label>{state}</Form.Check.Label>
      </Form.Check>
    )) : null;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable={true}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body data-spy="scroll">
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) =>{
             const { selectedFiles } =  this.state;
             this.props.passstate(selectedFiles);
             this.setState({selectedFiles : []})
             }}>Submit</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}