var yearDiff, monthDiff, dayDiff, yearSum, monthSum, daySum;
yearSum=0, monthSum=0, daySum=0;
document.getElementById("resultTable").style.display = "none";

function CalculateDiff() {
    var dateOfJoining = new Date(document.getElementById('dateOfJoining').value);
    var dateLeftVessel = new Date(document.getElementById('dateLeftVessel').value);

    console.log("Date of Joining:" + dateOfJoining);
    // console.log("Date of Joining:" + getFormattedDate(dateOfJoining));
    
    console.log("Date Vessel Left:" + dateLeftVessel);
    console.log("Date Difference:" + dateDiff(dateOfJoining, dateLeftVessel.setDate(dateLeftVessel.getDate() + 1)));
    addrow();
}

function dateDiff(startingDate, endingDate) {
    yearDiff = 0, monthDiff = 0, dayDiff = 0;
    var startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
        endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    var endDate = new Date(endingDate);
    if (startDate > endDate) {
        var swap = startDate;
        startDate = endDate;
        endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    yearDiff = endDate.getFullYear() - startYear;
    monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }

    return yearDiff + ' Years ' + monthDiff + ' Months ' + dayDiff + ' Days';
}

function addrow()
{
	var vesselName= document.getElementById('vesselName').value;
	var dateOfJoining = new Date(document.getElementById('dateOfJoining').value);
    var dateLeftVessel = new Date(document.getElementById('dateLeftVessel').value);
	
	yearSum+=yearDiff, monthSum+=monthDiff, daySum+=dayDiff;
	
	if(daySum > 30){
		console.log("daySum"+daySum/30);
		monthSum += Math.floor(daySum/30);
		daySum= daySum%30;
	}
	
	var tableRow= "<tr>"+
				"<td>"+vesselName+"</td>"+
				"<td>"+getFormattedDate(dateOfJoining)+"</td>"+
				"<td>"+getFormattedDate(dateLeftVessel)+"</td>"+
				"<td>"+yearDiff+"</td>"+
				"<td>"+monthDiff+"</td>"+
				"<td>"+dayDiff+"</td>"+
			"</tr>";
	
	var tableSum =
			"<tr>"+
				"<td>Total Seatime:</td>"+
				"<td></td>"+
				"<td></td>"+
				"<td>"+yearSum+"</td>"+
				"<td>"+monthSum+"</td>"+
				"<td>"+daySum+"</td>"+
			"</tr>";
	document.getElementById("differenceCalculated").innerHTML +=tableRow;
	document.getElementById("TotalSum").innerHTML =tableSum;
};

function getFormattedDate(date){
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}