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

        const columns = [{
            Header: 'Student Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'Grade 2',
            accessor: 'g2_score',
            Cell: props => React.createElement(
                'span',
                { className: 'score' },
                ' ',
                props.value,
                ' '
            ) // Custom cell components!
        }, {
            Header: 'Grade 3',
            accessor: 'g3_score',
            Cell: props => this.parseData(props.value)
        }];

        return React.createElement(ReactTable, { data: this.props.data, columns: columns });
    }

}

export default StudentTable;

