var DP_SCHEDULE_PAGER_RANGE = 5;
var DP_DAY_IN_MILLIS = 24 * 3600 * 1000;

function getDateLink(timestamp) {
    var date = new Date();
    date.setTime(timestamp);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    return "/program/" + year + "-" + month + "-" + day;
}

function getFormattedDate(timestamp) {
    var date = new Date();
    date.setTime(timestamp);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return day + ".&nbsp;" + month + ".&nbsp;" + year;
}

function getLocalizedDayOfWeek(timestamp) {
    switch (timestamp) {
        case todayTimestamp:
            return "Dnes";
            break;
        case yesterdayTimestamp:
            return "Včera";
            break;
        case tomorrowTimestamp:
            return "Zítra";
            break;
    }

    var date = new Date();
    date.setTime(timestamp);

    var dayOfWeek = date.getDay();

    switch (dayOfWeek) {
        case 1:
            return "Pondělí";
            break;
        case 2:
            return "Úterý";
            break;
        case 3:
            return "Středa";
            break;
        case 4:
            return "Čtvrtek";
            break;
        case 5:
            return "Pátek";
            break;
        case 6:
            return "Sobota";
            break;
        case 0:
            return "Neděle";
            break;
    }
}

function setScheduleOffset(offset) {
    scheduleOffset = offset;
    var newLowerBoundaryInRange = selectedDateTimestamp + (DP_DAY_IN_MILLIS * offset);
	var newUpperBoundaryInRange = newLowerBoundaryInRange + (DP_DAY_IN_MILLIS * (DP_SCHEDULE_PAGER_RANGE - 1));

    if (newUpperBoundaryInRange > highestDateBoundaryTimestamp) {
		newUpperBoundaryInRange = highestDateBoundaryTimestamp;
        newLowerBoundaryInRange = highestDateBoundaryTimestamp - (DP_DAY_IN_MILLIS * (DP_SCHEDULE_PAGER_RANGE - 1));
    }
    if (newLowerBoundaryInRange < lowestDateBoundaryTimestamp) {
        newLowerBoundaryInRange = lowestDateBoundaryTimestamp;
    }

    var ul = $("ul.guideMenu ");
    var lastButtonInRange = ul.find("li:first");
    ul.find("li").not(".prev,.next").remove();

	var timestamp = newLowerBoundaryInRange;
    for (var i = 0; i < DP_SCHEDULE_PAGER_RANGE; i++) {
        var newLi = $("<li />")
				.addClass("li-" + i).addClass(selectedDateTimestamp === timestamp ? 'active' : '')
				.append($("<a />")
						.attr({
							href: getDateLink(timestamp)
						})
						.append($("<p />").text(getLocalizedDayOfWeek(timestamp)))
						.append($("<p />").addClass("date").html(getFormattedDate(timestamp))));
        lastButtonInRange.after(newLi);
        lastButtonInRange = newLi;
        timestamp += DP_DAY_IN_MILLIS;
    }
}

function allowScheduleOffsetIncrement() {
	// Ziskam hodnotu "timestamp" horni hranice "pager range", posunuteho o 1
	// smerem k horni hranici prezentacniho intervalu TV programu.
    var newUpperBoundaryInRange = selectedDateTimestamp + DP_DAY_IN_MILLIS * (scheduleOffset + DP_SCHEDULE_PAGER_RANGE);

//	var timestampByOffset = selectedDateTimestamp + (DP_DAY_IN_MILLIS * scheduleOffset);
//	console.group("allow ScheduleOffset Increment");
//	console.log("              " + logTimeline());
//	console.log("upperInRange: " + logMarkOnTimeline(newUpperBoundaryInRange, "u"));
//	console.log("selectedDate: " + logMarkOnTimeline(selectedDateTimestamp, "s"));
//	console.log("offset:       " + logMarkOnTimeline(timestampByOffset, "o"));
//	console.log("upperInRange: " + newUpperBoundaryInRange);
//	console.groupEnd();

    return (newUpperBoundaryInRange <= highestDateBoundaryTimestamp);
}

