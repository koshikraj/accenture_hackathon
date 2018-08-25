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

    componentCallback(repo_details=[]) {

        this.setState({page: 'page',
                       repo_details: repo_details})
    }

  render() {
    return (

        this.state.page === 'home' ? <Home page={this.componentCallback}/> : <Repo details={this.state.repo_details}/>


    );
  }
}

export default App;
