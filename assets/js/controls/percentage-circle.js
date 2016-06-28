// create a circle using HTML5 / CSS3 / JS which has a border that only goes part-way around
// the circle .. and which can be smoothly animated from 0% to 100% around the circle

// this solution allows for animation and still results in relatively clean code
// we use four quarter-circles, all hidden away behind a white square to start with..
// all four are rotated out clockwise, and each quarter will stop at it's own maximum:
// q1 at 25%, q2 at 50% .. etc. once we reach a value at or over 25%, all four quarters
// should be out from behind the white square, and we can hide it.. it needs to be
// hidden if we display a value over 75%, or else q4 will end up going in behind it again
// .. also, since the top border will usually sit between the angles of  -45 to 45, we
// rotate everything by an extra -45 to make it all line up with the top nicely

var percentageCircle = function(el, value, total){
	var fromHidden = 135;

	// utility funciton to align 0 degrees with top
	// takes degrees and returns degrees - 45
	function topAlign(degrees) {
	    return degrees - 90;
	};

	// utility function to rotate a jQuery element
	// takes element and the degree of rotation (from the top) 
	function rotate(el, degrees) {
		var degrees = topAlign(degrees || 0);
		el.css(
			'transform', 'rotate('+degrees+'deg)',
			'-webkit-transform', 'rotate('+degrees+'deg)',
			'-moz-transform', 'rotate('+degrees+'deg)',
			'-ms-transform', 'rotate('+degrees+'deg)',
			'-o-transform', 'rotate('+degrees+'deg)'
		)
	}

	// function to draw semi-circle
	// takes a jQuery element and a value (between 0 and 1)
	// element must contain four .arc_q elements
	function circle(el, value, total) {
		if(value > total){
			console.error('Value cannot exceed total');
			return;
		}

		if(total <= 0){
			console.error('total cannot be equal or less than 0');
			return; 
		}

		var decimalPercentage = (value / total).toFixed(2);

		var degrees = decimalPercentage * 360;             // turn normalised value into degrees
		var counter = 1;                                 // keeps track of which quarter we're working with
		el.find('.quarter').each(function(){               // loop over quarters..
			var angle = Math.min(counter * 90, degrees); // limit angle to maximum allowed for this quarter
			rotate($(this), fromHidden + angle);         // rotate from the hiding place
			counter++; // track which quarter we'll be working with in next pass over loop
		});

		if (degrees > 90)                             // hide the cover-up square soon as we can
			el.find('.cover').css('display', 'none');

		if(decimalPercentage >= 1 && el.find('.full').length){
			el.addClass('complete');
		}

		return Math.floor(decimalPercentage * 100);
	}


	return circle(el, value, total) + '%';
};
