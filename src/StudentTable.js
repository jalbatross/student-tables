import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class StudentTable extends React.Component {
    constructor(props) {
        super(props);
    }

    parseData(data) {
        console.log(data);
        if (data.toString().indexOf('/') !== -1) {
            var dateFormat = require('dateformat');
            var date = new Date(data);
            return React.createElement(
                'span',
                { className: 'date' },
                dateFormat(date, "shortDate").toString()
            );
        } else {
            return React.createElement(
                'span',
                { className: 'score' },
                data.toString()
            );
        }
    }

    render() {

        return React.createElement(ReactTable, { data: this.props.data, columns: this.props.columns });
    }

}

export default StudentTable;

