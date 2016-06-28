var percentageCircle = function(el, value, total){
	//The quarters of the circle will start covering from the top. Meaning that every 90 degrees
	//means one of the sides. Since this square fills the quarters diagonally so it makes more sense visually
	//the degrees are reduced by 45 degrees making sure that each start point of a quarter is the exact half on each side of the square
	function topAlign(degrees) {
	    return degrees - 45;
	};

	function rotate(el, degrees) {
		//Align the quarters
		var degrees = topAlign(degrees || 0);
		el.css(
			'transform', 'rotate('+degrees+'deg)',
			'-webkit-transform', 'rotate('+degrees+'deg)',
			'-moz-transform', 'rotate('+degrees+'deg)',
			'-ms-transform', 'rotate('+degrees+'deg)',
			'-o-transform', 'rotate('+degrees+'deg)'
		)
	}


	function circle(el, value, total) {
		if(value > total){
			console.error('Value cannot exceed total');
			return;
		}

		if(total <= 0){
			console.error('total cannot be equal or less than 0');
			return; 
		}

		//We get the percentage in a decimal way
		var decimalPercentage = (value / total).toFixed(2);

		//Turn the percentage into degrees
		var degrees = decimalPercentage * 360;        
		var counter = 1;                                 
		el.find('.quarter').each(function(){     
			//All quarters try to rotate for the full value. By separating
			//each quarter's maximum (90, 180, 270, 360) degrees we make sure once 
			//that quarter reaches its full only the other quarters keep travelling          
			var angle = Math.min(counter * 90, degrees);
			rotate($(this), angle);
			counter++;
		});

		//The cover only needs to hide values less than 90 degrees as the non fully rotated 
		//borders will invade the 4th quarter of the circle. Once the value exceeds 90 degrees each line will hide
		//behind each other quarter so we can remove it
		if (degrees > 90)
			el.find('.cover').css('display', 'none');

		if(decimalPercentage >= 1 && el.find('.full').length){
			el.addClass('complete');
		}

		//Get the decimal value into percentage to show the value
		return Math.floor(decimalPercentage * 100);
	}


	return circle(el, value, total) + '%';
};
