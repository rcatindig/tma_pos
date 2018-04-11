import React, {Component} from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';


class SideBar extends Component {
    render() {
        return (
            <div className="left-sidebar">
                <div className="scroll-sidebar">
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            <li className="nav-devider"></li>
                            <li className="nav-label">Home</li>
                            <li><Link to="/redirect"><i className="fa fa-tachometer"></i>Dashboard</Link></li>
                            <li className="nav-label">Main</li>
                            <li><Link to="/redirect/transactions"><i className="fa fa-car"></i>Transactions</Link></li>
                            {/* <li><Link to="/redirect/machines"><i className="fa fa-server"></i>Machines</Link></li> */}
                            <li><a className="has-arrow  " onClick={() => console.log('collapse') } aria-expanded="false"><i className="fa fa-wpforms"></i><span className="hide-menu">Reports</span></a>
                                <ul aria-expanded="false" className="collapse">
                                    <li><Link to="/redirect/backendreport">Backend Report</Link></li>
                                    <li><a href="uc-calender.html">Transaction Report</a></li>
                                    <li><a href="uc-datamap.html">Entry Report</a></li>
                                    <li><a href="uc-nestedable.html">Exit Report</a></li>
                                </ul>
                            </li>
                            <li className="nav-label">Setup</li>
                            <li><Link to="/redirect/clients"><i className="fa fa-industry"></i>Clients</Link></li>
                            <li><Link to="/redirect/users"><i className="fa fa-user-circle"></i>Users</Link></li>
                            <li><Link to="/redirect/roles"><i className="fa fa-user-secret"></i>Roles</Link></li>
                            
                        </ul>
                    </nav>
                </div>
            </div>
            
        );
    }
}

export {SideBar};