import React, { Component } from 'react';
import {
    Card, Form, Col, Button,
    Container, FormGroup, Row, ListGroup
} from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import '../Styles/HomeStyles.css';
import { ModalComponent } from './index'
import axios from 'axios';
import ChartComponent from './ChartComponent';
import * as lodash from 'lodash';

export default class FormAnalysisComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            value: new Date(),
            modalShow: false,
            chartdata: []
        };

        // this.getFilesFromBucket= this.getFilesFromBucket.bind(this);
        this.getSelectedFiles = this.getSelectedFiles.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onPreprocessFilesSubmit = this.onPreprocessFilesSubmit.bind(this)
    }

    handleChange(date) { this.setState({ value: date }); }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });
    }

    getSelectedFiles(data) {
        this.setState({
            ...this.state,
            modalShow: !this.state.modalShow,
            selectedFiles: data
        });
    }

    async onPreprocessFilesSubmit() {
        const sendData = this.state.selectedFiles.map((state) => {
            console.log(this.state.data.files[state])
            return this.state.data.files[state]
        })
        console.log(sendData);
        const chartdata = await axios.post('http://127.0.0.1:8000/file/preprocess/', {
            selectedFiles: sendData
        })
            .then(function (response) {
                console.log(response.data);
                return response.data;
                // this.setState({chartData: response.data})
                // console.log(this.state)
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ chartdata })
    }


    async getFilesFromBucket() {
        const fileFromBucket = await axios.get('http://35.239.90.170:8080/file/upload/').then(
            response => {
                // console.log(response.data)
                return response.data;
            }
        ).catch(err => console.log(err))
        // console.log(fileFromBucket)
        return fileFromBucket;
    }

    async componentDidMount() {
        const data = await this.getFilesFromBucket();
        console.log(data)
        this.setState({ ...this.state, data })
        console.log(this.state)
    }


    render() {

        const { validated } = this.state;
        const files = this.state.data ? this.state.data.files : null;
        const selected = this.state.selectedFiles ? this.state.selectedFiles.map((state, index) => {
            return <ListGroup.Item key={index}>{this.state.data.files[state]}</ListGroup.Item>
        }) : null;
        const showChartButton = lodash.isEmpty(this.state.chartdata) ? false : true;
        console.log(this.state)
        const modalTitle = showChartButton ? 'Preprocesses Scatter Plot' : 'Select FCS Files';
        const chartButton = showChartButton ? (
        <Button
            variant="primary"
            onClick={() => this.setState({ modalShow: true })}
        >
            {'Show Chart'}
        </Button>
        ) : null;
            // const chartData = !lodash.isEmpty(this.state.chartdata) ? this.state.chartdata 
        const ShowChart = !lodash.isEmpty(this.state.chartdata) ? (
            <ChartComponent data={this.state.chartdata}/>
        ) : null;
        let modalClose = () => this.setState({ modalShow: false });

        return (
            <Card className="formContainer">
                <Container>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label className='margin20'>Select Files to Preprocess</Form.Label>
                                <Button

                                    variant="primary"
                                    onClick={() => this.setState({ modalShow: true })}
                                >
                                    Select Files
                                </Button>
                                {/* <ModalComponent
                                    show={this.state.modalShow}
                                    onHide={modalClose}
                                    body={files}
                                    passstate={this.getSelectedFiles}
                                    title={'Select FCS Files'} /> */}

                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label>Project Description</Form.Label>
                                <Form.Control as="textarea" rows="2" required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Date</Form.Label>
                                <FormGroup controlId="required">
                                    <DatePicker required
                                        className="datepicker"
                                        onChange={this.handleChange}
                                        placeholder="Placeholder"
                                        selected={this.state.value}
                                        id="required_example" />
                                </FormGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label></Form.Label>
                                <Form.Group as={Row} controlId="formHorizontalCheck">
                                    <Col sm={{ offset: 1 }}>
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
                                <Form.Control
                                    type="text"
                                    placeholder="Filter"
                                    required
                                    onChange={(e) => this.setState({ filter: e.target.value })} />
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
                            <ListGroup>
                                {selected}
                            </ListGroup>
                        </Form.Group>
                        <Button type="submit" onClick={this.onPreprocessFilesSubmit}>Preprocess</Button>
                        {chartButton}
                        <ModalComponent
                            show={this.state.modalShow}
                            onHide={modalClose}
                            title={modalTitle}
                            body={files}
                            passstate={this.getSelectedFiles}
                            data={this.state.chartdata} />
                    </Form>
                </Container>
                {ShowChart}
            </Card>
        );
    }
}
