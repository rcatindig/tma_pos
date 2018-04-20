import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// moment
import Moment from 'moment';

// custom components
import { Card, PageHeader, PageWrapper, Modal, MdInput } from '../../components';

// use for permission
import { GetPermission, CheckUserType } from '../../helpers';
import { MODULE, ACCESS_TYPE, USER_TYPE } from '../../constants';

// constants 
import { API } from '../../constants';

import AuthService from '../../utils/AuthService';



class Transactions extends Component {
    

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
            transactionId: "",
            company: "",
            txndate: "",
            epan: "",
            licplate: "",
            userid: "",
            machineid: "",
            serialno: "",
            uniquetxnno: "",
            receiptno: "",
            entrydatetime: "",
            exitdatetime: "",
            duration: "",
            tariff: "",
            totalamount: "",
            acceptedtotal: "",
            nettotal: "",
            vat: "",
            readOnly: false,
            accessType: ACCESS_TYPE.NOACCESS,
            client_id: "",
        }
        

        this.Auth = new AuthService();
        this.Token = this.Auth.getToken();
        this.profile = this.Auth.getProfile();

        this.fetchData = this.fetchData.bind(this);
    }


    componentWillMount = async () => {

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

            this.setState({client_id: this.profile.client_id});
        }

        this.setState({
            readOnly: readOnly,
            accessType: accessType,
            userType: userType });
    }

    fetchData = async (state, instance) => {

        const userType =  await CheckUserType();

        this.setState({ loading: true })

        let self = this;

        var url = API.TRANSACTIONS + 'getTransactions/';

        if(userType === USER_TYPE.CLIENT)
            url += this.profile.client_id;

        console.log(url);

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
                })
            }).then((response) => { 
                return response.json();
            }).then((res) => {
                //self.setState({data: responseData});

                const pages = Math.ceil(res.totalRecords / pageSize) ;
                self.setState({
                    data: res.transactions,
                    pages: pages,
                    loading: false,
                });

            })
        .catch(function(err){
            console.log(err);
        })
    }

    updateData = () => {


        const readOnly = this.state.readOnly;

        if(readOnly)
            alert("Error. You are not allowed to save the data.");

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

        const url = API.TRANSACTIONS + id;

        fetch(url)
            .then(results => { 
                return results.json();
            }).then(res => {
                if(res.length > 0)
                {
                    var result = res[0];
                    self.setState({
                        transactionId: result.id,
                        company: result.company,
                        txndate: result.txndate,
                        epan: result.epan,
                        licplate: result.licplate,
                        userid: result.userid,
                        machineid: result.machineid,
                        serialno: result.serialno,
                        receiptno: result.receiptno,
                        uniquetxnno: result.uniquetxnno,
                        entrydatetime: result.entrydatetime,
                        exitdatetime: result.exitdatetime,
                        duration: result.duration,
                        tariff: result.tariff,
                        totalamount: result.totalamount,
                        acceptedtotal: result.acceptedtotal,
                        nettotal: result.nettotal,
                        vat: result.vat
                    });
                }
            })
        .catch(function(err){
            console.log(err);
        })


        this.setState({openModal: true})
    }

    closeModal = () => this.setState({openModal: false, 
                                        transactionId: "",
                                        company: "",
                                        txndate: "",
                                        epan: "",
                                        licplate: "",
                                        userid: "",
                                        machineid: "",
                                        serialno: "",
                                        uniquetxnno: "",
                                        receiptno: "",
                                        entrydatetime: "",
                                        exitdatetime: "",
                                        duration: "",
                                        tariff: "",
                                        totalamount: "",
                                        acceptedtotal: "",
                                        nettotal: "",
                                        vat: ""
                                    });


    handleChangeInput = (event) => {
        console.log(event);
    }

    render () {

        const { data,
                pages,
                loading,
                openModal,
                company,
                txndate,
                epan,
                licplate,
                userid,
                machineid,
                serialno,
                uniquetxnno,
                receiptno,
                entrydatetime,
                exitdatetime,
                duration,
                tariff,
                totalamount,
                acceptedtotal,
                nettotal,
                vat,
                readOnly,
                userType,
             } = this.state;

        const columns = [{
                id: 'c.name',
                Header: 'Client',
                accessor: 'client',
                show: (userType === USER_TYPE.CLIENT) ? false : true, 
            },{
                id: 't.company',
                Header: 'Company',
                accessor: 'company',
                width: 70
            }, {
                id: 't.txndate',
                Header: 'Transaction Date',
                accessor: t => {
                    return Moment(t.txndate)
                            .local().format("MMMM DD, YYYY hh:mm A")
                }
            }, {
                id: 't.licplate',
                Header: 'Licence Plate',
                accessor: 'licplate',
                width: 80
            }, {
                id: 'entrydatetime',
                Header: 'Entry Date/Time',
                accessor: t => {
                    return Moment(t.entrydatetime)
                            .local().format("MMMM DD, YYYY hh:mm A")
                }
            }, {
                id: 'exitdatetime',
                Header: 'Exit Date/Time',
                accessor: t => {
                    return Moment(t.exitdatetime)
                            .local().format("MMMM DD, YYYY hh:mm A")
                }
            }, {
                Header: 'Action',
                id: 'edit-button',
                filterable: false,
                sortable: false,
                width: 80,
                Cell: ({row}) => (<div className="action-container"><button className="table-edit-button" onClick={(e) => this.handleEditButtonClick(e, row)}>{(readOnly) ? "View" : "Edit"}</button></div>)
            }
        ];
     
        return (
            <PageWrapper>
                <PageHeader title="Transactions"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Card title="List of Transactions" >
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
                    title="Edit Transaction"
                    show={openModal}
                    handleCloseClick={this.closeModal}
                    >
                    <div className="modal-body modal-transactions">
                        <form>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Company"
                                            value={company}
                                            onChange={(event) => (!readOnly) ? this.setState({company: event.target.value }) : company }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Transaction Date"
                                            value={txndate}
                                            onChange={(event) => (!readOnly) ? this.setState({txndate: event.target.value }) : txndate }/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="EPAN"
                                            value={epan}
                                            onChange={(event) => (!readOnly) ? this.setState({epan: event.target.value }) : epan }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Licence Plate"
                                            value={licplate}
                                            onChange={(event) => (!readOnly) ? this.setState({licplate: event.target.value }) : licplate }/>
                                </div>
                            </div>
                            
                            <div className="row">
                                
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Machine ID"
                                            value={machineid}
                                            onChange={(event) => (!readOnly) ? this.setState({machineid: event.target.value }) : machineid }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Serial Number"
                                            value={serialno}
                                            onChange={(event) => (!readOnly) ? this.setState({serialno: event.target.value }) : serialno }/>
                                </div>
                            </div>

                            <div className="row">
                                
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Transaction Number"
                                            value={uniquetxnno}
                                            onChange={(event) => (!readOnly) ? this.setState({uniquetxnno: event.target.value }) : uniquetxnno }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Receipt Number"
                                            value={receiptno}
                                            onChange={(event) => (!readOnly) ? this.setState({receiptno: event.target.value }) : receiptno }/>
                                </div>
                            </div>
                            

                            <div className="row">
                                
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Entry Date Time"
                                            value={entrydatetime}
                                            onChange={(event) => (!readOnly) ? this.setState({entrydatetime: event.target.value }) : entrydatetime }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Exit Date Time"
                                            value={exitdatetime}
                                            onChange={(event) => (!readOnly) ? this.setState({exitdatetime: event.target.value }) : exitdatetime }/>
                                </div>
                            </div>
                            
                            <div className="row">
                                
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Duration"
                                            value={duration}
                                            onChange={(event) => (!readOnly) ? this.setState({duration: event.target.value }) : duration }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Tariff"
                                            value={tariff}
                                            onChange={(event) => (!readOnly) ? this.setState({tariff: event.target.value }) : tariff }/>
                                </div>
                            </div>
                            

                            <div className="row">
                                
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Total Amount"
                                            value={totalamount}
                                            onChange={(event) => (!readOnly) ? this.setState({totalamount: event.target.value }) : totalamount }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Accepted Total"
                                            value={acceptedtotal}
                                            onChange={(event) => (!readOnly) ? this.setState({acceptedtotal: event.target.value }) : acceptedtotal }/>
                                </div>
                            </div>

                            <div className="row">
                                
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="Net Total"
                                            value={nettotal}
                                            onChange={(event) => (!readOnly) ? this.setState({nettotal: event.target.value }) : nettotal }/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MdInput
                                            label="VAT"
                                            value={vat}
                                            onChange={(event) => (!readOnly) ? this.setState({vat: event.target.value }) : vat }/>
                                </div>
                            </div>

                            
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button hidden={readOnly} type="button" className="btn btn-primary" onClick={() => this.updateData()}>Save changes</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()} data-dismiss="modal" >Close</button>
                    </div>
                </Modal>

            </PageWrapper>
        );
        
    }
}


export { Transactions };