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
            <div className="left-sidebar">
                <div className="scroll-sidebar">
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            <li className="nav-devider"></li>
                            <li className="nav-label">Home</li>
                            <li hidden={dbHide}><Link to="/redirect"><i className="fa fa-tachometer"></i><span className="hide-menu">Dashboard</span></Link></li>
                            <li className="nav-label">Main</li>
                            <li hidden={txnHide}><Link to="/redirect/transactions"><i className="fa fa-car"></i><span className="hide-menu">Transactions</span></Link></li>
                            {/* <li><Link to="/redirect/machines"><i className="fa fa-server"></i>Machines</Link></li> */}
                            <li><a className="has-arrow  " onClick={() => console.log('collapse') } aria-expanded="false"><i className="fa fa-wpforms"></i><span className="hide-menu">Reports</span></a>
                                <ul aria-expanded="false" className="collapse">
                                    <li hidden={brHide}><Link to="/redirect/backendreport">Backend Report</Link></li>
                                    <li><a href="uc-calender.html">Transaction Report</a></li>
                                    <li><a href="uc-datamap.html">Entry Report</a></li>
                                    <li><a href="uc-nestedable.html">Exit Report</a></li>
                                </ul>
                            </li>
                            <li className="nav-label">Setup</li>
                            <li hidden={cltHide}><Link to="/redirect/clients"><i className="fa fa-industry"></i><span className="hide-menu">Clients</span></Link></li>
                            <li hidden={usrHide}><Link to="/redirect/users"><i className="fa fa-user-circle"></i><span className="hide-menu">Users</span></Link></li>
                            <li hidden={rolHide}><Link to="/redirect/roles"><i className="fa fa-user-secret"></i><span className="hide-menu">Roles</span></Link></li>
                            
                        </ul>
                    </nav>
                </div>
            </div>
            
        );
    }
}

export {SideBar};