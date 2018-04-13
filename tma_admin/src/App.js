import React, { Component } from 'react';

import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Main from './containers/Main';
import { Login }  from './views';

class App extends Component {

  render() {
    return (

		<HashRouter>
			<Switch>
				{/* <Route exact path="/" name="Login Page" component={Login}/>
				<Route exact path="/register" name="Register Page" component={Register}/>
				<Route exact path="/404" name="Page 404" component={Page404}/>
				<Route exact path="/500" name="Page 500" component={Page500}/> */}
				
				<Route exact path="/login" name="Login" component={Login} />
				<Route path="/" name="Dashboard" component={Main}/>
			</Switch>
		</HashRouter>
       
    );
  }
}

export default App;

