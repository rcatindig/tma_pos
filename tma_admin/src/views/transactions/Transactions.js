import React, { Component } from 'react';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// custom components
import { Card, PageHeader, PageWrapper } from '../../components';

// constants 
import { API } from '../../constants';


class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        }
    }

    componentWillMount() {

        let self = this;

        let url = API.TRANSACTIONS;

        fetch(url)
            .then((response) => {
                return response.json() // << This is the problem
            })
            .then((responseData) => { // responseData = undefined
                //addTestToPage(responseData.title);
                var respData = responseData;
                self.setState({data: respData, loaded: true});
                // return responseData.json();
            })
        .catch(function(err) {
            console.log(err);
        })

        

    }

    render () {

     
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
                                        data={this.state.data}
                                        columns={columns}
                                        defaultPageSize={10}
                                        minRows={0}
                                        filterable={true}
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
    }
];


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