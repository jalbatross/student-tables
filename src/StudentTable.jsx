import React, { Component }  from "react";
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class StudentTable extends React.Component {
    constructor(props) {
        super(props);
    }

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

    render() {

        const columns = [{
            Header: 'Student Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'Grade 2',
            accessor: 'g2_score',
            Cell: props => < span className = 'score' > { props.value } < /span> // Custom cell components!
        }, {
            Header: 'Grade 3',
            accessor: 'g3_score',
            Cell: props => this.parseData(props.value)
        }]
        
        return(
            <ReactTable data={this.props.data} columns={columns}/> 
        )
    }


}

export default StudentTable;