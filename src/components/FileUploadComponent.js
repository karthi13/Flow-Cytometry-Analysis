import React, { Component, Fragment } from "react";
import { FilePond } from 'react-filepond';
import { Card } from "react-bootstrap";

import '../Styles/Fileupload.css';

export default class FileComponent extends Component {

    render() {
        return (
            <Fragment>
                <Card>
                    <FilePond
                        className="fileComponent"
                        allowMultiple={true}
                        server="http://localhost:3000" />
                </Card>
            </Fragment>
        )
    }
}