import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// moment
import Moment from 'moment';

// custom components
import { Card, PageHeader, PageWrapper, Modal, Select } from '../../components';

// constants 
import { API } from '../../constants';


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
            name: "",
            address: "",
            country_id: "",
            state_id: "",
            email: "",
            tel_no: "",
            status: "",
            date_created: "",
            date_modified: "",
            countryOptions: []
        }

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData = (state, instance) => {

        this.setState({ loading: true })

        let self = this;

        const url = API.CLIENTS + 'getClientList/';

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

    updateData = () => {

        

    }

    handleEditButtonClick (e, row) {
        var data = row._original;
        var id = data.id;

        var self = this;

        const url = API.CLIENTS + id;

        fetch(url)
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
                        date_created: result.date_created,
                        date_modified: result.date_modified
                    });
                }
            })
        .catch(function(err){
            console.log(err);
        })

        const country_url = API.COUNTRIES;

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
                                        name: "",
                                        address: "",
                                        country_id: "",
                                        state_id: "",
                                        email: "",
                                        tel_no: "",
                                        status: "",
                                        date_created: "",
                                        date_modified: ""
                                    });


    render () {

        const { data,
                pages,
                sorted,
                pageSize,
                filtered,
                loading,
                openModal,
                clientId,
                name,
                address,
                country_id,
                state_id,
                email,
                tel_no,
                status,
                date_created,
                date_modified,
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
                accessor: c => {
                    return c.status == 0 ? "Active" : "Inactive";
                }
            }, {
                Header: 'Action',
                id: 'edit-button',
                Cell: ({row}) => (<div className="action-container"><button className="table-edit-button" onClick={(e) => this.handleEditButtonClick(e, row)}>Edit</button></div>)
            }
        ];

        var self = this;
     
        return (
            <PageWrapper>
                <PageHeader title="Clients"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Card title="Clients" subTitle="List of Clients">
                                <div className="table-responsive m-t-20">
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
                                        style={{fontFamily: "Lato,'Helvetica Neue', Arial,Helvetica,sans-serif", fontSize: "14px"}}
                                    />
                                </div>
                            </Card>
                        
                        </div> 
                    </div>
                </div>

                <Modal
                    className="modal-component"
                    title="Edit Transaction"
                    show={openModal}
                    handleCloseClick={this.closeModal}
                    >
                    <div className="modal-body">
                        <form className="form-control">
                            <input type="hidden" value={clientId}/>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                        className="form-control" 
                                        id="name" 
                                        placeholder="Name" 
                                        value={name} 
                                        onChange={(event) => this.setState({name: event.target.value })}/>
                                </div>                            
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="address">Address</label>
                                    <input type="text"
                                        className="form-control" 
                                        id="address" 
                                        placeholder="Name" 
                                        value={address} 
                                        onChange={(event) => this.setState({address: event.target.value })}/>
                                </div>                            
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="country">Country</label>
                                    <Select
                                        id="country"
                                        className="form-control"
                                        name="country"
                                        options={this.state.countryOptions}
                                    />
                                    {/* <input type="text" 
                                        className="form-control"
                                        id="country"
                                        placeholder="Country"
                                        value={country_id} 
                                        onChange={(event) => this.setState({country_id: event.target.value })}/> */}
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="state">State / Region</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="state" 
                                        placeholder="State" 
                                        value={state_id} 
                                        onChange={(event) => this.setState({state_id: event.target.value })} />
                                </div>
                                
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" 
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        value={email} 
                                        onChange={(event) => this.setState({email: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="tel_no">Telephone No.</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="tel_no" 
                                        placeholder="Telephone No." 
                                        value={tel_no} 
                                        onChange={(event) => this.setState({tel_no: event.target.value })} />
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => this.updateData()}>Save changes</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()} data-dismiss="modal" >Close</button>
                    </div>
                </Modal>
                
            </PageWrapper>
        );
        
    }
}


export { Clients };