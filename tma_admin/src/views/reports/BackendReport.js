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
const machine_url = API.MACHINES;
const reports_url = API.REPORTS;

class BackendReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            client_id: "",
            machine_id: "",
            clientOptions: [],
            fromDate: Moment(),
            toDate: Moment(),
            machineOptions: [],
            fileName: "",
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

    onChangeClient = (event) => {
        let clientId = event.target.value;
        this.setState({client_id: clientId});

        this.getMachineOptions(clientId);

        
    }

    getMachineOptions = (id) => {

        var machineOptions = [];
        fetch(machine_url + "getMachinesByClientId/" + id, {
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
                        var machine = res[i];
                        var optionData = {
                            value: machine.machine_id,
                            label: machine.machine_id
                        }

                        machineOptions.push(optionData);
                    }

                    this.setState({machineOptions: machineOptions});
                }
            })
        .catch(function(err){
            console.log(err);
        });
    }

    generateReport = () => {
        const { client_id, machine_id, fromDate, toDate } = this.state;

        var data = {
            client_id: client_id,
            machine_id: machine_id,
            fromDate: fromDate,
            toDate: toDate,
        }

        fetch(reports_url + "generateBackendReport/", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.Token
                    })
                })
            .then(results => { 
                return results.json();
            }).then(res => {
                this.setState({fileName: res.fileName});
            })
        .catch(function(err){
            console.log(err);
        })
    }

    render () {
        
        const { client_id, machine_id, clientOptions, fromDate, toDate, machineOptions } = this.state;

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
                                                onChange={this.onChangeClient}
                                            />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="machine" className="offset-1 col-2 col-form-label">Machine</label>
                                    <div className="col-8">
                                        <Select
                                                id="machine"
                                                className="form-control"
                                                name="machine"
                                                options={machineOptions}
                                                value={machine_id}
                                                placeholder="Select Machine..."
                                                onChange={(event) => this.setState({machine_id: event.target.value})}
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
                                    <button type="submit" className="btn btn-success" onClick={this.generateReport}> <i className="fa fa-cogs"></i> Generate Report</button>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="loading">
                                        <div className="loading-spinner">
                                            <div className="wrap">
                                                <i className="fa fa-cog"></i>
                                                <i className="fa fa-cog"></i>
                                            </div>
                                        </div>

                                        <div className="loading-spinner">
                                            <div className="wrap">
                                                <span className="glyphicon glyphicon-cog"></span>
                                                <span className="glyphicon glyphicon-cog"></span>
                                            </div>
                                        </div>
                                        <div className="loading-text">Preparing...</div>
                                    </div>
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