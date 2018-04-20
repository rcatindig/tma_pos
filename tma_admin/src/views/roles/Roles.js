import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// moment
import Moment from 'moment';

// custom components
import { Card, PageHeader, PageWrapper, Modal, Select, MdInput } from '../../components';

import AuthService from '../../utils/AuthService';

// use for permission
import { GetPermission, CheckUserType } from '../../helpers';

// constants 
import { API, ACCESS_TYPE, MODULE, USER_TYPE } from '../../constants';
// import { read } from 'fs';

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
            readOnly: false,
            accessType: ACCESS_TYPE.NOACCESS,
            isSetUp: true,
            userType: USER_TYPE.ADMIN
        }
        this.Auth = new AuthService();
        this.Token = this.Auth.getToken();

        this.fetchData = this.fetchData.bind(this);
        this.saveAccessControl = this.saveAccessControl.bind(this);

        this.profile = this.Auth.getProfile();
    }

    componentWillMount = async () => {

        const userType =  await CheckUserType();

        var readOnly = false;

        var accessType = ACCESS_TYPE.NOACCESS;

        if(userType === USER_TYPE.CLIENT)
        {
            var rolAccess = await GetPermission(MODULE.ROLES);
            if(rolAccess === ACCESS_TYPE.NOACCESS)
                return;


            if(rolAccess === ACCESS_TYPE.READONLY)
                readOnly = true;

            accessType = rolAccess;
        }

        this.setState({
            readOnly: readOnly,
            accessType: accessType,
            userType: userType });
    }


    fetchData = async(state, instance) => {

        const userType =  await CheckUserType();
       

        let self = this;

        var url = role_url + 'getRoleList/';

        if(userType === USER_TYPE.CLIENT)
            url += this.profile.client_id;

        this.setState({ loading: true });

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
                    loading: false,
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

        const readOnly = this.state.readOnly;

        if(readOnly)
            alert("Error. You are not allowed to save the data.");

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

        const url = role_url + id;

        fetch(url, {
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
                        modalRoleBtnSave: "Save Changes",
                        openModal: true,
                    });

                    //this.setState({openModal: true})
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

        const { userType } = this.state;
        

        this.setState({openModal: true, 
            roleId: "",
            name: "",
            clientId: userType === USER_TYPE.CLIENT ? this.profile.client_id : "",
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
                    'Authorization': 'Bearer ' + this.Token
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
                        rolesAccess = rolData[0].access_type;

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
                'Authorization': 'Bearer ' + this.Token
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
                readOnly,
                userType
             } = this.state;

        const columns = [{
                id: 'c.name',
                Header: 'Company',
                accessor: 'client',
                show: userType === USER_TYPE.CLIENT ? false : true,
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
                width: 80,
                Cell: ({row}) => (<div className="action-container"><button className="table-edit-button" onClick={(e) => this.handleEditButtonClick(e, row)}>{readOnly ? "View" : "Edit"}</button></div>)
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


        var addBtn = [];

        if(!readOnly)
        {
            addBtn = [{id: "add-button", 
                    class: "btn btn-success waves-effect waves-light pull-right", 
                    title: "Add",
                    onClick: this.addModal
                }];
        }
     
        return (
            <PageWrapper>
                <PageHeader title="List of Roles"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Card 
                                title="Roles" 
                                subTitle="List of Roles"
                                buttons={addBtn}
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
                        <form >
                            <div className="row">

                                    <div className="col-sm-12" hidden={userType === USER_TYPE.CLIENT ? true : false}>
                                        <Select
                                            id="company"
                                            className="form-control"
                                            options={clientOptions}
                                            value={clientId}
                                            label="Company"
                                            onChange={(event) => (!readOnly) ?  this.setState({clientId: event.target.value }) : clientId}
                                        />
                                    </div>

                                    <div className="col-sm-12">
                                        <MdInput
                                            label="Name"
                                            value={name}
                                            onChange={(event) => (!readOnly) ? this.setState({name: event.target.value }) : name }/>
                                    </div>
                            </div>        

                            {this.showAccessButton()}
 
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button hidden={readOnly} type="button" className="btn btn-primary" onClick={() => this.saveData()}>{modalRoleBtnSave}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()} data-dismiss="modal" >Close</button>
                    </div>
                </Modal>

                <Modal
                    className="modal-component"
                    title="Access"
                    show={openAccessModal}
                    size="medium"
                    handleCloseClick={this.closeAccessControl}
                    >
                    <div className="modal-body">
                        <form>
                            
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="dashboardAccess"
                                        className="form-control"
                                        options={accessOptions}
                                        value={dashboardAccess !== "" ? dashboardAccess : ACCESS_TYPE.NOACCESS}
                                        label="Dashboard"
                                        onChange={(event) => (!readOnly) ? this.setState({dashboardAccess: event.target.value }) : dashboardAccess }
                                    />
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="transactionsAccess"
                                        className="form-control"
                                        options={accessOptions}
                                        value={transactionsAccess !== "" ? transactionsAccess : ACCESS_TYPE.NOACCESS}
                                        label="Transactions"
                                        onChange={(event) => (!readOnly) ? this.setState({transactionsAccess: event.target.value }) : transactionsAccess }
                                    />
                                </div>
                            </div>
                            
                                                           
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="backendReportAccess"
                                        className="form-control"
                                        options={accessOptions}
                                        value={backendReportAccess !== "" ? backendReportAccess : ACCESS_TYPE.NOACCESS}
                                        label="Backend Reports"
                                        onChange={(event) => (!readOnly) ? this.setState({backendReportAccess: event.target.value }) : backendReportAccess }
                                    />
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="clientsAccess"
                                        className="form-control"
                                        options={accessOptions}
                                        value={clientsAccess !== "" ? clientsAccess : ACCESS_TYPE.NOACCESS}
                                        label="Clients"
                                        onChange={(event) => (!readOnly) ? this.setState({clientsAccess: event.target.value }) : clientsAccess }
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="usersAccess"
                                        className="form-control"
                                        options={accessOptions}
                                        value={usersAccess !== "" ? usersAccess : ACCESS_TYPE.NOACCESS}
                                        label="Users"
                                        onChange={(event) => (!readOnly) ? this.setState({usersAccess: event.target.value }) : usersAccess }
                                    />
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="rolesAccess"
                                        className="form-control"
                                        options={accessOptions}
                                        value={rolesAccess !== "" ? rolesAccess : ACCESS_TYPE.NOACCESS}
                                        label="Roles"
                                        onChange={(event) => (!readOnly) ? this.setState({rolesAccess: event.target.value }) : rolesAccess }
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button hidden={readOnly} className="btn btn-primary" onClick={() => this.saveAccessControl()}>{modalRoleBtnSave}</button>
                        <button className="btn btn-secondary" onClick={() => this.closeAccessControl()} data-dismiss="modal" >Close</button>
                    </div>
                </Modal>

            </PageWrapper>
        );
        
    }
}


export { Roles };