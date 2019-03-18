import React, { Component } from 'react'
import {Row, Col} from 'react-bootstrap';

import { FileComponent, NavComponent, FormAnalysisComponent } from './index'

import '../Styles/HomeStyles.css'

export default class HomeComponent extends Component {
    render() {
        return (
            <div>
                <NavComponent />
                <Row className="fileContainer" >
                    <Col lg={6} xl={6} md={6} sm={6}>
                        <FileComponent />
                    </Col>
                    <Col lg={6} xl={6} md={6} sm={6}>
                        <FormAnalysisComponent/>
                    </Col>
                </Row>
            </div>

        )
    }
}
