import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import Home from './Home';
import Repo from './Repo';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {page: 'home'};
        this.componentCallback = this.componentCallback.bind(this)
    }

    componentCallback(e) {
        this.setState({page: 'page'})
    }

  render() {
    return (
        <div>
        {this.state.page === 'home' ? <Home page={this.componentCallback}/> : <Repo/>}
        </div>

    );
  }
}

export default App;
