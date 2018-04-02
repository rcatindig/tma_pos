import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { Header, SideBar } from '../components'; 
import { Dashboard, Transactions, Clients, Users } from '../views';

import AuthService from '../utils/AuthService';
import withAuth from '../utils/withAuth';
const Auth = new AuthService();

class Main extends Component {
    
    render () {
        return (
            <HashRouter>
                <div id="main-wrapper">           
                        <Header />
                        <SideBar />
                        
                            <Switch>
                                <Redirect from="/redirect/transactions" to="/transactions" />
                                <Redirect from="/redirect/clients" to="/clients" />
                                <Redirect from="/redirect/users" to="/users" />
                                <Redirect from="/redirect" to="/" />
                            </Switch>
                       
                        <Route path="/" exact={true} name="Dashboard" component={Dashboard}/>
                        <Route path="/transactions" name="Transactions" component={Transactions}/>
                        <Route path="/clients" name="Clients" component={Clients}/>
                        <Route path="/users" name="Users" component={Users}/>
                        
                </div>
            </HashRouter>
        );
            
    }
}

export default withAuth(Main);