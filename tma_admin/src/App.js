import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Header, SideBar, Content } from './components/';

class App extends Component {
  render() {
    return (
      <div id="main-wrapper">
        <Header />
        <SideBar />
        <Content />
      </div>
    );
  }
}

export default App;

