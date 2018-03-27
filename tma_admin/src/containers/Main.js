import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect, HashRouter } from 'react-router-dom';
import { Header, SideBar } from '../components'; 
import { Dashboard, Transactions, Clients } from '../views';

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
                                <Redirect from="/redirect" to="/" />
                            </Switch>
                       
                        <Route path="/" exact={true} name="Dashboard" component={Dashboard}/>
                        <Route path="/transactions" name="Transactions" component={Transactions}/>
                        <Route path="/clients" name="Clients" component={Clients}/>
                        
                </div>
            </HashRouter>
        );
            
    }
}

export default Main;