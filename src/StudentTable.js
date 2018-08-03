import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './StudentTable.css';

class StudentTable extends React.Component {
    constructor(props) {
        super(props);
    }

    /*
    parseData(data) {
        console.log(data)
        if (data.toString().indexOf('/') !== -1) {
            var dateFormat = require('dateformat');
            var date = new Date(data);
            return <span className='date'>{dateFormat(date, "shortDate").toString()}</span>;
        }
        else {
            return <span className='score'>{data.toString()}</span>;
            
        }
    }
    */

    render() {

        return React.createElement(
            'div',
            null,
            React.createElement(
                'span',
                { className: 'table-title ReactTable' },
                this.props.title
            ),
            React.createElement(ReactTable, { data: this.props.data, columns: this.props.columns })
        );
    }

}

export default StudentTable;

