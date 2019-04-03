import React, { Component, Fragment } from "react";
import { FilePond } from 'react-filepond';
import { Card } from "react-bootstrap";

import '../Styles/Fileupload.css';

export default class FileComponent extends Component {

    render() {
        const URL = "http://35.239.90.170:8080/file/upload/";

        return (
            <Fragment>
                <Card>
                    <FilePond
                        className="fileComponent"
                        name='file'
                        allowMultiple={true}
                        server={URL} />
                </Card>
            </Fragment>
        )
    }
}