import $ from "jquery";

export async function getUserBoardData(maxGrade) {
    const lastGrade = maxGrade;
    var gradeData = [];
    var columns = [];

    var boardParams = {
        learning_center_id: "All",
        grade: "2"
    }

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
                        console.log('board data is: ', response);
                    }
                })
            ).done(function(response1) {
                console.log('Got response for grade: ', i);
                gradeData.push(response1);

            })
            .fail(function(err) {
                console.log(err);
            })
    }

    //Fixing data for table
    var maxGrade = 0;
    var minGrade = 0;
    var query = "grade_";
    var currentGrade = 0;
    var currentStudent = "";
    //Get column data
    //
    //Iterate through each grade
    for (let i = 0; i < gradeData.length; i++) {
        currentGrade = gradeData[i];
        maxGrade = currentGrade[0].current_grade;
        minGrade = maxGrade;
        
        //Find min by iterating through all students
        for (let j = 0; j < currentGrade.length; j++) {
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

        //add to columns
        var columnObj = 
        [
            {
                Header: 'Name',
                accessor: 'user_name'
            }
        ]
        for (let m = minGrade; m <= maxGrade; m++) {
            columnObj.push( {
                Header: 'Grade ' + m,
                accessor: 'grade_'+m
            })
        }
        columns.push(columnObj);
    }

    console.log(columns);
    return {
        data: gradeData,
        columns: columns
    };
}
