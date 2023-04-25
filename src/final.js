// deprecated

// var colleges = [
//     { name: "Branford", score: 0 },
//     { name: "Berkeley", score: 0 },
//     { name: "Davenport", score: 0 },
//     { name: "Franklin", score: 0 },
//     { name: "Grace Hopper", score: 0 },
//     { name: "Jonathan Edwards", score: 0 },
//     { name: "Morse", score: 0 },
//     { name: "Pauli Murray", score: 0 },
//     { name: "Pierson", score: 0 },
//     { name: "Saybrook", score: 0 },
//     { name: "Silliman", score: 0 },
//     { name: "Ezra Stiles", score: 0 },
//     { name: "Timothy Dwight", score: 0 },
//     { name: "Trumbull", score: 0 },
//     ];

    //console.log(colleges);

function parseLeaderboard() {
    // show the top 3 colleges in the leaderboard
    var leaderboard = [];
    // var first = obj[0].name;
    // var second = obj[1].name;
    // var third = obj[2].name;
    // for(var i = 0; i < obj.length; i++) {
    //     console.log(obj[i].name + " " + obj[i].score);
        
    // }    
    colleges.sort(function(a, b) {
        return b.score - a.score;
    });
    for(var i = 0; i < colleges.length; i++) {
        //obj[i].name + " " + obj[i].score
        leaderboard.push({name: colleges[i].name, score: colleges[i].score});
    }
    console.log(leaderboard);
    return leaderboard;
}

// function topThree(leaderboard) {
//     for(var i = 0; i < 3; i++) {
//         //obj[i].name + " " + obj[i].score
//         leaderboard.push({name: colleges[i].name, score: colleges[i].score});
//     }
// }    

// Function to add a score to a college's total score
function addToLeaderboard(score, college) {
    // Find the college in the array
    var index = colleges.findIndex(function (p) {
        return p.name === college;
        });
    if (index !== -1) {
    // Add the score to the college's total score
    colleges[index].score += score;

    // Update the leaderboard in the database
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Display the updated leaderboard
            displayLeaderboard();
        }
    };
    // Note: this is not functional yet, to be implemented
    xhr.open(
        "GET",
        "updateLeaderboard.php?college=" + college + "&score=" + score,
        true
    );
    xhr.send();
    }
}

// Function to display the top 3 colleges in the leaderboard
    /* function displayLeaderboard() {
    // Sort the colleges by score
    colleges.sort(function (a, b) {
      return b.score - a.score;
    })};*/
    //var html
function displayLeaderboard()
{
    const request = window.indexedDB.open("leaderboard", 1);
    request.onupgradeneeded = function(event) {
        var db = event.target.result;
           
        db.onerror = function(event) {
            note.innerHTML += '<li>Error loading database.</li>';
        };
          
        // // Create an objectStore for this database   
        // var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });
          
        // // define what data items the objectStore will contain
              
        // objectStore.createIndex("hours", "hours", { unique: false });
        // objectStore.createIndex("minutes", "minutes", { unique: false });
        // objectStore.createIndex("day", "day", { unique: false });
        // objectStore.createIndex("month", "month", { unique: false });
        // objectStore.createIndex("year", "year", { unique: false });
        // objectStore.createIndex("notified", "notified", { unique: false });
        };

    request.onerror = function() {
        console.error("Error", request.error);
    }

    request.onsuccess = function() {
        let db = request.result;
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM players ORDER BY TotalScore DESC LIMIT 3', [], function(tx, results) {
                // // clear the leaderboard table
                // $('#leaderboard').empty();
                  
                // should display????? the top 3 players in the leaderboard table
                for (var i = 0; i < results.rows.length; i++) {
                    var player = results.rows.item(i);
                    $('#leaderboard').append('<tr><td>' + player.name + '</td><td>' + player.TotalScore + '</td></tr>');
                }
            });
        })
    }
}

parseLeaderboard();