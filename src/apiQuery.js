import $ from "jquery";

export async function getUserBoardData(maxGrade) {
    const lastGrade = maxGrade;
    var gradeData = [];

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

    return gradeData;
}