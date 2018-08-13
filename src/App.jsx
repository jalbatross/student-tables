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
        titles: [],
        loading: true
      };
  }

  componentDidMount() {
    //Get user board data from grade 2-> grade 5
    getUserBoardData(5).then(
      function(success) {
        alert(success.length);
        var titles = this.generateGradeTitles(success.data.length);
        this.setState({
          data: success,
          titles: titles,
          loading: false
        })
      }.bind(this),

      function(fail) {
        console.log('Error getting data from server: ', fail);
      }
    )
  }

  createGradeTables(){
    var tables= [];
    for (let i = 0; i < 4; i++) {
      tables.push(
        <td> 
          <StudentTable 
            data={this.state.loading ? [] : this.state.data.data[i]} 
            columns={this.state.loading ? [] : this.state.data.columns[i]} 
            title={this.state.loading ? [] : this.state.titles[i]}
          /> 
        </td>
      )
    }
    return tables;
  }

  generateGradeTitles(numGrades) {
    var titlesRet = [];
    var gradeNum = 2;
    var gradeTitle = "";
    for (let i = 0; i < numGrades; i++) {
      gradeNum = 2 + i; //Afficient Math starts at second grade

      switch (gradeNum) {
        case 2:
          gradeTitle = "Second Graders";
          break;
        case 3:
          gradeTitle = "Third Graders";
          break;
        case 4:
          gradeTitle = "Fourth Graders";
          break;
        case 5:
          gradeTitle = "Fifth Graders";
          break;
        case 6:
          gradeTitle = "Sixth Graders";
          break;
        case 7:
          gradeTitle = "Seventh Graders";
          break;
        case 8:
          gradeTitle = "Eighth Graders";
          break;
        case 9:
          gradeTitle = "Ninth Graders";
          break;
        case 10:
          gradeTitle = "Tenth Graders";
          break;
      }

      titlesRet.push(gradeTitle);
    }
    return titlesRet;
  }

  handleChange(e) {
  }

  render() {
    var tables = this.createGradeTables();
    return (
    <div>
      <table className="tables-container">
        <tbody>
      <tr>
        {tables}
      </tr>
      </tbody>
    </table>
    </div>


    );
  }
}

export default App;

