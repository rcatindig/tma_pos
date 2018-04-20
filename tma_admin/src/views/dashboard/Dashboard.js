import React, { Component } from 'react';
import {  PageHeader, PageWrapper } from '../../components';


class Dashboard extends Component {
    componentDidMount() {
        var addScript = document.createElement('script');

        addScript.setAttribute('src', 'assets/pages/dashboard.js');
        document.body.appendChild(addScript);

    }

    render() {
        return (

            <PageWrapper>

                <PageHeader title="Dashboard"/>
                
                <div className="row m-b-30 dashboard-header">
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="col-sm-12 card dashboard-product">
                            <span>Transactions</span>
                            <h2 className="dashboard-total-products">$<span className="counter">4,500</span></h2>
                            <span className="label label-warning">Revenue</span>This Week
                            <div className="side-box bg-warning">
                                <i className="icon-social-soundcloud"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="col-sm-12 card dashboard-product">
                            <span>Transactions</span>
                            <h2 className="dashboard-total-products">$<span className="counter">37,500</span></h2>
                            <span className="label label-primary">Revenue</span>Last Week
                            <div className="side-box bg-primary">
                                <i className="icon-social-soundcloud"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="col-sm-12 card dashboard-product">
                            <span>Transactions</span>
                            <h2 className="dashboard-total-products">$<span className="counter">30,780</span></h2>
                            <span className="label label-success">Sales</span>Total Sales
                            <div className="side-box bg-success">
                                <i className="icon-bubbles"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="col-sm-12 card dashboard-product">
                            <span>Transactions</span>
                            <h2 className="dashboard-total-products">$<span className="counter">30,780</span></h2>
                            <span className="label label-danger">Views</span>Views Today
                            <div className="side-box bg-danger">
                                <i className="icon-bubbles"></i>
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