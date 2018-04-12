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
import { API, ACCESS_TYPE, MODULE } from '../../constants';

const role_url = API.ROLES;
const client_url = API.CLIENTS;
const role_permission_url = API.ROLE_PERMISSIONS;



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
            modalRoleTitle: "Add Role",
            modalRoleBtnSave: "Save",
            openAccessModal: false,
        }
        this.Auth = new AuthService();
        this.Token = this.Auth.getToken();

        this.fetchData = this.fetchData.bind(this);
        this.saveAccessControl = this.saveAccessControl.bind(this);
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

    saveData = (event) => {

        const { roleId, clientId, name } = this.state;

        var data = {
            id: roleId,
            client_id: clientId,
            name: name,
            date: Moment().format("YYYY-MM-DD HH:mm:ss")
        }

        if(roleId !== "")
            this.updateData(data);
        else
            this.addData(data);
    }

    addData = (data) => {
        
        const url = role_url;

        var self = this;

        fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.Token
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

    updateData = (data) => {

        var id = data.id;

        const url = role_url + id;

        var self = this;

        fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.Token
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
                        modalRoleTitle: "Edit Role",
                        modalRoleBtnSave: "Save Changes"
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
    
    addModal = () => {

        this.setState({openModal: true, 
            roleId: "",
            name: "",
            clientId: "",
            modalRoleTitle: "Add Role",
            modalRoleBtnSave: "Save"            
        });

        this.renderOptions();
        

    }

    showAccessButton = () => {
        const { roleId } = this.state;

        if(roleId !== "")
        {
            return (
                <div className="access-control">
                    <button  className="btn btn-warning btn-flat btn-addon m-b-10 m-l-5" onClick={this.showAccessControl}>
                        <i className="fa fa-lock"></i> User Access
                    </button>
                </div>
            );
        } else 
            return;

    }

    showAccessControl = (event) => {
        event.preventDefault();
        const { roleId } = this.state;

        // get role permission
        const url = role_permission_url + "getByRoleId/" + roleId;

        var self = this;

        fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    // 'Authorization': 'Bearer ' + this.Token
                })
            }).then((response) => {
                
                
                return response.json();
                
            }).then((res) => {

                var dashboardAccess = ACCESS_TYPE.NOACCESS,
                    transactionsAccess = ACCESS_TYPE.NOACCESS,
                    backendReportAccess = ACCESS_TYPE.NOACCESS,
                    clientsAccess = ACCESS_TYPE.NOACCESS,
                    usersAccess = ACCESS_TYPE.NOACCESS,
                    rolesAccess = ACCESS_TYPE.NOACCESS;


                console.log(res);
                    
                
                if(res.length > 0)
                {
                    let dbData = res.filter(dta => dta.module_id === MODULE.DASHBOARD);
                    let txnData = res.filter(dta => dta.module_id === MODULE.TRANSACTIONS);
                    let brData = res.filter(dta => dta.module_id === MODULE.BACKEND_REPORT);
                    let cltData = res.filter(dta => dta.module_id === MODULE.CLIENTS);
                    let usrData = res.filter(dta => dta.module_id === MODULE.USERS);
                    let rolData = res.filter(dta => dta.module_id === MODULE.ROLES);
                    if(dbData.length > 0)
                        dashboardAccess = dbData[0].access_type;

                    if(txnData.length > 0)
                        transactionsAccess = txnData[0].access_type;
                    
                    if(brData.length > 0)
                        backendReportAccess = brData[0].access_type;

                    if(cltData.length > 0)
                        clientsAccess = cltData[0].access_type;

                    if(usrData.length > 0)
                        usersAccess = usrData[0].access_type;

                    if(rolData.length > 0)
                        rolesAccess = usrData[0].access_type;

                } 
                self.setState({ openAccessModal: true, 
                                dashboardAccess: dashboardAccess,
                                backendReportAccess: backendReportAccess,
                                transactionsAccess: transactionsAccess,
                                clientsAccess: clientsAccess,
                                usersAccess: usersAccess,
                                rolesAccess: rolesAccess});
               
            })
        .catch(function(err){
            console.log(err);
        })

    }

    closeAccessControl = () => {
        this.setState({ openAccessModal: false,
                        dashboardAccess: "",
                        backendReportAccess: "",
                        clientsAccess: "",
                        usersAccess: "",
                        rolesAccess: ""
                    });
    }

    saveAccessControl = (event) => {

        const url = role_permission_url + "savePermission/";
        
        const { roleId, 
                dashboardAccess, 
                transactionsAccess, 
                backendReportAccess, 
                clientsAccess, 
                usersAccess,
                rolesAccess } = this.state;


        const data = {
                        role_id: roleId,
                        access_data: [
                                        {
                                            module_id: MODULE.DASHBOARD,
                                            access_type: dashboardAccess
                                        },{
                                            module_id: MODULE.TRANSACTIONS,
                                            access_type: transactionsAccess
                                        },{
                                            module_id: MODULE.BACKEND_REPORT,
                                            access_type: backendReportAccess
                                        },{
                                            module_id: MODULE.CLIENTS,
                                            access_type: clientsAccess
                                        },{
                                            module_id: MODULE.USERS,
                                            access_type: usersAccess
                                        },{
                                            module_id: MODULE.ROLES,
                                            access_type: rolesAccess
                                        }
                                        
                                    ]
                    };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + this.Token
            })
        }).then((response) => { 
                console.log(response);
                this.closeAccessControl();
                return response.json();
            }).then((res) => {
                
            })
        .catch(function(err){
            console.log(err);
        })
    }

    render () {

        const { data,
                pages,
                loading,
                openModal,
                name,
                roleId,
                clientId,
                clientOptions,
                modalRoleTitle,
                modalRoleBtnSave,
                openAccessModal,
                dashboardAccess,
                transactionsAccess,
                backendReportAccess,
                clientsAccess,
                usersAccess,
                rolesAccess,
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

        const accessOptions = [ 
                                {
                                    value: ACCESS_TYPE.NOACCESS, 
                                    label: "No Access"
                                },
                                {
                                    value: ACCESS_TYPE.READONLY,
                                    label: "Read Only"
                                },
                                {
                                    value: ACCESS_TYPE.FULLACCESS,
                                    label: "Full Access"
                                }
                            ];
     
        return (
            <PageWrapper>
                <PageHeader title="Roles"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Card 
                                title="Roles" 
                                subTitle="List of Roles"
                                buttons={[{id: "add-button", 
                                    class: "btn btn-success waves-effect waves-light pull-right", 
                                    title: "Add",
                                    onClick: this.addModal
                                }]}
                                >
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
                    title={modalRoleTitle}
                    show={openModal}
                    handleCloseClick={this.closeModal}
                    >
                    <div className="modal-body ">
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

                            {this.showAccessButton()}

                            
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => this.saveData()}>{modalRoleBtnSave}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()} data-dismiss="modal" >Close</button>
                    </div>
                </Modal>

                <Modal
                    className="modal-component"
                    title="Access"
                    show={openAccessModal}
                    size="small"
                    handleCloseClick={this.closeAccessControl}
                    >
                    <div className="modal-body role-access-modal">
                        <form className="form-control">
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="dashboardAccess">Dashboard</label>
                                    <Select
                                        id="dashboardAccess"
                                        className="form-control"
                                        name="dashboardAccess"
                                        options={accessOptions}
                                        value={dashboardAccess !== "" ? dashboardAccess : ACCESS_TYPE.NOACCESS}
                                        placeholder="Select Access..."
                                        onChange={(event) => this.setState({dashboardAccess: event.target.value })}
                                    />
                                </div>                           
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="transactionsAccess">Transactions</label>
                                    <Select
                                        id="transactionsAccess"
                                        className="form-control"
                                        name="transactionsAccess"
                                        options={accessOptions}
                                        value={transactionsAccess !== "" ? transactionsAccess : ACCESS_TYPE.NOACCESS}
                                        placeholder="Select Access..."
                                        onChange={(event) => this.setState({transactionsAccess: event.target.value })}
                                    />
                                </div>                           
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="backendReportAccess">Backend Report</label>
                                    <Select
                                        id="backendReportAccess"
                                        className="form-control"
                                        name="backendReportAccess"
                                        options={accessOptions}
                                        value={backendReportAccess !== "" ? backendReportAccess : ACCESS_TYPE.NOACCESS}
                                        placeholder="Select Access..."
                                        onChange={(event) => this.setState({backendReportAccess: event.target.value })}
                                    />
                                </div>                           
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="clientsAccess">Clients</label>
                                    <Select
                                        id="clientsAccess"
                                        className="form-control"
                                        name="clientsAccess"
                                        options={accessOptions}
                                        value={clientsAccess !== "" ? clientsAccess : ACCESS_TYPE.NOACCESS}
                                        placeholder="Select Access..."
                                        onChange={(event) => this.setState({clientsAccess: event.target.value })}
                                    />
                                </div>                           
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="usersAccess">Users</label>
                                    <Select
                                        id="usersAccess"
                                        className="form-control"
                                        name="usersAccess"
                                        options={accessOptions}
                                        value={usersAccess !== "" ? usersAccess : ACCESS_TYPE.NOACCESS}
                                        placeholder="Select Access..."
                                        onChange={(event) => this.setState({usersAccess: event.target.value })}
                                    />
                                </div>                           
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="rolesAccess">Roles</label>
                                    <Select
                                        id="rolesAccess"
                                        className="form-control"
                                        name="rolesAccess"
                                        options={accessOptions}
                                        value={rolesAccess !== "" ? rolesAccess : ACCESS_TYPE.NOACCESS}
                                        placeholder="Select Access..."
                                        onChange={(event) => this.setState({rolesAccess: event.target.value })}
                                    />
                                </div>                           
                            </div>
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={() => this.saveAccessControl()}>{modalRoleBtnSave}</button>
                        <button className="btn btn-secondary" onClick={() => this.closeAccessControl()} data-dismiss="modal" >Close</button>
                    </div>
                </Modal>

            </PageWrapper>
        );
        
    }
}


export { Roles };