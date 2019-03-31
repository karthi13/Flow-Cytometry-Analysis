import React, { Component, Fragment } from "react";
import { FilePond } from 'react-filepond';
import { Card } from "react-bootstrap";

import '../Styles/Fileupload.css';

export default class FileComponent extends Component {

    render() {
        const URL = "http://127.0.0.1:8000/file/upload/";

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