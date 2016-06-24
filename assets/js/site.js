var siteViewModel = function(){
	var self = this;

	var lowestPrice = 0.99;
	var averagePrice = 7.67;
	var highPrice = 18.31;
	var highestPrice = 49.99;

	self.timeLeft = ko.observable('');
	self.payment = ko.observable(highPrice);

	self.init();
}

siteViewModel.prototype.init = function(){
	var today = new Date();
	var endDate = getDummyDateHoursMissing();
	var self = this;
	
	if(today < endDate){
		if(today.addDays(1) > endDate){
			var timer = setInterval(function(){
				today = today.addSeconds(1);
				self.timeLeft(getMissingTime(today, endDate));

				if(self.timeLeft() == '00:00:00')
				{
					self.timeLeft(null);
					clearInterval(timer);
				}
			}, 1000);
		}else{
			self.timeLeft(getMissingTime(today, endDate, true) + ' days');
		}
	}
};

/*Dummy functions to simulate getting a value from a DB. Change between Hours and Days
 to see the different functionalities working*/
function getDummyDateHoursMissing()
{
	return new Date().addHours(5).addMinutes(59).addSeconds(59);
}

function getDummyDateDaysMissing()
{
	return new Date().addDays(9);
}

function getDummyDateSecondsMissing()
{
	return new Date().addSeconds(5);
}

function getDummyDateDone()
{
	return new Date().addDays(-1);
}