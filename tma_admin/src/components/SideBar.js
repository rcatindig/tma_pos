import React, {Component} from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';

import { GetPermission, CheckUserType } from '../helpers';
import { MODULE, ACCESS_TYPE, USER_TYPE } from '../constants';


class SideBar extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            brHide: false,
            dbHide: false,
            cltHide: false,
            rolHide: false,
            txnHide: false,
            usrHide: false,
        }
    }

    componentDidMount = async () => {
        var brHide = false,
            dbHide = false,
            cltHide = false,
            rolHide = false,
            txnHide = false,
            usrHide = false;

        
        const userType = await CheckUserType();

        if(userType === USER_TYPE.CLIENT)
        {
            // GET ROLE PERMISSION OF THE USER
            var brAccess = await GetPermission(MODULE.BACKEND_REPORT);
            var dbAccess = await GetPermission(MODULE.DASHBOARD);
            var cltAccess = await GetPermission(MODULE.CLIENTS);
            var rolAccess = await GetPermission(MODULE.ROLES);
            var txnAccess = await GetPermission(MODULE.TRANSACTIONS);
            var usrAccess = await GetPermission(MODULE.USERS);

            if (brAccess === ACCESS_TYPE.NOACCESS || brAccess === ""  ) 
                brHide = true;

            if (dbAccess === ACCESS_TYPE.NOACCESS || dbAccess === ""  ) 
                dbHide = true;
                
            // if (cltAccess === ACCESS_TYPE.NOACCESS || cltAccess === ""  ) 
            //     cltHide = true;

            // CLIENTS is already hide if the user type is CLIENT
            cltHide = true;

            if (rolAccess === ACCESS_TYPE.NOACCESS || rolAccess === ""  ) 
                rolHide = true;

            if (txnAccess === ACCESS_TYPE.NOACCESS || txnAccess === ""  ) 
                txnHide = true;
                
            if (usrAccess === ACCESS_TYPE.NOACCESS || usrAccess === ""  ) 
                usrHide = true;
                

            this.setState({
                brHide,
                dbHide,
                cltHide,
                rolHide,
                txnHide,
                usrHide
            });
        }

        

    }

    render() {

        const { brHide,
            dbHide,
            cltHide,
            rolHide,
            txnHide,
            usrHide } = this.state;
        return (
            <aside className="main-sidebar hidden-print ">
                <section className="sidebar" id="sidebar-scroll">

                    <div className="user-panel">
                        <div className="f-left image">
                            <img src="assets/images/avatar-1.png" alt="User Image" className="img-circle" />
                        </div>
                        <div className="f-left info">
                            <p>John Doe</p>
                            <p className="designation">UX Designer
                                <i className="icofont icofont-caret-down m-l-5"></i>
                            </p>
                        </div>
                    </div>
                    <ul className="nav sidebar-menu extra-profile-list">
                        <li>
                            <a className="waves-effect waves-dark" href="profile.html">
                                <i className="icon-user"></i>
                                <span className="menu-text">View Profile</span>
                                <span className="selected"></span>
                            </a>
                        </li>
                        <li>
                            <a className="waves-effect waves-dark" href="javascript:void(0)">
                                <i className="icon-settings"></i>
                                <span className="menu-text">Settings</span>
                                <span className="selected"></span>
                            </a>
                        </li>
                        <li>
                            <a className="waves-effect waves-dark" href="javascript:void(0)">
                                <i className="icon-logout"></i>
                                <span className="menu-text">Logout</span>
                                <span className="selected"></span>
                            </a>
                        </li>
                    </ul>
                    <ul className="sidebar-menu">
                        <li className="nav-level">Home</li>
                        <li className="active treeview">
                            <Link to="/redirect" className="waves-effect waves-dark">
                                <i className="icon-speedometer"></i>
                                <span> Dashboard</span>
                            </Link>
                        </li>
                        
                        <li className="nav-level">Main</li>
                        <li className="treeview">
                            <Link to="/redirect/transactions" className="waves-effect waves-dark">
                                <i className="icon-briefcase"></i>
                                <span> Transactions</span>
                            </Link>
                        </li>
                        <li className="treeview">
                            
                            <a className="waves-effect waves-dark">
                                <i className="icon-briefcase"></i>
                                <span> Reports</span>
                                <i className="icon-arrow-down"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <Link to="/redirect/backendreport" className="waves-effect waves-dark">
                                        <i className="icon-arrow-right"></i> Backend Report
                                    </Link>
                                </li>
                                <li>
                                    <a className="waves-effect waves-dark" href="button.html">
                                        <i className="icon-arrow-right"></i> Transaction Report</a>
                                </li>
                                <li>
                                    <a className="waves-effect waves-dark" href="label-badge.html">
                                        <i className="icon-arrow-right"></i> Entry Report</a>
                                </li>
                                <li>
                                    <a className="waves-effect waves-dark" href="bootstrap-ui.html">
                                        <i className="icon-arrow-right"></i> Exit Report</a>
                                </li>
                                <li>
                                    <a className="waves-effect waves-dark" href="box-shadow.html">
                                        <i className="icon-arrow-right"></i> Box Shadow</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-level">Setup</li>
                        <li className="treeview">
                            <Link to="/redirect/clients" className="waves-effect waves-dark">
                                <i className="icon-briefcase"></i>
                                <span> Clients</span>
                            </Link>
                            <Link to="/redirect/users" className="waves-effect waves-dark">
                                <i className="icon-people"></i>
                                <span> Users</span>
                            </Link>
                            <Link to="/redirect/roles" className="waves-effect waves-dark">
                                <i className="icon-briefcase"></i>
                                <span> Roles</span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </aside>
            
        );
    }
}

export {SideBar};