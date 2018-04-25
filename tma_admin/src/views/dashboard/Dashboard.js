import React, { Component } from 'react';
import {  PageHeader, PageWrapper } from '../../components';
import io from 'socket.io-client';
import { API_SERVER, API } from '../../constants';
import CountUp from 'react-countup';

import AuthService from '../../utils/AuthService';



const socket = io(API_SERVER + 'db/');


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.AuthService = new AuthService();
        this.Token = this.AuthService.getToken();
        
    }

    state = {
        lastWeekRevenue: 0,
        thisWeekRevenue: 0,
        todayRevenue: 0,
        lastWeekTransaction: 0,
        thisWeekTransaction: 0,
        thisMonthRevenue: 0,
    }

    componentWillMount = () => {
        // get dashboard data

        const dbUrl = API.DASHBOARD + 'getData'

        fetch(dbUrl, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this.Token
                })
            })
            .then(results => { 
                return results.json();
            }).then(res => {

                this.setState({
                    thisWeekRevenue: res.thisWeekRevenue,
                    lastWeekRevenue: res.lastWeekRevenue,
                    thisWeekTransaction: res.thisWeekTransaction,
                    lastWeekTransaction: res.lastWeekTransaction,
                    todayRevenue: res.todayRevenue,
                    thisMonthRevenue: res.thisMonthRevenue,
                })

            })
        .catch(function(err){
            console.log(err);
        });

    }

    componentDidMount() {
        var addScript = document.createElement('script');

        addScript.setAttribute('src', 'assets/pages/dashboard.js');
        document.body.appendChild(addScript);

        var self = this;

        socket.on('connect', function(data) {
            socket.on('this_week_revenue',  data => self.setState({thisWeekRevenue: data}));
            socket.on('last_week_revenue', data => self.setState({lastWeekRevenue: data}));
            socket.on('today_revenue', data => self.setState({todayRevenue: data}));
            socket.on('this_week_transaction',  data => self.setState({thisWeekTransaction: data}));
            socket.on('last_week_transaction', data => self.setState({lastWeekTransaction: data}));
            socket.on('this_month_revenue', data => self.setState({thisMonthRevenue: data}));
        });

        
    }

    render() {

 
        

        // socket.emit('update_revenue', '5000000');

        const { lastWeekRevenue, thisWeekRevenue, todayRevenue, thisWeekTransaction, lastWeekTransaction, thisMonthRevenue } = this.state;
        return (

            <PageWrapper>

                <PageHeader title="Dashboard"/>
                
                <div className="row m-b-30 dashboard-header">
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="col-sm-12 card dashboard-product">
                            <span>Revenues</span>
                            <h2 className="dashboard-total-products">$<CountUp start={0} end={todayRevenue} separator=","/></h2>
                            <span className="label label-warning">Total</span>Today
                            <div className="side-box bg-warning">
                                <i className="icon-layers"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="col-sm-12 card dashboard-product">
                            <span>Revenues</span>
                            <h2 className="dashboard-total-products">$<CountUp start={0} end={thisWeekRevenue} separator=","/></h2>
                            <span className="label label-primary">Total</span>This Week
                            <div className="side-box bg-primary">
                                <i className="icon-layers"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="col-sm-12 card dashboard-product">
                            <span>Revenues</span>
                            <h2 className="dashboard-total-products">$<CountUp start={0} end={lastWeekRevenue} separator=","/></h2>
                            <span className="label label-success">Total</span>Last Week
                            <div className="side-box bg-success">
                                <i className="icon-layers"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="col-sm-12 card dashboard-product">
                            <span>Revenues</span>
                            <h2 className="dashboard-total-products">$<CountUp start={0} end={thisMonthRevenue} separator=","/></h2>
                            <span className="label label-danger">Total</span>This Month
                            <div className="side-box bg-danger">
                                <i className="icon-layers"></i>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-9 col-md-12">
                        <div className="card">
                            <div className="card-block">
                                <div className="row m-b-10 dashboard-total-income">
                                    <div className="col-sm-6 text-left">
                                        <div className="counter-txt">
                                            <h6>Total Revenue</h6>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <i className="icofont icofont-link-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="card-block row">
                                <div className="col-sm-12">
                                    <div id="areachart"></div>
                                </div>
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-xs-12 income-per-day">
                                        <p>Today</p>
                                        $
                                        <h6 className="counter">6734.00</h6>
                                    </div>
                                    <div className="col-sm-4 col-xs-12 income-per-day">
                                        <p>Last Week</p>
                                        $
                                        <h6 className="counter">58789.00</h6>
                                    </div>
                                    
                                    <div className="col-sm-4 col-xs-12 income-per-day">
                                        <p>Total Revenue</p>
                                        $
                                        <h6 className="counter">85749.00</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card">
                            <div className="bg-warning dashboard-resource m-t-5">
                                <div className="card-block">
                                    <h5 className="counter">300</h5>
                                    <h5 className="resource-used">Entries</h5>
                                </div>
                                <div className="card-block">
                                    <span className="resource-barchart"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card">
                            <div className="bg-danger dashboard-resource">
                                <div className="card-block">
                                    <h5 className="counter">222</h5>%
                                    <h5 className="resource-used">Exits</h5>
                                </div>
                                <div className="card-block">
                                    <span className="resource-barchart"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </PageWrapper>

        );
    }
}

export {Dashboard};