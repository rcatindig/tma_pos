import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Swit } from 'react-router-dom';
import { Dashboard } from '../views';


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
                            <li> <a className="has-arrow  " onClick={() => console.log('collapse') } aria-expanded="false"><i className="fa fa-wpforms"></i><span className="hide-menu">Reports</span></a>
                                <ul aria-expanded="false" className="collapse">
                                    <li><a href="uc-calender.html">Weekly Report</a></li>
                                    <li><a href="uc-datamap.html">Monthly Report</a></li>
                                    <li><a href="uc-nestedable.html">Yearly Report</a></li>
                                </ul>
                            </li>
                            <li className="nav-label">Setup</li>
                            <li><Link to="/"><i className="fa fa-user-circle"></i>Users</Link></li>
                            
                        </ul>
                    </nav>
                </div>
            </div>
            
        );
    }
}

export {SideBar};