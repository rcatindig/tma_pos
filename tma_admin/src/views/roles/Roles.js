import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// moment
import Moment from 'moment';

// custom components
import { Card, PageHeader, PageWrapper, Modal, Select } from '../../components';

import AuthService from '../../utils/AuthService';

// constants 
import { API } from '../../constants';

const role_url = API.ROLES;
const client_url = API.CLIENTS;



class Roles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: null,
            sorted: [],
            pageSize: "",
            filtered: [],
            loading: true,
            openModal: false, 
            roleId: "",
            clientId: "",
            name: "",
            clientOptions: [],
        }
        this.Auth = new AuthService();
        this.Token = this.Auth.getToken();

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData = (state, instance) => {

        this.setState({ loading: true })

        let self = this;

        const url = role_url + 'getRoleList/';

        const { pageSize, page, sorted, filtered } = state;

        this.setState({pageSize: pageSize, page: page, sorted: sorted, filtered: filtered});

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
                'Authorization': 'Bearer ' + this.Token
            })
        }).then((response) => { 
                return response.json();
            }).then((res) => {
                //self.setState({data: responseData});

                const pages = Math.ceil(res.totalRecords / pageSize) ;
                self.setState({
                    data: res.roles,
                    pages: pages,
                    loading: false
                });
            })
        .catch(function(err){
            console.log(err);
        })
    }

    updateData = () => {

        var data = this.state;
        data.txndate = Moment(data.txndate).format("YYYY-MM-DD HH:mm:ss");
        data.entrydatetime = Moment(data.entrydatetime).format("YYYY-MM-DD HH:mm:ss");
        data.exitdatetime = Moment(data.exitdatetime).format("YYYY-MM-DD HH:mm:ss");
        

        var id = data.transactionId;

        const url = API.TRANSACTIONS + id;

        var self = this;

        fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            }).then((response) => {
                // const { pageSize, page, sorted, filtered } = state;
                var dataState = {
                    pageSize: self.state.pageSize,
                    page: self.state.page,
                    sorted: self.state.sorted,
                    filtered: self.state.filtered
                };
                self.fetchData(dataState, []);

                this.setState({openModal: false});
                return response.json();
                
            }).then((res) => {
                //self.setState({data: responseData});

                //self.fetchData();
            })
        .catch(function(err){
            console.log(err);
        })

    }

    handleEditButtonClick (e, row) {
        var data = row._original;
        var id = data.id;

        var self = this;

        //const url = API.TRANSACTIONS + id;

        fetch(role_url, {
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
                    var result = res[0];
                    self.setState({
                        roleId: result.id,
                        clientId: result.client_id,
                        name: result.name,
                    });

                    this.setState({openModal: true})
                }
            })
        .catch(function(err){
            console.log(err);
        })

        this.renderOptions();
    }

    renderOptions = () => {
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

    closeModal = () => this.setState({openModal: false, 
                                        roleId: "",
                                        clientId: "",
                                        name: "",
                                    });


    handleChangeInput = (event) => {
        console.log(event);
    }

    render () {

        const { data,
                pages,
                loading,
                openModal,
                name,
                roleId,
                clientId,
                clientOptions
             } = this.state;

        const columns = [{
                id: 'c.name',
                Header: 'Company',
                accessor: 'client'
            }, {
                id: 'r.name',
                Header: 'Title',
                accessor: 'name',
            }, {
                id: 'r.date_created',
                Header: 'Date Created',
                accessor: r => {
                    return Moment(r.date_created)
                            .local().format("MMMM DD, YYYY hh:mm A")
                }
            }, {
                Header: 'Action',
                id: 'edit-button',
                filterable: false,
                sortable: false,
                Cell: ({row}) => (<div className="action-container"><button className="table-edit-button" onClick={(e) => this.handleEditButtonClick(e, row)}>Edit</button></div>)
            }
        ];
     
        return (
            <PageWrapper>
                <PageHeader title="Roles"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Card title="Roles" subTitle="List of Roles">
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
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="first_name">Company</label>
                                    <Select
                                        id="company"
                                        className="form-control"
                                        name="company"
                                        options={clientOptions}
                                        value={clientId}
                                        placeholder="Select Company..."
                                        onChange={(event) => this.setState({clientId: event.target.value })}
                                    />
                                </div>                           
                            </div>
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


export { Roles };