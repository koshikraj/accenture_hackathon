import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';

class Home extends Component {

  selectRepo () {
      this.props.page();
  }
  render() {
    return (
        <div>
            <div> Repo 1</div>
            <div> Repo 2</div>
            <div onClick={() => {this.selectRepo();}}> aad</div>

        </div>
    );
  }
}

export default Home;
