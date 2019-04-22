import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { XYPlot, XAxis, YAxis, MarkSeries, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis';

export default class ChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {

        return (
            <XYPlot
                width={200}
                height={200}>
                <VerticalGridLines />
                <HorizontalGridLines />
                {/* <XAxis />
                <YAxis /> */}
                <MarkSeries
                    className="mark-series-example"
                    sizeRange={[1, 70000]}
                    data={this.props.data} />
            </XYPlot>
        );
    }
}

