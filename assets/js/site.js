var siteViewModel = function(){
	var self = this;

	var lowestPrice = 0.99;
	var averagePrice = 7.67;
	var highPrice = 18.31;
	var highestPrice = 49.99;

	self.timeLeft = ko.observable('');
	self.payment = ko.observable(highPrice);
	self.paymentInput = ko.observable(highPrice);
	self.customField = ko.observable(null);
	self.slider = ko.observable(null);
	self.checkpoints = [
		{ text: 'Average', price: averagePrice },
		{ text: 'Top 10%', price: highPrice },
	];

	self.onPaymentChange = function(){
		if(isNaN(self.paymentInput()))
		{
			self.paymentInput(lowestPrice);
		}

		if(self.paymentInput() < lowestPrice)
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

	self.sliderVal = ko.computed(function(){
		if(self.slider()){
			if(self.payment() > highestPrice){
				self.slider().slider('value', highestPrice);
			}else{
				self.slider().slider('value', self.payment());
			}

			self.paymentInput(self.payment());
			var handlePosition = self.slider().find('.ui-slider-handle').position().left;
			var checkout = self.slider().find('.checkout');
			var arrow = self.slider().find('.arrow');
			self.slider().find('.fill').width(handlePosition);
			arrow.css('left', (handlePosition - arrow.outerWidth() / 2) + 3);
			checkout.css('left', handlePosition - checkout.outerWidth() / 2);
		}
	});

	self.setPositionInSlider = function(position, element, center){
		if(position < lowestPrice || position > highestPrice){
			$(element).remove();
			console.error('Position value is outside bounds of slider');
			return;
		}


		var totalValue = highestPrice - lowestPrice;
		var center = center || 1;
		var width = $(element).outerWidth() / center;
		var sliderHandleWidth = self.slider().find('.ui-slider-handle').outerWidth();

		return ((position / (totalValue ) * 100) - ((width + sliderHandleWidth) / self.slider().outerWidth() * 100)) + '%';
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

	self.init();
}

siteViewModel.prototype.init = function(){
	var today = new Date();
	var endDate = getDummyDateHoursMissing();
	var self = this;
	var sliderElement = $('.slider');
	var input = sliderElement.find('.auto-size');
	input.val(self.getHighPrice());

	sliderElement.slider({
		min: self.getLowestPrice(),
		max: self.getHighestPrice(),
		step: 0.01,
		slide: function(e, ui){
			self.payment(ui.value.toFixed(2));
			sizeInput(input[0]);
		}
	});
	sliderElement.css('margin-bottom', sliderElement.find('.checkout').outerHeight());
	sizeInput(input[0]);
	self.slider(sliderElement);
	
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