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
            openModal: false
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
        console.log(row);

        this.setState({openModal: true})
    }

    closeModal = () => this.setState({openModal: false});

    render () {

        const { data, pages, loading, showModal } = this.state;

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
                    show={this.state.openModal}
                    >
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
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




// const data = [{
//         name: 'Reynard Catindig',
//         position: 'Software Developer',
//         office: 'TMA Tech',
//         age: '23',
//         startDate: 'Jan. 12, 2018',
//         salary: '1'
//     }, {
//         name: 'John Doe',
//         position: 'Software Developer',
//         office: 'TMA Tech',
//         age: '18',
//         startDate: 'Jan. 12, 2018',
//         salary: '1'
//     }, {
//         name: 'John Peter',
//         position: 'Software Developer',
//         office: 'TMA Tech',
//         age: '12',
//         startDate: 'Jan. 12, 2018',
//         salary: '1'
//     }, {
//         name: 'Peter Solomon',
//         position: 'Software Developer',
//         office: 'TMA Tech',
//         age: '12',
//         startDate: 'Jan. 12, 2018',
//         salary: '1'
//     }, {
//         name: 'Karen Solomon',
//         position: 'Software Developer',
//         office: 'TMA Tech',
//         age: '12',
//         startDate: 'Jan. 12, 2018',
//         salary: '1'
//     }, {
//         name: 'David Roque',
//         position: 'Technical Lead',
//         office: 'TMA Tech',
//         age: '12',
//         startDate: 'Jan. 12, 2018',
//         salary: '12356'
//     }, {
//         name: 'Xander Ford',
//         position: 'Project Manager',
//         office: 'TMA Tech',
//         age: '12',
//         startDate: 'Jan. 12, 2018',
//         salary: '1'
//     }
// ]





export { Transactions };