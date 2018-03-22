import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Header, SideBar } from '../components'; 
import { Dashboard, Transactions } from '../views';

class Main extends Component {
    render () {
        return (
            <div id="main-wrapper">
                <Header />
                <SideBar />
                <Switch>
                    <Route path="/" exact={true} name="Dashboard" component={Dashboard}/>
                    <Route path="/transactions" name="Transactions" component={Transactions}/>
                </Switch>
            </div>
        );
            
    }
}

export default Main;