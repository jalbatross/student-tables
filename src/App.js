//Run on open
'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { getUserBoardData } from "./apiQuery";
import StudentTable from './StudentTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    getUserBoardData(3).then(function (success) {
      this.setState({
        data: JSON.stringify(success)
      });
    }.bind(this), function (fail) {
      console.log('Error getting data from server: ', fail);
    });
  }

  handleChange(e) {}

  render() {
    return React.createElement(
      'div',
      null,
      this.state.data
    );
  }
}

export default App;

const div = document.querySelector('div');
ReactDOM.render(React.createElement(App, null), div);

