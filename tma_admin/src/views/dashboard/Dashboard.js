import React, { Component } from 'react';
import { Card, PageHeader, PageWrapper } from '../../components';


class Dashboard extends Component {
    render() {
        return (

            <PageWrapper>

                <PageHeader title="Dashboard"/>
                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Card otherClass="p-30">
                                <div className="media">
                                    <div className="media-left meida media-middle">
                                        <span><i className="fa fa-usd f-s-40 color-primary"></i></span>
                                    </div>
                                    <div className="media-body media-text-right">
                                        <h2>568120</h2>
                                        <p className="m-b-0">Total Revenue</p>
                                    </div>
                                </div>
                            </Card>
                            
                        </div>
                        <div className="col-md-3">
                            <Card otherClass="p-30">
                                <div className="media">
                                    <div className="media-left meida media-middle">
                                        <span><i className="fa fa-shopping-cart f-s-40 color-success"></i></span>
                                    </div>
                                    <div className="media-body media-text-right">
                                        <h2>1178</h2>
                                        <p className="m-b-0">Sales</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card otherClass="p-30">
                                <div className="media">
                                    <div className="media-left meida media-middle">
                                        <span><i className="fa fa-archive f-s-40 color-warning"></i></span>
                                    </div>
                                    <div className="media-body media-text-right">
                                        <h2>25</h2>
                                        <p className="m-b-0">Stores</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card otherClass="p-30">
                                <div className="media">
                                    <div className="media-left meida media-middle">
                                        <span><i className="fa fa-user f-s-40 color-danger"></i></span>
                                    </div>
                                    <div className="media-body media-text-right">
                                        <h2>847</h2>
                                        <p className="m-b-0">Customer</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div className="row bg-white m-l-0 m-r-0 box-shadow ">

                        <div className="col-lg-8">
                            <Card title="Extra Area Chart">
                                    <div id="extra-area-chart"></div>
                            </Card>
                        </div>
                        <div className="col-lg-4">
                            <Card>
                                <div className="card-body browser">
                                    <p className="f-w-600">iMacs <span className="pull-right">85%</span></p>
                                    <div className="progress ">
                                        <div role="progressbar" style={{width: "85%", height:"8px"}} className="progress-bar bg-danger wow animated progress-animated"> <span className="sr-only">60% Complete</span> </div>
                                    </div>

                                    <p className="m-t-30 f-w-600">iBooks<span className="pull-right">90%</span></p>
                                    <div className="progress">
                                        <div role="progressbar" style={{width: "90%", height:"8px"}} className="progress-bar bg-info wow animated progress-animated"> <span className="sr-only">60% Complete</span> </div>
                                    </div>

                                    <p className="m-t-30 f-w-600">iPhone<span className="pull-right">65%</span></p>
                                    <div className="progress">
                                        <div role="progressbar" style={{width: "65%", height:"8px"}} className="progress-bar bg-success wow animated progress-animated"> <span className="sr-only">60% Complete</span> </div>
                                    </div>

                                    <p className="m-t-30 f-w-600">Samsung<span className="pull-right">65%</span></p>
                                    <div className="progress">
                                        <div role="progressbar" style={{width: "65%", height:"8px"}} className="progress-bar bg-warning wow animated progress-animated"> <span className="sr-only">60% Complete</span> </div>
                                    </div>

                                    <p className="m-t-30 f-w-600">android<span className="pull-right">65%</span></p>
                                    <div className="progress m-b-30">
                                        <div role="progressbar" style={{width: "65%", height:"8px"}} className="progress-bar bg-success wow animated progress-animated"> <span className="sr-only">60% Complete</span> </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <Card otherClass="bg-dark">
                                <div className="testimonial-widget-one p-17">
                                    <div className="testimonial-widget-one owl-carousel owl-theme">
                                        <div className="item">
                                            <div className="testimonial-content">
                                                <img className="testimonial-author-img" src="images/avatar/2.jpg" alt="" />
                                                <div className="testimonial-author">John</div>
                                                <div className="testimonial-author-position">Founder-Ceo. Dell Corp</div>

                                                <div className="testimonial-text">
                                                    <i className="fa fa-quote-left"></i>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .
                                                    <i className="fa fa-quote-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="testimonial-content">
                                                <img className="testimonial-author-img" src="images/avatar/3.jpg" alt="" />
                                                <div className="testimonial-author">Abraham</div>
                                                <div className="testimonial-author-position">Founder-Ceo. Dell Corp</div>

                                                <div className="testimonial-text">
                                                    <i className="fa fa-quote-left"></i>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .
                                                    <i className="fa fa-quote-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="testimonial-content">
                                                <img className="testimonial-author-img" src="images/avatar/1.jpg" alt="" />
                                                <div className="testimonial-author">Lincoln</div>
                                                <div className="testimonial-author-position">Founder-Ceo. Dell Corp</div>

                                                <div className="testimonial-text">
                                                    <i className="fa fa-quote-left"></i>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .
                                                    <i className="fa fa-quote-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="testimonial-content">
                                                <img className="testimonial-author-img" src="images/avatar/4.jpg" alt="" />
                                                <div className="testimonial-author">TYRION LANNISTER</div>
                                                <div className="testimonial-author-position">Founder-Ceo. Dell Corp</div>

                                            <div className="testimonial-text">
                                                    <i className="fa fa-quote-left"></i>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .
                                                    <i className="fa fa-quote-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="testimonial-content">
                                                <img className="testimonial-author-img" src="images/avatar/5.jpg" alt="" />
                                                <div className="testimonial-author">TYRION LANNISTER</div>
                                                <div className="testimonial-author-position">Founder-Ceo. Dell Corp</div>

                                                <div className="testimonial-text">
                                                    <i className="fa fa-quote-left"></i>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .
                                                    <i className="fa fa-quote-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="testimonial-content">
                                                <img className="testimonial-author-img" src="images/avatar/6.jpg" alt="" />
                                                <div className="testimonial-author">TYRION LANNISTER</div>
                                                <div className="testimonial-author-position">Founder-Ceo. Dell Corp</div>

                                                <div className="testimonial-text">
                                                    <i className="fa fa-quote-left"></i>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .
                                                    <i className="fa fa-quote-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-lg-9">
                            <Card title="Recent Orders">
                                
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Product</th>
                                                <th>quantity</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td>
                                                    <div className="round-img">
                                                        <a href=""><img src="images/avatar/4.jpg" alt=""/></a>
                                                    </div>
                                                </td>
                                                <td>John Abraham</td>
                                                <td><span>iBook</span></td>
                                                <td><span>456 pcs</span></td>
                                                <td><span className="badge badge-success">Done</span></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="round-img">
                                                        <a href=""><img src="images/avatar/2.jpg" alt=""/></a>
                                                    </div>
                                                </td>
                                                <td>John Abraham</td>
                                                <td><span>iPhone</span></td>
                                                <td><span>456 pcs</span></td>
                                                <td><span className="badge badge-success">Done</span></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="round-img">
                                                        <a href=""><img src="images/avatar/3.jpg" alt=""/></a>
                                                    </div>
                                                </td>
                                                <td>John Abraham</td>
                                                <td><span>iMac</span></td>
                                                <td><span>456 pcs</span></td>
                                                <td><span className="badge badge-warning">Pending</span></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="round-img">
                                                        <a href=""><img src="images/avatar/4.jpg" alt=""/></a>
                                                    </div>
                                                </td>
                                                <td>John Abraham</td>
                                                <td><span>iBook</span></td>
                                                <td><span>456 pcs</span></td>
                                                <td><span className="badge badge-success">Done</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                            <div className="col-lg-6">
                                <Card title="Message">
                                    <div className="recent-comment">
                                        <div className="media">
                                            <div className="media-left">
                                                <a onClick={() => console.log('click') }><img alt="..." src="images/avatar/1.jpg" className="media-object"/></a>
                                            </div>
                                            <div className="media-body">
                                                <h4 className="media-heading">john doe</h4>
                                                <p>Cras sit amet nibh libero, in gravida nulla. </p>
                                                <p className="comment-date">October 21, 2018</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="media-left">
                                                <a onClick={() => console.log('click') }><img alt="..." src="images/avatar/1.jpg" className="media-object"/></a>
                                            </div>
                                            <div className="media-body">
                                                <h4 className="media-heading">john doe</h4>
                                                <p>Cras sit amet nibh libero, in gravida nulla. </p>
                                                <p className="comment-date">October 21, 2018</p>
                                            </div>
                                        </div>

                                        <div className="media">
                                            <div className="media-left">
                                                <a onClick={() => console.log('click') }><img alt="..." src="images/avatar/1.jpg" className="media-object"/></a>
                                            </div>
                                            <div className="media-body">
                                                <h4 className="media-heading">john doe</h4>
                                                <p>Cras sit amet nibh libero, in gravida nulla. </p>
                                                <p className="comment-date">October 21, 2018</p>
                                            </div>
                                        </div>

                                        <div className="media no-border">
                                            <div className="media-left">
                                                <a onClick={() => console.log('click') }><img alt="..." src="images/avatar/1.jpg" className="media-object" /></a>
                                            </div>
                                            <div className="media-body">
                                                <h4 className="media-heading">Mr. Michael</h4>
                                                <p>Cras sit amet nibh libero, in gravida nulla. </p>
                                                <div className="comment-date">October 21, 2018</div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-lg-6">
                                <Card>
                                    <div className="card-body">
                                        <div className="year-calendar"></div>
                                    </div>
                                </Card>
                            </div>


                            </div>
                        </div>

                        <div className="col-lg-4">
                            <Card title="Todo">
                                
                                <div className="card-content">
                                    <div className="todo-list">
                                        <div className="tdl-holder">
                                            <div className="tdl-content">
                                                <ul>
                                                    <li>
                                                        <label>
                                                            <input type="checkbox"/><i className="bg-primary"></i><span>Build an angular app</span>
                                                            <a href='#' className="ti-close"></a>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="checkbox" defaultChecked />
                                                            <i className="bg-success"></i><span>Creating component page</span>
                                                            <a href='#' className="ti-close"></a>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="checkbox" defaultChecked />
                                                            <i className="bg-warning"></i><span>Follow back those who follow you</span>
                                                            <a href='#' className="ti-close"></a>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="checkbox" defaultChecked /><i className="bg-danger"></i><span>Design One page theme</span>
                                                            <a href='#' className="ti-close"></a>
                                                        </label>
                                                    </li>

                                                    <li>
                                                        <label>
                                                            <input type="checkbox" defaultChecked/>
                                                            <i className="bg-success"></i>
                                                            <span>Creating component page</span>
                                                            <a href='#' className="ti-close"></a>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <input type="text" className="tdl-new form-control" placeholder="Type here" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>
            </PageWrapper>

        );
    }
}

export {Dashboard};