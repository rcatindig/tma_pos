import React, { Component } from 'react';
import {  PageHeader, PageWrapper } from '../../components';
import io from 'socket.io-client';
import { API_SERVER, API } from '../../constants';
import CountUp from 'react-countup';

import AuthService from '../../utils/AuthService';

import ReactHighCharts from 'react-highcharts';



const socket = io(API_SERVER + 'db/');

const config =  {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Total Revenues'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Revenue'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: '2016',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  
    }, {
      name: '2017',
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
  
    }, {
        name: '2018',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    
    }]
  }



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
                                    <ReactHighCharts config={config}/>
                                    {/* <div id="areachart"></div> */}
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