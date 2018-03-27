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
                        // transactionId: result.id,
                        // company: result.company,
                        // txndate: result.txndate,
                        // epan: result.epan,
                        // licplate: result.licplate,
                        // userid: result.userid,
                        // machineid: result.machineid,
                        // serialno: result.serialno,
                        // receiptno: result.receiptno,
                        // uniquetxnno: result.uniquetxnno,
                        // entrydatetime: result.entrydatetime,
                        // exitdatetime: result.exitdatetime,
                        // duration: result.duration,
                        // tariff: result.tariff,
                        // totalamount: result.totalamount,
                        // acceptedtotal: result.acceptedtotal,
                        // nettotal: result.nettotal,
                        // vat: result.vat
                    });
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


                
            </PageWrapper>
        );
        
    }
}


export { Clients };