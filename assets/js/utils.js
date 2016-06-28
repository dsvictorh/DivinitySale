Date.prototype.addSeconds = function(s){
    var newDate = new Date(this);
    newDate.setSeconds(newDate.getSeconds() + s)
    return newDate;
}

Date.prototype.addMinutes = function(m){
    var newDate = new Date(this);
    newDate.setMinutes(newDate.getMinutes() + m)
    return newDate;
}

Date.prototype.addHours = function(h){
    var newDate = new Date(this);
    newDate.setHours(newDate.getHours() + h)
    return newDate;
}

Date.prototype.addDays = function(d){
    var newDate = new Date(this);
    newDate.setDate(newDate.getDate() + d)
    return newDate;
}


function getMissingTime(startDate, endDate, getDays){
	var difference = (endDate.getTime() - startDate.getTime());
	var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24
 
    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60
 
    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60
 
    var secondsDifference = Math.floor(difference/1000);

	return getDays ? padZero(daysDifference, 2) : padZero(hoursDifference, 2) + ':' + padZero(minutesDifference, 2) + ':' + padZero(secondsDifference, 2);
}


//Add 0s to the left until the correct size is met
function padZero(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


//Makes sure the first instance of the repeating function executes immediately
function instantInterval(fn, timeout){
    fn();
    return setInterval(fn, timeout);
}



$(document).ready(function(){
    //Blurs elements that are clicked as the focus state creates
    //a black border on the tabable controls for accesibility
	$('body').on('.no-selection', 'click', function(){
		$(this).blur();
	});

	$('.no-click-bubble').on('click mousedown touchstart touchend', function(e){
		e.stopImmediatePropagation();
	});

    //The browser doesn't trigger a value change on an input as soon as its value changes
    //but rather after you lose focus on it. This makes sure the change event is triggered
    //as you type to get more immediate results
	$('.type-change').on('keyup', function(){
		var input = $(this);
		input.trigger('change');
	});
});
