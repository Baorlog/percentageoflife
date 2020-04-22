var personGender, personYear, personMonth, personDay, personHour, personMinute;
var intervals = [];

function Calculate() {
    clearAllIntervals();
    getInput();
    var averageAge = getAverageAge(personGender);
    var bornMillis = getBornMillis();
    var averageAgeMillis = averageAge*365*24*60*60*1000;
    document.getElementById("avg").innerHTML = averageAge;
    var date = new Date();
    var currentMillis = date.getTime() - bornMillis;
    displayPercentage(currentMillis, averageAgeMillis);
}

function getInput() {
    personGender = document.getElementById("PersonGender").value.toLowerCase();
    personYear = parseInt(document.getElementById("PersonYear").value);
    personMonth = parseInt(document.getElementById("PersonMonth").value);
    personDay = parseInt(document.getElementById("PersonDay").value);
    personHour = parseInt(document.getElementById("PersonHour").value);
    personMinute = parseInt(document.getElementById("PersonMinute").value);
}

function getBornMillis(){
    var yearMillis = (personYear - 1970)*365*24*60*60*1000;
    var monthMillis = personMonth*30*24*60*60*1000;
    var dayMillis = personDay*24*60*60*1000;
    var hourMillis = personHour*60*60*1000;
    var minuteMillis = personMinute*60*1000;
    return yearMillis + monthMillis + dayMillis + hourMillis + minuteMillis;
}

function getAverageAge(gender) {
    if (gender == "male") {
        return 71;
    } else if (gender == "female") {
        return 76.3;
    } else {
        return 73.6;
    }
}

function displayPercentage(currentMillis, averageAgeMillis) {
    console.log("Function running...")
    var elem = document.getElementById("Progress");
    var width = (currentMillis/averageAgeMillis)*100;
    var stringPercentage = width.toString().split(".");
    document.getElementById("NumberBig").innerHTML = stringPercentage[0];
    document.getElementById("NumberSmall").innerHTML = "." + stringPercentage[1].substring(0,8);
    elem.style.width = width + "%";

    var id = setInterval(frame, 100);
    intervals.push(id);
    function frame() {
        if(width >= 100 || width <= 0) {
            clearInterval(id);
        } else {
            currentMillis += 100;
            width = (currentMillis/averageAgeMillis)*100;
            var stringPercentage = width.toString().split(".");
            document.getElementById("NumberBig").innerHTML = stringPercentage[0];
            document.getElementById("NumberSmall").innerHTML = "." + stringPercentage[1].substring(0,8);
            elem.style.width = width + "%";
        }
    }
}

function clearAllIntervals(){
    intervals.forEach(id => {
        window.clearInterval(id);
    });
    intervals = [];
}