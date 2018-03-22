import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <nav className="navbar top-navbar navbar-expand-md navbar-light">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="index.html">
                            <b><img src="images/tmalogo-small.png" alt="homepage" className="dark-logo" /></b>
                        </a>
                    </div>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto mt-md-0">
                            <li className="nav-item"> <a className="nav-link nav-toggler hidden-md-up text-muted  " href="javascript:void(0)"><i className="mdi mdi-menu"></i></a> </li>
                            <li className="nav-item m-l-10"> <a className="nav-link sidebartoggler hidden-sm-down text-muted  " href="javascript:void(0)"><i className="ti-menu"></i></a> </li>
                            
                            <li className="nav-item dropdown mega-dropdown"> <a className="nav-link dropdown-toggle text-muted  " onClick={() => console.log('click') } data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-th-large"></i></a>
                                <div className="dropdown-menu animated zoomIn">
                                    <ul className="mega-dropdown-menu row">


                                        <li className="col-lg-3  m-b-30">
                                            <h4 className="m-b-20">CONTACT US</h4>
                                            <form>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="exampleInputname1" placeholder="Enter Name" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" className="form-control" placeholder="Enter email" /> 
                                                </div>
                                                <div className="form-group">
                                                    <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Message"></textarea>
                                                </div>
                                                <button type="submit" className="btn btn-info">Submit</button>
                                            </form>
                                        </li>
                                        <li className="col-lg-3 col-xlg-3 m-b-30">
                                            <h4 className="m-b-20">List style</h4>
                                            <ul className="list-style-none">
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                            </ul>
                                        </li>
                                        <li className="col-lg-3 col-xlg-3 m-b-30">
                                            <h4 className="m-b-20">List style</h4>
                                            <ul className="list-style-none">
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                            </ul>
                                        </li>
                                        <li className="col-lg-3 col-xlg-3 m-b-30">
                                            <h4 className="m-b-20">List style</h4>
                                            <ul className="list-style-none">
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                                <li><a href="javascript:void(0)"><i className="fa fa-check text-success"></i> This Is Another Link</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav my-lg-0">

                            <li className="nav-item hidden-sm-down search-box"> <a className="nav-link hidden-sm-down text-muted  " href="javascript:void(0)"><i className="ti-search"></i></a>
                                <form className="app-search">
                                    <input type="text" className="form-control" placeholder="Search here" /> <a className="srh-btn"><i className="ti-close"></i></a>
                                </form>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-muted text-muted  " onClick={() => console.log('click') } data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-bell"></i>
                                    <div className="notify"> <span className="heartbit"></span> <span className="point"></span> </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right mailbox animated zoomIn">
                                    <ul>
                                        <li>
                                            <div className="drop-title">Notifications</div>
                                        </li>
                                        <li>
                                            <div className="message-center">
                                            
                                                <a onClick={() => console.log('click') }>
                                                    <div className="btn btn-danger btn-circle m-r-10"><i className="fa fa-link"></i></div>
                                                    <div className="mail-contnet">
                                                        <h5>This is title</h5> <span className="mail-desc">Just see the my new admin!</span> <span className="time">9:30 AM</span>
                                                    </div>
                                                </a>
                                                <a onClick={() => console.log('click') }>
                                                    <div className="btn btn-success btn-circle m-r-10"><i className="ti-calendar"></i></div>
                                                    <div className="mail-contnet">
                                                        <h5>This is another title</h5> <span className="mail-desc">Just a reminder that you have event</span> <span className="time">9:10 AM</span>
                                                    </div>
                                                </a>
                                                <a onClick={() => console.log('click') }>
                                                    <div className="btn btn-info btn-circle m-r-10"><i className="ti-settings"></i></div>
                                                    <div className="mail-contnet">
                                                        <h5>This is title</h5> <span className="mail-desc">You can customize this template as you want</span> <span className="time">9:08 AM</span>
                                                    </div>
                                                </a>
                                                <a onClick={() => console.log('click') }>
                                                    <div className="btn btn-primary btn-circle m-r-10"><i className="ti-user"></i></div>
                                                    <div className="mail-contnet">
                                                        <h5>This is another title</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:02 AM</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="nav-link text-center" href="javascript:void(0);"> <strong>Check all notifications</strong> <i className="fa fa-angle-right"></i> </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-muted  " onClick={() => console.log('click') } id="2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-envelope"></i>
                                    <div className="notify"> <span className="heartbit"></span> <span className="point"></span> </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right mailbox animated zoomIn" aria-labelledby="2">
                                    <ul>
                                        <li>
                                            <div className="drop-title">You have 4 new messages</div>
                                        </li>
                                        <li>
                                            <div className="message-center">
                                                <a onClick={() => console.log('click') }>
                                                    <div className="user-img"> <img src="images/users/5.jpg" alt="user" className="img-circle" />
                                                    <span className="profile-status online pull-right"></span> </div>
                                                    <div className="mail-contnet">
                                                        <h5>Michael Qin</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:30 AM</span>
                                                    </div>
                                                </a>
                                                <a onClick={() => console.log('click') }>
                                                    <div className="user-img"> <img src="images/users/2.jpg" alt="user" className="img-circle" />
                                                    <span className="profile-status busy pull-right"></span> </div>
                                                    <div className="mail-contnet">
                                                        <h5>John Doe</h5> <span className="mail-desc">I've sung a song! See you at</span> <span className="time">9:10 AM</span>
                                                    </div>
                                                </a>
                                                <a onClick={() => console.log('click') }>
                                                    <div className="user-img"> <img src="images/users/3.jpg" alt="user" className="img-circle" />
                                                    <span className="profile-status away pull-right"></span> </div>
                                                    <div className="mail-contnet">
                                                        <h5>Mr. John</h5> <span className="mail-desc">I am a singer!</span> <span className="time">9:08 AM</span>
                                                    </div>
                                                </a>
                                                <a onClick={() => console.log('click') }>
                                                    <div className="user-img"> <img src="images/users/4.jpg" alt="user" className="img-circle" />
                                                    <span className="profile-status offline pull-right"></span> </div>
                                                    <div className="mail-contnet">
                                                        <h5>Michael Qin</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:02 AM</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="nav-link text-center" href="javascript:void(0);"> <strong>See all e-Mails</strong> <i className="fa fa-angle-right"></i> </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-muted  " onClick={() => console.log('click') } data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="images/users/5.jpg" alt="user" className="profile-pic" /></a>
                                <div className="dropdown-menu dropdown-menu-right animated zoomIn">
                                    <ul className="dropdown-user">
                                        <li><a onClick={() => console.log('click') }><i className="ti-user"></i> Profile</a></li>
                                        <li><a onClick={() => console.log('click') }><i className="ti-wallet"></i> Balance</a></li>
                                        <li><a onClick={() => console.log('click') }><i className="ti-email"></i> Inbox</a></li>
                                        <li><a onClick={() => console.log('click') }><i className="ti-settings"></i> Setting</a></li>
                                        <li><a onClick={() => console.log('click') }><i className="fa fa-power-off"></i> Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export {Header};