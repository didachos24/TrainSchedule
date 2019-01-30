var name = "";
var destination = "";
var start = "";
var frequency = "";
var now;
var wait;
var startTime;
var arrivalTime;

// Initialize Firebase
var config = {
apiKey: "AIzaSyAZv10teNDmF8gT_Z23uQN3oymEmK-yC_c",
authDomain: "train-schedule-f11bd.firebaseapp.com",
databaseURL: "https://train-schedule-f11bd.firebaseio.com",
projectId: "train-schedule-f11bd",
storageBucket: "train-schedule-f11bd.appspot.com",
messagingSenderId: "749223570873"
};

firebase.initializeApp(config);

now = moment();


var dataRef = firebase.database();

$(".btn").on("click", function(){
    event.preventDefault();


    name = $("#name").val().trim();
    start = $("#start").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();


    dataRef.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        start: start,
    })

    console.log(wait);
    console.log(arrivalTime);
})    

dataRef.ref().on("child_added", function(snapshot) {


    var sv = snapshot.val();

    startTime = moment(sv.start, "HH:mm");


    var duration = parseInt(moment.duration(now.diff(startTime)).asMinutes()).toFixed(0);

    var min = duration % sv.frequency;

    wait = sv.frequency-min;

    wait = moment.duration(wait,'minutes').asMinutes();

    arrivalTime = now.add(wait, 'minutes').format("HH:mm");

    $("#tbody").append("<tr><td>"+sv.name+"</td><td>"+sv.destination+"</td><td>"+sv.frequency+"</td><td>"
    +arrivalTime+"</td><td>"+wait+"</td></tr>");
})
