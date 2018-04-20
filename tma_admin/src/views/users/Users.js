import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// SweetAlert
import SweetAlert from 'react-bootstrap-sweetalert';

// moment
import Moment from 'moment';

import AuthService from '../../utils/AuthService';

// custom components
import { Card, PageHeader, PageWrapper, Modal, Select, Switch, MdInput } from '../../components';

// constants 
import { API, SALT_ROUNDS, STATUS, USER_TYPE, ACCESS_TYPE, MODULE } from '../../constants';

// use for permission
import { GetPermission, CheckUserType } from '../../helpers';


// bcryptjs
import bcrypt from 'bcryptjs';
import { read } from 'fs';
const salt = bcrypt.genSaltSync(SALT_ROUNDS);

const client_url = API.CLIENTS;
const country_url = API.COUNTRIES;
const states_url = API.STATES;
const users_url = API.USERS;
const roles_url = API.ROLES;


class Users extends Component {

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
            userId: "",
            first_name: "",
            middle_name: "",
            surname: "",
            extension: "",
            address: "",
            email: "",
            country_id: "",
            state_id: "",
            username: "",
            password: "",                
            status: "",
            confirmPassword: "",
            countryOptions: [],
            statesOptions: [],
            isChecked: true,
            changePassword: false,
            hidePasswordField: true,
            showErrorMessage: false,
            errorMessage: "",
            client_id: "",
            modalUserTitle: "Add",
            modalUserSaveBtn: "Save",
            clientOptions: [],
            showTypeModal: false,
            typeUser: "",
            hasRoles: false,
            rolesOptions: [],
            role_id: "",  
            readOnly: false,
            accessType: ACCESS_TYPE.NOACCESS
        }

        
        this.Auth = new AuthService();
        this.Token = this.Auth.getToken();
        this.profile = this.Auth.getProfile();

        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount = async() => {
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

        var url = users_url + 'getUserList/';

        

        if(userType === USER_TYPE.CLIENT)
            url += "" + this.profile.client_id;  


        let self = this;

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
                    'Authorization': 'Bearer ' + this.Token
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

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    saveData = () => {

        const { 
            userId,
            first_name,
            middle_name,
            surname,
            extension,
            address,
            email,
            country_id,
            state_id,
            client_id,
            username,
            password,                
            status,
            confirmPassword,
            changePassword,
            role_id,
            typeUser,
            hidePasswordField
         } = this.state;

         var data = {
            first_name: first_name,
            middle_name: middle_name,
            surname: surname,
            extension: extension,
            address: address,
            email: email,
            country_id: country_id,
            state_id: state_id,
            username: username,
            client_id: client_id,
            //password: passwordHash,                
            status: status,
            is_client: typeUser,
            role_id: role_id,
            id: userId
         }

         if(!hidePasswordField)
         {
             if(password !== confirmPassword)
             {
                this.setState({showErrorMessage: true, errorMessage: "Password must be confirmed!"})

                return;
             }

             var passwordHash = bcrypt.hashSync(password, salt);
             data.password = passwordHash;
         }
         
         

         


        if(userId !== "")
            this.updateUser(data);
        else
            this.insertUser(data);

    }

    insertUser = (data) => {
        data.date_created = Moment().format("YYYY-MM-DD HH:mm:ss");
        data.date_modified = Moment().format("YYYY-MM-DD HH:mm:ss");

        var self = this;

        fetch(users_url + "create", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.Token
                })
            }).then((response) => {

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
                //
            })
        .catch(function(err){
            console.log(err);
        })
    }

    updateUser = (data) => {
        data.date_modified = Moment().format("YYYY-MM-DD HH:mm:ss");

        var id = data.id;

        var self = this;

        fetch(users_url + id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.Token
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
    

    handleEditButtonClick = (e, row) => {
        var data = row._original;
        var id = data.id;

        var self = this;

       
        
        //const countryOptions = [];

        this.renderOptions();

        fetch(users_url + id, {
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
                        openModal: true,
                        userId: result.id,
                        first_name: result.first_name,
                        middle_name: result.middle_name,
                        surname: result.surname,
                        extension: result.extension == null ? "" : result.extension,
                        address: result.address,
                        email: result.email,
                        country_id: result.country_id,
                        state_id: result.state_id,
                        username: result.username,
                        //password: result.password,                
                        status: result.status,
                        //confirmPassword: result.password,
                        statesOptions: [],
                        client_id:  result.client_id,
                        typeUser: result.is_client,
                        //userType: result.is_client,
                        hasRoles: result.is_client === USER_TYPE.CLIENT ? true : false,
                        role_id: result.role_id == null ? "" : result.role_id,
                        modalUserTitle: result.is_client === USER_TYPE.CLIENT ? "Edit Client" : "Edit Client",
                        changePassword: false,
                        modalUserSaveBtn: "Save Changes",
                    });

                    if(result.client_id !== "")
                        this.getRoleByClientId(result.client_id);
                    this.getStateOptions(result.country_id);
                }
            })
        .catch(function(err){
            console.log(err);
        });


    }

    openModal = () => {

        this.setState({showTypeModal: true});

    }

    showCreateModal = async() => {

        const userType =  await CheckUserType();
    
    
        this.setState({openModal: true, 
            userId: "",
            first_name: "",
            middle_name: "",
            surname: "",
            extension: "",
            address: "",
            email: "",
            country_id: "",
            state_id: "",
            username: "",
            password: "",                
            status: "",
            confirmPassword: "",
            statesOptions: [],
            client_id: userType === USER_TYPE.CLIENT ? this.profile.client_id : "",
            changePassword: false,
            modalUserSaveBtn: "Save",
        });

        this.renderOptions();
        this.setState({openModal: true})
    }

    renderOptions = () => {
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
        });

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

    closeModal = () => {
        //let ref = 'ref_' + i;
        this.refs["ref_cp"].checked = false;
        this.setState({openModal: false, 
            userId: "",
            first_name: "",
            middle_name: "",
            surname: "",
            extension: "",
            address: "",
            email: "",
            country_id: "",
            state_id: "",
            username: "",
            password: "",                
            status: "",
            confirmPassword: "",
            changePassword: false,
            hidePasswordField: true,
            client_id: "",
            role_id: "",
            statesOptions: [],
            hasRoles: false,
            typeUser: ""
        });
    }
        

    onChangeCountry = (event) => {
        
        const { country_id, readOnly } = this.state;

        if(readOnly)
            return;

        const countryId = event.target.value;
        this.setState({country_id: countryId});


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

    onClickAdmin = () => {
        this.setState({showTypeModal: false, typeUser: USER_TYPE.ADMIN, hasRoles: false, modalUserTitle: "Create Admin"});

        this.showCreateModal();
    }

    onClickClient = () => {
        this.setState({showTypeModal: false, typeUser: USER_TYPE.CLIENT, hasRoles : true, modalUserTitle: "Create Client"});

        this.showCreateModal();
    }

    onChangeCompany = (event) => {

        const { readOnly } = this.state;

        if(readOnly)
            return;

        const clientId = event.target.value;
        this.setState({client_id: clientId, roleOptions: []});

        if(clientId !== "")
           this.getRoleByClientId(clientId);
        
    }

    getRoleByClientId = (clientId) => {
        const url = roles_url + "getRolesByClientId/" + clientId;

        const rolesOptions = [];

        fetch(url, {
                    method: 'GET',
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.Token
                    })
                }).then(results => { 
                        this.setState({rolesOptions: []});
                        return results.json();
                    }).then(res => {
                        if(res.length > 0)
                        {
                            for(var i = 0; i < res.length; i++)
                            {
                                var role = res[i];
                                var optionData = {
                                    value: role.id,
                                    label: role.name
                                }

                                rolesOptions.push(optionData);
                            }

                            this.setState({rolesOptions: rolesOptions});
                            
                        }
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
                first_name,
                middle_name,
                surname,
                extension,
                address,
                email,
                country_id,
                state_id,
                username,
                password,                
                status,
                confirmPassword,
                changePassword,
                hidePasswordField,
                showErrorMessage,
                errorMessage,
                client_id,
                clientOptions,
                modalUserTitle,
                modalUserSaveBtn,
                showTypeModal,
                role_id,
                rolesOptions,
                readOnly,
                accessType,
                userType,
                hasRoles,
             } = this.state;

        const columns = [{
                id: 'u.first_name',
                Header: 'First Name',
                accessor: 'first_name'
            }, {
                id: 'u.middle_name',
                Header: 'Middle Name',
                accessor: 'middle_name'
            }, {
                id: 'u.surname',
                Header: 'Surname',
                accessor: 'surname'
            }, {
                id: 'u.extension',
                Header: 'Ext',
                accessor: 'extension',
                width: 50,
            }, {
                id: 'u.is_client',
                Header: 'Type',
                accessor: u => {
                    return u.is_client === USER_TYPE.CLIENT ? "Client" : "Admin";
                },
                width: 80,
            }, {
                id: 'c.name',
                Header: 'Company',
                accessor: 'company',
                show: userType === USER_TYPE.CLIENT ? false : true,
            }, 
            // {
            //     id: 'u.address',
            //     Header: 'Address',
            //     accessor: 'address'
            // },  
            {
                id: 'pc.name',
                Header: 'Country',
                accessor: 'country'
            }, {
                id: 'ps.name',
                Header: 'State',
                accessor: 'state'
            }, {
                id: 'u.status',
                Header: 'Status',
                width: 70,
                accessor: u => {
                    return u.status === STATUS.ACTIVE ? "Active" : "Inactive";
                }
            }, {
                Header: 'Action',
                id: 'edit-button',
                filterable: false,
                sortable: false,
                width: 70,
                Cell: ({row}) => (<div className="action-container"><button className="table-edit-button" onClick={(e) => this.handleEditButtonClick(e, row)}>{readOnly ? 'View' : 'Edit'}</button></div>)
            }
        ];

        var btns = [];


        if(!readOnly)
        {
            btns = [{id: "add-button", 
                        class: "btn btn-success waves-effect waves-light pull-right", 
                        title: "Add",
                        onClick: this.openModal
                    }];
        }

     
        return (
            <PageWrapper>
                <PageHeader title="Users"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Card 
                                title="Users"
                                subTitle="List of Users"
                                buttons={btns}
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

                <SweetAlert 
                    warning
                    showCancel
                    confirmBtnText="Client"
                    cancelBtnText="Admin"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="primary"
                    title="What type of user that you want to create?"
                    onConfirm={this.onClickClient}
                    onCancel={this.onClickAdmin}
                    closeOnClickOutside={false}
                    show={showTypeModal}
                >
                    
                </SweetAlert>

                <Modal
                    className="modal-component"
                    title={`${modalUserTitle} User`}
                    show={openModal}
                    handleCloseClick={this.closeModal}
                    >
                    <div className="modal-body modal-transactions">
                        <form>
                            <div className="row">
                                <div className="col-sm-12">
                                    <MdInput
                                            label="First Name"
                                            value={first_name}
                                            onChange={(event) => (!readOnly) ? this.setState({first_name: event.target.value }) : first_name }/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <MdInput
                                            label="Middle Name"
                                            value={middle_name}
                                            onChange={(event) => (!readOnly) ? this.setState({middle_name: event.target.value }) : middle_name }/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8">
                                    <MdInput
                                            label="Surname"
                                            value={surname}
                                            onChange={(event) => (!readOnly) ? this.setState({surname: event.target.value }) : surname }/>
                                </div>
                                <div className="col-sm-4">
                                    <MdInput
                                            label="Extension"
                                            value={extension}
                                            onChange={(event) => (!readOnly) ? this.setState({extension: event.target.value }) : extension }/>
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
                                        className="form-control"
                                        name="state"
                                        options={this.state.statesOptions}
                                        value={state_id}
                                        label="State/Region"
                                        onChange={(event) => (!readOnly) ? this.setState({state_id: event.target.value }) : state_id}
                                    />
                                </div>  

                            </div>
                            

                            <div className="row" hidden={userType === USER_TYPE.CLIENT ? true : false}>
                                <div className="col-sm-12">
                                    
                                    <Select
                                        id="company"
                                        name="company"
                                        options={clientOptions}
                                        value={client_id}
                                        label="Company"
                                        onChange={this.onChangeCompany}
                                    />
                                </div>                           
                            </div>

                            <div className="user-credentials-div">
                                <h4 className="text-center">USER CREDENTIALS</h4>

                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <MdInput
                                                label="Username"
                                                value={username}
                                                onChange={(event) => (!readOnly) ? this.setState({username: event.target.value }) : username }/>
                                    </div>                   
                                    <div className="col-sm-12 col-md-6">
                                        <MdInput
                                                label="Email"
                                                value={email}
                                                onChange={(event) => (!readOnly) ? this.setState({email: event.target.value }) : email }/>
                                    </div>                   
                                </div>
                                <div className="row " hidden={readOnly}>
                                    <div className="switch-container justify-content-center">                                    
                                        <label className="switch">
                                            <input type="checkbox" 
                                                defaultChecked={changePassword} 
                                                ref="ref_cp"
                                                onChange={() => this.setState({ changePassword: !changePassword , hidePasswordField: changePassword  ? true: false })} />
                                            <span className="slider round"></span>
                                        </label>
                                        <label className="switch-label-right">
                                            Edit Password
                                        </label>   
                                    </div>
                                </div>

                                <div className="row" hidden={hidePasswordField}>
                                    <div className="col-sm-12 col-md-6">
                                        <MdInput
                                                label="Password"
                                                value={password}
                                                onChange={(event) => (!readOnly) ? this.setState({password: event.target.value }) : password }/>
                                    </div>                   
                                    <div className="col-sm-12 col-md-6">
                                        <MdInput
                                                label="Confirm Password"
                                                value={confirmPassword}
                                                onChange={(event) => (!readOnly) ? this.setState({confirmPassword: event.target.value }) : confirmPassword }/>
                                    </div>                   
                                </div>

                                
                            </div>

                            <div className="row" >
                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="status"
                                        name="status"
                                        options={[{value: STATUS.ACTIVE, label: "Active"}, {value: STATUS.INACTIVE, label: "Inactive"}]}
                                        value={status}
                                        label="Status"
                                        onChange={(event) => (!readOnly) ? this.setState({status: event.target.value }) : status}
                                    />
                                </div>  
                                <div className="col-sm-12 col-md-6">
                                    <Select
                                        id="role"
                                        name="role"
                                        options={rolesOptions}
                                        value={role_id}
                                        label="Role"
                                        onChange={(event) => (!readOnly) ? this.setState({role_id: event.target.value }) : role_id}
                                    />
                                </div>                           
                            </div>
                           
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button hidden={readOnly} type="button" className="btn btn-primary" onClick={() => this.saveData()}>{modalUserSaveBtn}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()} data-dismiss="modal" >Close</button>
                    </div>
                </Modal>

                <SweetAlert 
                    error
                    //showCancel
                    confirmBtnText="Close"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Failed!"
                    onConfirm={() => this.setState({showErrorMessage: false})}
                    // onCancel={this.cancelDelete}
                    show={showErrorMessage}
                >
                    {errorMessage}
                </SweetAlert>
                
            </PageWrapper>
        );
        
    }
}


export { Users };