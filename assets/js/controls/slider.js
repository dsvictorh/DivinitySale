var slider = function(args){
	var sliderElement = $(args.element);
	var input = sliderElement.find('.auto-size');
	var box = sliderElement.find('.box');
	var checkpoints = args.checkpoints || [];
	input.val(args.startingValue || args.min);

	if(args.min < 0){
		console.error('Min value cannot be less than 0');
		return;
	}

	if(args.max < args.min){
		console.error('Max value cannot be less than min value');
		return;
	}

	function setPositionInSlider(position, element, center){
		if(position < args.min || position > args.max){
			$(element).remove();
			console.error('Position value is outside bounds of slider');
			return;
		}

		//To get the real percentage we must substract the minimum value of the slider
		//considering it might not be 0
		var totalValue = args.max - args.min;

		//Should and item be positioned elsewhere from its origin rather than starting
		//in it (e.g.: 2 so it is cut by half and centered) the position needs to be moved
		//backwards and therefore we have to make sure the result is changed to negative
		var center = -center || 1;
		var width = $(element).outerWidth() / center;

		//The real valueon the slider lies on the left side of the handler
		//so to give the feeling you are choosing the value when you are over 
		//the checkpoint rather than as soon as touching it we need to take half the handler's
		//width so the item is activated when this is midway through
		var sliderHandleWidth = sliderElement.find('.ui-slider-handle').outerWidth() / 2;

		//To get an accurate percentage we need to substract the minimum value of the slider
		//to the position just as we did the maximum value to get a base 0 calculation.
		//We also need to make sure to substract the handler's and element's width so it is
		//centered correctly
		return (((position - args.min) / totalValue * 100) - (Math.abs(sliderHandleWidth - width) / sliderElement.outerWidth() * 100)) + '%';
	}
	

	//All elements that are supposed to be attached to the handler
	//will be centered accordingly while following this
	function moveElements(handle){
		var handlePosition = handle.position().left;
		var checkout = sliderElement.find('.box');
		var arrow = sliderElement.find('.arrow');

		sliderElement.find('.fill').width(handlePosition);
		arrow.css('left', (handlePosition - arrow.outerWidth() / 2) + (arrow.outerWidth() - handle.outerWidth()));
		checkout.css('left', handlePosition - checkout.outerWidth() / 2);
	}

	//The browser doesn't respond to text inputs' width when set ot automatic
	//as they work with the size attribute that default to 25. To have the input
	//always be of the correct size to keep the design accurate it needs to recalculate
	//its own width according to its value
	function resizeTextInput(){
		if(input.length){
			var size = input.val().length;
			var fontSize = window.getComputedStyle(input[0], null).getPropertyValue('font-size');
			input.css('width', (size + 1) * (parseInt(fontSize) / 2));
		}
	}

	sliderElement.slider({
		min: args.min || 0,
		max: args.max || 100,
		step: args.step || 1,
		slide: function(e, ui){
			if(typeof args.onSlide === 'function'){
				args.onSlide(e, ui);
			}else {
				console.error('onSlide is not a function');
			}

			moveElements($(ui.handle));
			resizeTextInput();
		},
		change: function(e, ui){
			moveElements($(ui.handle));
			resizeTextInput();
		}
	});
	

	//If there is a box element following the handler
	//we need to make sure that the proper margin is added since
	//this element is absolutely positioned and has its dimension outside the document flow
	if(box.length){
		sliderElement.prepend('<i class="arrow"></i>')
		sliderElement.css('margin-bottom', box.outerHeight());
	}
		

	resizeTextInput();
	return {
		element: sliderElement,
		setPositionInSlider: setPositionInSlider
	};
}