import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// moment
import Moment from 'moment';

// custom components
import { Card, PageHeader, PageWrapper, Modal } from '../../components';

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
        }

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData = (state, instance) => {

        this.setState({ loading: true })

        let self = this;

        const url = API.TRANSACTIONS + 'getTransactions/';

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
                self.fetchData(data, []);

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
                sorted,
                pageSize,
                filtered,
                loading,
                openModal,
                transactionId,
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
                vat
             } = this.state;

        const columns = [{
                Header: 'Company',
                accessor: 'company'
            }, {
                id: 'txndate',
                Header: 'Transaction Date',
                accessor: t => {
                    return Moment(t.txndate)
                            .local().format("MMMM DD, YYYY hh:mm a")
                }
            }, {
                Header: 'Epan',
                accessor: 'epan'
            }, {
                Header: 'Licence Plate',
                accessor: 'licplate'
            }, {
                Header: 'User Id',
                accessor: 'userid'
            }, {
                Header: 'Machine Id',
                accessor: 'machineid'
            }, {
                Header: 'Serial Number',
                accessor: 'serialno'
            }, {
                id: 'entrydatetime',
                Header: 'Entry Date/Time',
                accessor: t => {
                    return Moment(t.entrydatetime)
                            .local().format("MMMM DD, YYYY hh:mm a")
                }
            }, {
                id: 'exitdatetime',
                Header: 'Exit Date/Time',
                accessor: t => {
                    return Moment(t.exitdatetime)
                            .local().format("MMMM DD, YYYY hh:mm a")
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
                    <div className="modal-body transaction-modal">
                        <form className="form-control">
                            <input type="hidden" value={transactionId}/>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="company">Company</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="company" 
                                        placeholder="Company" 
                                        value={company} 
                                        onChange={(event) => this.setState({company: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="txndate">Transaction Date</label>
                                    <input type="text" 
                                        className="form-control"
                                        id="txndate"
                                        placeholder="Transaction Date"
                                        value={txndate}
                                        onChange={(event) => this.setState({txndate: event.target.value })}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="epan">EPAN</label>
                                    <input type="text"
                                        className="form-control" 
                                        id="epan" 
                                        placeholder="Epan" 
                                        value={epan}
                                        onChange={(event) => this.setState({epan: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="licplate">Licence Plate</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="licplate" 
                                        placeholder="License Plate" 
                                        value={licplate} 
                                        onChange={(event) => this.setState({licplate: event.target.value })}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="userid">User Id</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="userid" 
                                        placeholder="User Id" 
                                        value={userid}
                                        onChange={(event) => this.setState({userid: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="machineid">Machine Id</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="machineid" 
                                        placeholder="Machine Id" 
                                        value={machineid}
                                        onChange={(event) => this.setState({machineid: event.target.value })}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="serialno">Serial Number</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="serialno" 
                                        placeholder="Serial Number" 
                                        value={serialno}
                                        onChange={(event) => this.setState({serialno: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="uniquetxnno">Unique Transaction No.</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="uniquetxnno" 
                                        placeholder="Unique Transaction No."
                                        value={uniquetxnno}
                                        onChange={(event) => this.setState({uniquetxnno: event.target.value })} />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="receiptno">Receipt No.</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="receiptno" 
                                        placeholder="Unique Transaction No."
                                        value={receiptno}
                                        onChange={(event) => this.setState({receiptno: event.target.value })} />
                                </div>
                                
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="entrydatetime">Entry Date Time</label>
                                    <input type="text" 
                                        className="form-control"
                                        id="entrydatetime"
                                        placeholder="MM/DD/YYYY"
                                        value={entrydatetime} 
                                        onChange={(event) => this.setState({entrydatetime: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="exitdatetime">Exit Date Time</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="exitdatetime" 
                                        placeholder="MM/DD/YYYY" 
                                        value={exitdatetime} 
                                        onChange={(event) => this.setState({exitdatetime: event.target.value })} />
                                </div>
                                
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="duration">Duration</label>
                                    <input type="text" 
                                        className="form-control"
                                        id="duration"
                                        placeholder="Duration"
                                        value={duration} 
                                        onChange={(event) => this.setState({duration: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="tariff">Tariff</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="tariff" 
                                        placeholder="Tariff" 
                                        value={tariff} 
                                        onChange={(event) => this.setState({tariff: event.target.value })} />
                                </div>
                                
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="totalamount">Total Amount</label>
                                    <input type="text" 
                                        className="form-control"
                                        id="totalamount"
                                        placeholder="Total Amount"
                                        value={totalamount} 
                                        onChange={(event) => this.setState({totalamount: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="acceptedtotal">Accepted Total</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="acceptedtotal" 
                                        placeholder="Accepted Total" 
                                        value={acceptedtotal} 
                                        onChange={(event) => this.setState({acceptedtotal: event.target.value })} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="nettotal">Net Total</label>
                                    <input type="text" 
                                        className="form-control"
                                        id="nettotal"
                                        placeholder="Net Total"
                                        value={nettotal} 
                                        onChange={(event) => this.setState({nettotal: event.target.value })}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="vat">VAT</label>
                                    <input type="text" 
                                        className="form-control" 
                                        id="vat" 
                                        placeholder="VAT" 
                                        value={vat} 
                                        onChange={(event) => this.setState({vat: event.target.value })} />
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