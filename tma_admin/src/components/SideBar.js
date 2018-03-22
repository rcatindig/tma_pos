import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Dashboard } from '../views';


class SideBar extends Component {
    render() {
        return (
            <Router>
                <div class="left-sidebar">
                    <div class="scroll-sidebar">
                        <nav class="sidebar-nav">
                            <ul id="sidebarnav">
                                <li class="nav-devider"></li>
                                <li class="nav-label">Home</li>
                                <li><Link to="/"><i class="fa fa-home"></i>Dashboard</Link></li>
                                <li class="nav-label">Main</li>
                                <li><Link to="/"><i class="fa fa-car"></i>Transactions</Link></li>
                                <li> <a class="has-arrow  " onClick={() => console.log('click') } aria-expanded="false"><i class="fa fa-wpforms"></i><span class="hide-menu">Reports</span></a>
                                    <ul aria-expanded="false" class="collapse">
                                        <li><a href="uc-calender.html">Weekly Report</a></li>
                                        <li><a href="uc-datamap.html">Monthly Report</a></li>
                                        <li><a href="uc-nestedable.html">Yearly Report</a></li>
                                    </ul>
                                </li>
                                <li class="nav-label">Setup</li>
                                <li><Link to="/"><i class="fa fa-user-circle"></i>Users</Link></li>
                                
                            </ul>
                        </nav>
                    </div>
                </div>
            </Router>
            
        );
    }
}

export {SideBar};