function allowScheduleOffsetDecrement() {
	// Ziskam hodnotu "timestamp" spodni hranice "pager range", posunuteho o 1
	// smerem ke spodni hranici prezentacniho intervalu TV programu.
    var newLowerBoundaryInRange = selectedDateTimestamp + DP_DAY_IN_MILLIS * (scheduleOffset - 1);

//	var timestampByOffset = selectedDateTimestamp + (DP_DAY_IN_MILLIS * scheduleOffset);
//	console.group("allow ScheduleOffset Decrement");
//	console.log("              " + logTimeline());
//	console.log("lowerInRange: " + logMarkOnTimeline(newLowerBoundaryInRange, "l"));
//	console.log("selectedDate: " + logMarkOnTimeline(selectedDateTimestamp, "s"));
//	console.log("offset:       " + logMarkOnTimeline(timestampByOffset, "o"));
//	console.log("lowerInRange: " + newLowerBoundaryInRange);
//	console.groupEnd();

    return (newLowerBoundaryInRange >= lowestDateBoundaryTimestamp);
}

function incrementScheduleOffset() {
    if (allowScheduleOffsetIncrement()) {
        setScheduleOffset(scheduleOffset + 1);
    }
}

function decrementScheduleOffset() {
    if (allowScheduleOffsetDecrement()) {
        setScheduleOffset(scheduleOffset - 1);
    }
}

function scrollScheduleTo(target) {
    if ($(target).length == 0) {
        return;
    }
    $("html, body").animate({
        scrollTop: $(target).offset().top
    }, 1000);
}

function programEvenRows() {
    var rowsLeft = $("div.guideDecko tr[class!='blok']");
    var rowsRight = $("div.guideOthers tr[class!='blok']");
    for (var i = 0; i < $("div.guideDecko tr[class!='blok']").length; i++) {
        if (i % 2 != 0) {
            rowsLeft[i].className += "alt";
        }
    }
    for (var j = 0; j < $("div.guideOthers tr[class!='blok']").length; j++) {
        if (j % 2 != 0) {
            rowsRight[j].className += "alt";
        }
    }
}

function trClick(elem) {
    if (elem.className == "a-enabled") {
    }
}

function logTimeline() {
	var DP_MIN_ON_TIMELINE = (lowestDateBoundaryTimestamp - todayTimestamp) / DP_DAY_IN_MILLIS;
	var DP_MAX_ON_TIMELINE = (highestDateBoundaryTimestamp - todayTimestamp) / DP_DAY_IN_MILLIS;
	let buffer = "";
	for (let i = DP_MIN_ON_TIMELINE; i <= DP_MAX_ON_TIMELINE; i++) {
		let str = "" + i;
		for (let len = str.length; len < 3; len++) {
			str = " " + str;
		}
		buffer += str + " ";
	}
	return buffer;
}

function logMarkOnTimeline(date, mark) {
	var DP_MIN_ON_TIMELINE = (lowestDateBoundaryTimestamp - todayTimestamp) / DP_DAY_IN_MILLIS;
	var DP_MAX_ON_TIMELINE = (highestDateBoundaryTimestamp - todayTimestamp) / DP_DAY_IN_MILLIS;
	let timelineIndex = (date - todayTimestamp) / DP_DAY_IN_MILLIS;
	let buffer = "";
	for (let i = DP_MIN_ON_TIMELINE; i <= DP_MAX_ON_TIMELINE; i++) {
		if (timelineIndex === i) {
			buffer += "  " + mark + " ";
		} else {
			buffer += "    ";
		}
	}
	return buffer;
}

function logState() {
	
	let ai = allowScheduleOffsetIncrement();
	let ad = allowScheduleOffsetDecrement();
	
	var timestamp = selectedDateTimestamp + (DP_DAY_IN_MILLIS * scheduleOffset);
	console.log("              " + logTimeline());
	console.log("by offset:    " + logMarkOnTimeline(timestamp, "o"));
	console.log("now:          " + logMarkOnTimeline(todayTimestamp, "n"));
	console.log("selectedDate: " + logMarkOnTimeline(selectedDateTimestamp, "s"));
	
	console.log("scheduleOffset ............. [" + scheduleOffset + "]");
	console.log("selectedDateTimestamp ...... [" + selectedDateTimestamp + "]");
	console.log("todayTimestamp ............. [" + todayTimestamp + "]");
	console.log("yesterdayTimestamp ......... [" + yesterdayTimestamp + "]");
	console.log("tomorrowTimestamp .......... [" + tomorrowTimestamp + "]");
	console.log("lowestDateBoundaryTimestamp  [" + lowestDateBoundaryTimestamp + "]");
	console.log("highestDateBoundaryTimestamp [" + highestDateBoundaryTimestamp + "]");
	console.log("allowScheduleOffsetIncrement [" + ai + "]");
	console.log("allowScheduleOffsetDecrement [" + ad + "]");
}
