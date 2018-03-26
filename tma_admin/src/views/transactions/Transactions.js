import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// custom components
import { Card, PageHeader, PageWrapper, Modal } from '../../components';

// constants 
import { API } from '../../constants';


class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: null,
            loading: true,
            openModal: false,
            transactionId: "",
            company: "",
            txndate: "",
            epan: "",
            licplate: "",
            userid: "",
            machineid: "",
            serialno: "",
            uniquetxnno: "",
            entrydatetime: "",
            exitdatetime: ""
        }

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(state, instance) {

        this.setState({ loading: true })

        let self = this;

        const url = API.TRANSACTIONS + 'getTransactions/';

        const { pageSize, page, sorted, filtered } = state;

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
                        uniquetxnno: result.uniquetxnno,
                        entrydatetime: result.entrydatetime,
                        exitdatetime: result.exitdatetime
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
                                        entrydatetime: "",
                                        exitdatetime: ""
                                    });

    render () {

        const { data,
                pages,
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
                entrydatetime,
                exitdatetime
             } = this.state;

        const columns = [{
                Header: 'Company',
                accessor: 'company'
            }, {
                Header: 'Transaction Date',
                accessor: 'txndate'
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
                Header: 'Entry Date/Time',
                accessor: 'entrydatetime',
            }, {
                Header: 'Exit Date/Time',
                accessor: 'exitdatetime'
            }, {
                Header: 'Action',
                id: 'edit-button',
                Cell: ({row}) => (<div className="action-container"><button className="table-edit-button" onClick={(e) => this.handleEditButtonClick(e, row)}>Edit</button></div>)
            }
        ];
     
        return (
            <PageWrapper>
                <PageHeader title="Transactions"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Card title="Transactions" subTitle="List of Transactions">
                                <div className="table-responsive m-t-40">
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
                    >
                    <div className="modal-body">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="company">Company</label>
                                    <input type="text" className="form-control" id="company" placeholder="Company" value={company}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="txndate">Transaction Date</label>
                                    <input type="text" className="form-control" id="txndate" placeholder="Transaction Date" value={txndate}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="epan">EPAN</label>
                                    <input type="text" className="form-control" id="epan" placeholder="Epan" value={epan}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="licplate">Licence Plate</label>
                                    <input type="text" className="form-control" id="licplate" placeholder="License Plate" value={licplate} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="userid">User Id</label>
                                    <input type="text" className="form-control" id="userid" placeholder="User Id" value={userid}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="machineid">Machine Id</label>
                                    <input type="text" className="form-control" id="machineid" placeholder="Machine Id" value={machineid}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="serialno">Serial Number</label>
                                    <input type="text" className="form-control" id="serialno" placeholder="Serial Number" value={serialno}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="uniquetxnno">Unique Transaction No.</label>
                                    <input type="text" className="form-control" id="uniquetxnno" placeholder="Unique Transaction No." value={uniquetxnno} />
                                </div>
                                
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="entrydatetime">Entry Date Time</label>
                                    <input type="text" className="form-control" id="entrydatetime" placeholder="MM/DD/YYYY" value={entrydatetime} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="userid">Exit Date Time</label>
                                    <input type="text" className="form-control" id="userid" placeholder="MM/DD/YYYY"  value={exitdatetime} />
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save changes</button>
                        <button type="button" className="btn btn-secondary" onClick={()=> this.setState({openModal: false}) } data-dismiss="modal" >Close</button>
                    </div>
                </Modal>

            </PageWrapper>
        );
        
    }
}


export { Transactions };