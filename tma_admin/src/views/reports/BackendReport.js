import React, { Component } from 'react';

//import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Moment from 'moment';

// authentication 
import AuthService from '../../utils/AuthService';

// custom components
import { Card, PageHeader, PageWrapper, Select, DateSelect } from '../../components';

// constants 
import { API } from '../../constants';

const client_url = API.CLIENTS;

class BackendReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            client_id: "",
            clientOptions: [],
            fromDate: Moment(),
            toDate: Moment(),
        }

        
        this.Auth = new AuthService();
        this.Token = this.Auth.getToken();
    }

    componentDidMount() {
        var clientOptions = [];
        fetch(client_url, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + this.Token
                    })
                })
            .then(results => { 
                return results.json();
            }).then(res => {
                if(res.length > 0)
                {
                    for(var i = 0; i < res.length; i++)
                    {
                        var client = res[i];
                        var optionData = {
                            value: client.id,
                            label: client.name
                        }

                        clientOptions.push(optionData);
                    }

                    this.setState({clientOptions: clientOptions});
                }
            })
        .catch(function(err){
            console.log(err);
        })
    }

    render () {
        
        const { client_id, clientOptions, fromDate, toDate } = this.state;

        return (
            <PageWrapper>
                <PageHeader title="Clients"/>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <Card 
                                title="Backend Report"
                                subTitle="Generate backend report."
                                >

                                <div className="form-group row">
                                    <label htmlFor="client" className="offset-1 col-2 col-form-label">Client</label>
                                    <div className="col-8">
                                        <Select
                                                id="client"
                                                className="form-control"
                                                name="client"
                                                options={clientOptions}
                                                value={client_id}
                                                placeholder="Select Client..."
                                                onChange={(event) => this.setState({client_id: event.target.value})}
                                            />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="fromDate" className="offset-1 col-2 col-form-label">From</label>
                                    <div className="col-8">
                                        <DateSelect
                                            id="fromDate"
                                            className="form-control"
                                            onChange={(date) => this.setState({fromDate: date}) }
                                            selected={fromDate}
                                        />
                                        
                                    </div>
                                </div>
                                

                                <div className="form-group row">
                                    <label htmlFor="toDate" className="offset-1 col-2 col-form-label">To</label>
                                    <div className="col-8">
                                        <DateSelect
                                            id="toDate"
                                            className="form-control"
                                            onChange={(date) => this.setState({toDate: date}) }
                                            selected={toDate}
                                        />
                                        
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <button type="submit" class="btn btn-success"> <i class="fa fa-cogs"></i> Generate Report</button>
                                </div>
                                
                                
                            </Card>
                        
                        </div> 
                    </div>
                </div>

                
                
            </PageWrapper>
        );
        
    }
}


export { BackendReport };