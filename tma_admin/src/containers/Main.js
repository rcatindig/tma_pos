import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Header, SideBar } from '../components'; 
import { Dashboard } from '../views';

class Main extends Component {
    render () {
        return (
            <div id="main-wrapper">
                <Header />
                <SideBar />
                <Switch>
                    <Route path="/" exact={true} name="Dashboard" component={Dashboard}/>
                </Switch>
            </div>
        );
            
    }
}

export default Main;