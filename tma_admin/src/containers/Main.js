import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { Header, SideBar, PageNotFound } from '../components'; 
import { Dashboard, Transactions, Clients, Users, BackendReport, Roles } from '../views';
import { GetPermission, CheckUserType } from '../helpers';
import { MODULE, ACCESS_TYPE, USER_TYPE } from '../constants';

import AuthService from '../utils/AuthService';
import withAuth from '../utils/withAuth';
const Auth = new AuthService();

class Main extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            brHide: false,
            dbHide: false,
            cltHide: false,
            rolHide: false,
            txnHide: false,
            usrHide: false
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
                
            if (cltAccess === ACCESS_TYPE.NOACCESS || cltAccess === ""  ) 
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
    
    
    render () {

        const {
                    brHide,
                    dbHide,
                    cltHide,
                    rolHide,
                    txnHide,
                    usrHide
                } = this.state;
        return (
            <HashRouter>
                
                <div id="main">           
                        <Header />
                        <SideBar />
                        
                        <Switch>
                            <Redirect from="/redirect/backendreport" to="/backendreport"/>
                            <Redirect from="/redirect/transactions" to="/transactions" />
                            <Redirect from="/redirect/clients" to="/clients" />
                            <Redirect from="/redirect/users" to="/users" />
                            <Redirect from="/redirect/roles" to="/roles" />
                            <Redirect from="/redirect" to="/" />
                        </Switch>
                       
                        <Route path="/" exact={true} name="Dashboard" component={dbHide ? PageNotFound : Dashboard}/>
                        <Route path="/transactions" name="Transactions" component={txnHide ? PageNotFound : Transactions}/>
                        <Route path="/clients" name="Clients" component={cltHide ? PageNotFound : Clients}/>
                        <Route path="/users" name="Users" component={usrHide ? PageNotFound : Users}/>
                        <Route path="/roles" name="Roles" component={rolHide ? PageNotFound : Roles} />
                        <Route path="/backendreport" name="BackendReport" component={brHide ? PageNotFound : BackendReport}/>
                        <Route path="*" component={PageNotFound} />
                </div>
            </HashRouter>
        );
            
    }
}

export default withAuth(Main);