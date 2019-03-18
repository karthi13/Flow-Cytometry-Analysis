import React, { Component } from 'react';
import {
    Card, Form, Col, Button,
    Container, FormGroup, Row
} from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import '../Styles/HomeStyles.css';

export default class FormAnalysisComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            value: new Date().toISOString()
        };
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ value: image });
        }
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });
    }

    render() {
        const { validated } = this.state;
        return (
            <Card className="formContainer">
                <Container>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={e => this.handleSubmit(e)}
                    >

                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label>Project Description</Form.Label>
                                <Form.Control as="textarea" rows="3" required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Date</Form.Label>
                                <FormGroup controlId="required">
                                    <DatePicker required className="datepicker" required onChange={this.handleChange} placeholder="Placeholder" value={this.state.value} id="required_example" />
                                </FormGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Radios</Form.Label>
                                <Form.Group as={Row} controlId="formHorizontalCheck">
                                <Col sm={{  offset: 1 }}>
                                    <Form.Check
                                        type="radio"
                                        label="Influent"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"

                                    />
                                    </Col>
                                    <Col sm={{ offset: 1 }}>            
                                    <Form.Check
                                        type="radio"
                                        label="Effluent"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                    />
                                    </Col>
                                </Form.Group>    
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Filter</Form.Label>
                                <Form.Control type="text" placeholder="Filter" required />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label>Plant</Form.Label>
                                <Form.Control type="text" placeholder="Treatment Plant" required />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                <Form.Label>Temperature</Form.Label>
                                <Form.Control type="text" placeholder="Temp" required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                            />
                        </Form.Group>
                        <Button type="submit">Analyze</Button>
                    </Form>
                </Container>
            </Card>
        );
    }
}
