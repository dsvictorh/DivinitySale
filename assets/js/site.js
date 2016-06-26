var siteViewModel = function(){
	var self = this;

	var lowestPrice = 0.99;
	var averagePrice = 7.67;
	var highPrice = 18.31;
	var highestPrice = 49.99;

	self.timeLeft = ko.observable('');
	self.payment = ko.observable(0);
	self.paymentInput = ko.observable(0);
	self.customField = ko.observable(null);
	self.slider = ko.observable(null);
	self.checkpoints = [
		{ text: 'Average', price: averagePrice },
		{ text: 'Top 10%', price: highPrice },
	];

	function init(){
		var today = new Date();
		var endDate = getDummyDateHoursMissing();	

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

		self.payment = ko.observable(highPrice);
		self.paymentInput = ko.observable(highPrice);

		self.slider(slider({
			element: $('.slider'),
			min: lowestPrice,
			max: highestPrice,
			step: 0.01,
			startingValue: highPrice,
			onSlide: function(e, ui){
				self.payment(ui.value.toFixed(2));
			}
		}));
	};


	self.sliderVal = ko.computed(function(){
		if(self.slider()){
			if(self.payment() > highestPrice){
				self.slider().element.slider('value', highestPrice);
			}else{
				self.slider().element.slider('value', self.payment());
			}

			self.paymentInput(self.payment());
		}
	});

	self.onPaymentChange = function(){
		if(isNaN(self.paymentInput()))
		{
			var number = parseFloat(self.paymentInput());
			self.paymentInput(number || lowestPrice);
		}
		else if(self.paymentInput() < lowestPrice)
		{
			self.paymentInput(lowestPrice);
		}

		self.payment(self.paymentInput());
	};

	self.checkout = function(){
		if(self.payment() < lowestPrice){
			alert('Please select a valid price');
		}

		if(self.timeLeft()){
			alert('Redirect to checkout functionality here');
		}

		return false;
	}

	self.setActive = function(price){
		switch(price)
		{
			case 'lowest':
				return self.payment() >= lowestPrice;
			case 'average':
				return self.payment() >= averagePrice;
			case 'high':
				return self.payment() >= highPrice;
			case 'highest':
				return self.payment() >= highestPrice;
		}
		
		return false;
	}

	self.getLowestPrice = function(){
		return lowestPrice;
	}

	self.getAveragePrice = function(){
		return averagePrice;
	}

	self.getHighPrice = function(){
		return highPrice;
	}

	self.getHighestPrice = function(){
		return highestPrice;
	}

	self.setImage = function(img, price){
		return 'assets/img/games/' + img + (self.setActive(price) ? '-active' : '') + '.png';
	}

	init();
}

/*Dummy functions to simulate getting a value from a DB. Change between Hours and Days
 to see the different functionalities working*/
function getDummyDateHoursMissing()
{
	return new Date().addHours(23).addMinutes(59).addSeconds(59);
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