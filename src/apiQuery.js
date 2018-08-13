import $ from "jquery";
import React from 'react';

export async function getUserBoardData(maxGrade) {
    const lastGrade = maxGrade;
    var gradeData = [];
    var columns = [];

    var boardParams = {
        learning_center_id: "All",
        grade: "2"
    }

    //Receive data from API
    for (let i = 2; i <= lastGrade; i++) {
        boardParams.grade = i.toString();
        // wait for the promise to resolve before advancing the for loop
        await $.when(
                //query the API to get list of all users
                $.ajax({
                    url: "https://joeyalbano.com:8080/https://math.afficienta.com/mathjoy/api/v1.0/userCompletionReport5",
                    type: "POST",
                    data: JSON.stringify(boardParams),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(response) {
                        console.log('Successfully received grade ', i, ' data : ', response);
                    }
                })
            ).done(function(response1) {
                //Apply fixing for grade
                response1.forEach(function(student) {
                    var maxGrade = student.current_grade;
                    var query = "";
                    for (let i = 2; i < maxGrade; i++) {
                        query="grade_" + i;
                        if(student[query].length === 0 || student[query] === 0) {
                            student[query] = "colorFill";
                        }
                    }
                })
                gradeData.push(response1);

            })
            .fail(function(err) {
                console.log(err);
            })
    }

    //Fixing data for table
    columns = generateColumns(gradeData);
    
    console.log(columns);
    return {
        data: gradeData,
        columns: columns
    };
}

/**
 * Generates columns for a react-table.

 * @param  Array[Object] gradeData  Array of objects containing grade data
 * @return Array[Object]            Array of column data
 *
 * Joey Albano Aug 12 2018
 */
function generateColumns(gradeData) {
    var columnsArr = [];
    var minGrade = 2;
    var maxGrade = 0;

    var query = "grade_";
    var currentGrade = 0;
    var currentStudent = "";

    //Iterate through each grade
    for (let i = 0; i < gradeData.length; i++) {
        currentGrade = gradeData[i];
        maxGrade = currentGrade[0].current_grade;
        minGrade = maxGrade;
        
        //Find min grade of table by iterating through all students for the current grade
        //The lowest grade found is the minimum grade
        for (let j = 0; j < currentGrade.length; j++) {
            //2 is the lowest grade offered
            if (minGrade === 2) {
                break;
            }
            currentStudent = currentGrade[j];
            //Iterate through scores of current student
            for (let k = minGrade; k >=2; k--) {
                query = "grade_"+k;
                if(currentStudent[query].length === 0) {
                    break;
                }
                if (k <= minGrade) {
                    minGrade = k;
                }
            }
        }

        var gradeName = "";
        
        //Generate column object
        var columnObj = 
        [
            {
                Header: 'Name',
                accessor: 'user_name'
            }
        ]

        for (let m = minGrade; m <= maxGrade; m++) {

            if (m <= 8) {
                gradeName = 'Grade ' + m;
            }
            else if (m === 9) {
                gradeName = 'Algebra 1';
            }
            else if (m === 10) {
                gradeName = 'Geometry';
            }
            else if (m === 11) {
                gradeName = 'Algebra 2';
            }

            columnObj.push( {
                Header: gradeName,
                accessor: 'grade_'+m,
                Cell: (row) => {
                    
                    if (row.value.length === 0) {
                        return;
                    }

                    if (row.value === "colorFill") {
                        return <div className='finished-grade'></div>
                    }
                    
                    if(row.value.toString().indexOf('/') > -1 ) {
                        return <div className='finished-grade'>{row.value}</div>
                    }
                    else {
                        return <div className='current-grade'>{row.value}</div>
                    }

                },
                className: "cell-styling"
            })
        }

        columnsArr.push(columnObj);
    }

    return columnsArr;
}