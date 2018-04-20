import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// moment
import Moment from 'moment';


import AuthService from '../../utils/AuthService';

// custom components
import { Card, PageHeader, PageWrapper, Modal, Select, MdInput } from '../../components';

// constants 
import { API, USER_TYPE, ACCESS_TYPE, MODULE } from '../../constants';

// use for permission
import { GetPermission, CheckUserType } from '../../helpers';

const client_url = API.CLIENTS;
const country_url = API.COUNTRIES;
const states_url = API.STATES;



class Clients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: null,
            sorted: [],
            pageSize: "",
            filtered: [],
            loading: true,
            showModal: false,
            clientId: "",
            code: "",
            name: "",
            address: "",
            country_id: "",
            state_id: "",
            email: "",
            tel_no: "",
            status: "",
            permit_no: "",
            tin: "",
            date_created: "",
            date_modified: "",
            countryOptions: [],
            statesOptions: [],
            isChecked: true,
            readOnly: false,
            accessType: ACCESS_TYPE.NOACCESS,
        }

        
        this.Auth = new AuthService();
        this.Token = this.Auth.getToken;
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData = async(state, instance) => {

        const userType =  await CheckUserType();

        var readOnly = false;

        var accessType = ACCESS_TYPE.NOACCESS;

        if(userType === USER_TYPE.CLIENT)
        {
            var txnAccess = await GetPermission(MODULE.TRANSACTIONS);
            if(txnAccess === ACCESS_TYPE.NOACCESS)
                return;


            if(txnAccess === ACCESS_TYPE.READONLY)
                readOnly = true;

            accessType = txnAccess;
        }

        this.setState({ loading: true,
            readOnly: readOnly,
            accessType: accessType });

        let self = this;

        const url = client_url + 'getClientList/';

        const { pageSize, page, sorted, filtered } = state;

        this.setState({pageSize: pageSize, 
                        page: page, 
                        sorted: sorted, 
                        filtered: filtered});

        const data =  {
            pageSize: pageSize,
            page: page,
            sorted: sorted,
            filtered: filtered,
            showModal: false,
        }

        fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.Token()
                })
            }).then((response) => { 
                return response.json();
            }).then((res) => {
                //self.setState({data: responseData});

                const pages = Math.ceil(res.totalRecords / pageSize) ;
                self.setState({
                    data: res.transactions,
                    pages: pages,
                    loading: false
                });
            })
        .catch(function(err){
            console.log(err);
        })
    }

    saveData = () => {

        const { 
            name,
            address,
            country_id,
            state_id,
            email,
            tel_no,
            status,
            clientId,
            code,
            tin,
            permit_no,
         } = this.state;

         var data = {
             name: name,
             address: address,
             country_id: country_id,
             state_id: state_id,
             email: email,
             tel_no: tel_no,
             status: status,
             id: clientId,
             code: code,
             tin: tin,
             permit_no: permit_no
         }


        if(clientId !== "")
            this.updateClient(data);
        else
            this.addClient(data);

    }

    addClient = (data) => {
        data.date_created = Moment().format("YYYY-MM-DD HH:mm:ss");
        data.date_modified = Moment().format("YYYY-MM-DD HH:mm:ss");

        var self = this;

        fetch(client_url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.Token()
                })
            }).then((response) => {

                var dataState = {
                    pageSize: self.state.pageSize,
                    page: self.state.page,
                    sorted: self.state.sorted,
                    filtered: self.state.filtered
                };
                self.fetchData(dataState, []);

                this.closeModal();
                //this.setState({openModal: false});
                return response.json();
                
            }).then((res) => {
                //
            })
        .catch(function(err){
            console.log(err);
        })
    }

    updateClient = (data) => {
        data.date_modified = Moment().format("YYYY-MM-DD HH:mm:ss");

        var id = data.id;

        var self = this;

        fetch(client_url + id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.Token()
                })
            }).then((response) => {

                var dataState = {
                    pageSize: self.state.pageSize,
                    page: self.state.page,
                    sorted: self.state.sorted,
                    filtered: self.state.filtered
                };
                self.fetchData(dataState, []);

                this.closeModal();
                //this.setState({openModal: false});
                return response.json();
                
            }).then((res) => {
                //
            })
        .catch(function(err){
            console.log(err);
        })
    }
    

    handleEditButtonClick (e, row) {
        var data = row._original;
        var id = data.id;

        var self = this;

        fetch(client_url + id,{
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this.Token()
                })
            })
            .then(results => { 
                return results.json();
            }).then(res => {
                if(res.length > 0)
                {
                    var result = res[0];
                    self.setState({
                        openModal: true,
                        clientId: result.id,
                        name: result.name,
                        address: result.address,
                        country_id: result.country_id,
                        state_id: result.state_id,
                        email: result.email,
                        tel_no: result.tel_no,
                        status: result.status,
                        code: result.code,
                        permit_no: result.permit_no === null ? "": result.permit_no,
                        tin: result.tin === null ? "" : result.tin,
                        date_created: result.date_created,
                        date_modified: result.date_modified,
                        statesOptions: []
                    });

                    this.getStateOptions(result.country_id);
                }
            })
        .catch(function(err){
            console.log(err);
        });


        const countryOptions = [];

        fetch(country_url)
            .then(results => { 
                return results.json();
            }).then(res => {
                if(res.length > 0)
                {
                    for(var i = 0; i < res.length; i++)
                    {
                        var country = res[i];
                        var optionData = {
                            value: country.id,
                            label: country.name
                        }

                        countryOptions.push(optionData);
                    }

                    this.setState({countryOptions: countryOptions})
                    
                }
            })
        .catch(function(err){
            console.log(err);
        })

        
    }

    openModal = () => {

        this.setState({openModal: true, 
            clientId: "",
            code: "",
            name: "",
            address: "",
            country_id: "",
            state_id: "",
            email: "",
            tel_no: "",
            status: 0,
            date_created: "",
            date_modified: "",
            statesOptions: [],
        });

        const countryOptions = [];

        fetch(country_url)
            .then(results => { 
                return results.json();
            }).then(res => {
                if(res.length > 0)
                {
                    for(var i = 0; i < res.length; i++)
                    {
                        var country = res[i];
                        var optionData = {
                            value: country.id,
                            label: country.name
                        }

                        countryOptions.push(optionData);
                    }

                    this.setState({countryOptions: countryOptions})
                    
                }
            })
        .catch(function(err){
            console.log(err);
        })


        this.setState({openModal: true})

    }

    closeModal = () => this.setState({openModal: false, 
                                        clientId: "",
                                        code: "",
                                        name: "",
                                        address: "",
                                        country_id: "",
                                        state_id: "",
                                        email: "",
                                        tel_no: "",
                                        status: "",
                                        date_created: "",
                                        date_modified: "",
                                        permit_no: "",
                                        tin: "",
                                        statesOptions: [],
                                    });

    onChangeCountry = (event) => {

        const { readOnly } = this.state;

        if(readOnly)
            return;

        const countryId = event.target.value;
        this.setState({country_id: countryId});

        this.setState()
        // refresh the state options based on its country.

        this.getStateOptions(countryId);
    }

    getStateOptions = (countryId) => {
        const url = states_url + "getStatesByCountry/" + countryId;

        const statesOptions = [];

        fetch(url)
            .then(results => { 
                this.setState({statesOptions: []});
                return results.json();
            }).then(res => {
                if(res.length > 0)
                {
                    for(var i = 0; i < res.length; i++)
                    {
                        var state = res[i];
                        var optionData = {
                            value: state.id,
                            label: state.name
                        }

                        statesOptions.push(optionData);
                    }

                    this.setState({statesOptions: statesOptions});
                    
                }
            })
        .catch(function(err){
            console.log(err);
        })
    }

    _handleCheckboxChange = () => this.setState( { isChecked: !this.state.isChecked } );


    render () {

        const { data,
                pages,
                loading,
                openModal,
                code,
                name,
                address,
                country_id,
                state_id,
                email,
                tel_no,
                status,
                permit_no,
                tin,
                readOnly
             } = this.state;

        const columns = [{
                id: 'c.name',
                Header: 'Name',
                accessor: 'name'
            }, {
                id: 'c.address',
                Header: 'Address',
                accessor: 'address'
            }, {
                id: 'pc.name',
                Header: 'Country',
                accessor: 'country'
            }, {
                id: 'ps.name',
                Header: 'State',
                accessor: 'state'
            }, {
                id: 'c.status',
                Header: 'Status',
                width: 80,
                accessor: c => {
                    return c.status === 0 ? "Active" : "Inactive";
                }
            }, {
                Header: 'Action',
                id: 'edit-button',
                filterable: false,
                sortable: false,
                width: 60,
                Cell: ({row}) => (<div className="action-container"><button className="table-edit-button" onClick={(e) => this.handleEditButtonClick(e, row)}>{!readOnly ? 'Edit' : 'View'}</button></div>)
            }
        ];


        var btn = [];

        if(!readOnly)
        {
            btn = [{id: "add-button", 
                    class: "btn btn-success waves-effect waves-light pull-right", 
                    title: "Add",
                    onClick: this.openModal
                }];
        }

     
        return (
            <PageWrapper>
                <PageHeader title="Clients"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Card 
                                title="Clients"
                                subTitle="List of Clients"
                                buttons={btn}
                                >
                                <div className="table-responsive">
                                    <ReactTable
                                        className="-striped -highlight"
                                        manual
                                        columns={columns}
                                        data={data}
                                        pages={pages}
                                        loading={loading}
                                        defaultPageSize={10}
                                        onFetchData={this.fetchData}
                                        minRows={0}
                                        filterable
                                        resizable={true}
                                        style={{fontFamily: "'Open Sans', sans-serif", fontSize: "13px"}}
                                    />
                                </div>
                            </Card>
                        
                        </div> 
                    </div>
                </div>

                <Modal
                    className="modal-component"
                    title="Edit Client"
                    show={openModal}
                    handleCloseClick={this.closeModal}
                    >
                    <div className="modal-body modal-transactions">
                        <form >

                            <div className="row">
                                <div className="col-sm-12 col-md-4">
                                    <MdInput
                                            label="Code"
                                            value={code}
                                            onChange={(event) => (!readOnly) ? this.setState({code: event.target.value }) : code }/>
                                </div>
                                <div className="col-sm-12 col-md-8">
                                    <MdInput
                                            label="Name"
                                            value={name}
                                            onChange={(event) => (!readOnly) ? this.setState({name: event.target.value }) : name }/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <MdInput
                                            label="Address"
                                            value={address}
                                            onChange={(event) => (!readOnly) ? this.setState({address: event.target.value }) : address }/>
                                </div>
                            </div>
                            
                         

                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="country"
                                        name="country"
                                        options={this.state.countryOptions}
                                        value={country_id}
                                        onChange={this.onChangeCountry}
                                        label="Country"
                                    />
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="state"
                                        name="state"
                                        options={this.state.statesOptions}
                                        value={state_id}
                                        label="State/Region"
                                        onChange={(event) =>  (!readOnly) ? this.setState({state_id: event.target.value }) : state_id}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Email"
                                            value={email}
                                            onChange={(event) => (!readOnly) ? this.setState({email: event.target.value }) : email }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Telephone Number"
                                            value={tel_no}
                                            onChange={(event) => (!readOnly) ? this.setState({tel_no: event.target.value }) : tel_no }/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="TIN"
                                            value={tin}
                                            onChange={(event) => (!readOnly) ? this.setState({tin: event.target.value }) : tin }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Permit Number"
                                            value={permit_no}
                                            onChange={(event) => (!readOnly) ? this.setState({permit_no: event.target.value }) : permit_no }/>
                                </div>
                            </div>

                            

                            <div className="row">

                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="state"
                                        name="state"
                                        options={[{value: 0, label: "Active"}, {value: 1, label: "Inactive"}]}
                                        value={status}
                                        label="Status"
                                        onChange={(event) =>  (!readOnly) ? this.setState({status: event.target.value }) : status}
                                    />
                                </div>

                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button hidden={readOnly} type="button" className="btn btn-primary" onClick={() => this.saveData()}>Save changes</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()} data-dismiss="modal" >Close</button>
                    </div>
                </Modal>
                
            </PageWrapper>
        );
        
    }
}


export { Clients };