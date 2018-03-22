import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Dashboard } from './views';

import Main from './containers/Main';

import routes from './routes';

import { Header, SideBar, Content } from './components/';

class App extends Component {

  
  render() {
    return (

		<HashRouter>
			<Switch>
			{/* <Route exact path="/" name="Login Page" component={Login}/>
			<Route exact path="/register" name="Register Page" component={Register}/>
			<Route exact path="/404" name="Page 404" component={Page404}/>
			<Route exact path="/500" name="Page 500" component={Page500}/> */}
			<Route path="/" name="Dashboard" component={Main}/>
			</Switch>
		</HashRouter>
      
        
      
    );
  }
}

export default App;

