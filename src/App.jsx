//Run on open
'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import {getUserBoardData} from "./apiQuery";
import StudentTable from './StudentTable';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: [],
        loading: true
      };
  }

  componentDidMount() {
    getUserBoardData(4).then(
      function(success) {
        this.setState({
          data: success,
          loading: false
        })
      }.bind(this),

      function(fail) {
        console.log('Error getting data from server: ', fail);
      }
    )
  }

  handleChange(e) {
  }

  render() {
    return (
    <div>
    <table>
    <tbody>
    <tr>
    <td> <StudentTable data={this.state.loading ? [] : this.state.data.data[0]} columns={this.state.loading ? [] : this.state.data.columns[0]} /></td>
    <td> <StudentTable data={this.state.loading ? [] : this.state.data.data[1]} columns={this.state.loading ? [] : this.state.data.columns[1]} /></td>
    <td> <StudentTable data={this.state.loading ? [] : this.state.data.data[2]} columns={this.state.loading ? [] : this.state.data.columns[2]} /></td>
    </tr>
    </tbody>
    </table>
    </div>


    );
  }
}

export default App;

