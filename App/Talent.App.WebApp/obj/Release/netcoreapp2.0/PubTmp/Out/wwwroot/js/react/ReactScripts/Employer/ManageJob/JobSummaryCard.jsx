
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Popup, Card, Button } from 'semantic-ui-react';
import moment from 'moment';
import { CreateJob } from '../CreateJob/CreateJob.jsx';
export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {
        const summaryLimit = this.props.summary;
        const summaryRender = summaryLimit.length > 200 ? `${summaryLimit.substring(0, 250)}....` : summaryLimit;
        return (
            <div>
                
                <Card className="cards--style" fluid>
                    <Card.Content>
                        <a className="ui black right ribbon label"><i className="user icon"></i>0</a>
                        <Card.Header>{this.props.title}</Card.Header>
                        <Card.Meta>{this.props.city}, {this.props.country}</Card.Meta>
                        <Card.Description>{summaryRender}</Card.Description>
                    </Card.Content>

                    <Card.Content extra className="cards--buttons">
                        <p className="ui negative button">Expired</p>
                        {/*<Button className="ui negative button">Expired</Button>*/}
                        {/*<div className="three--buttons">*/}
                        <Button id="--close" className="ui primary basic button"><i className="ban icon"></i>Close</Button>
                        <Button className="ui primary basic button"><i className="edit primary icon"></i>Edit</Button>
                        <Button id="--copy" className="ui primary button"><i className="copy icon"></i>Copy</Button>
                        {/*</div>*/}
                    </Card.Content>
                </Card>


            </div>
        )
    }
}