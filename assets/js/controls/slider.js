var slider = function(args){
	var sliderElement = $(args.element);
	var input = sliderElement.find('.auto-size');
	var box = sliderElement.find('.box');
	var checkpoints = args.checkpoints || [];
	input.val(args.startingValue || args.min);

	 function setPositionInSlider(position, element, center){
		if(position < args.min || position > args.max){
			$(element).remove();
			console.error('Position value is outside bounds of slider');
			return;
		}


		var totalValue = args.max - args.min;
		var center = center || 1;
		var width = $(element).outerWidth() / center;
		var sliderHandleWidth = sliderElement.find('.ui-slider-handle').outerWidth();

		return ((position / (totalValue ) * 100) - ((width + sliderHandleWidth) / sliderElement.outerWidth() * 100)) + '%';
	}

	function moveElements(handle){
		var handlePosition = handle.position().left;
		var checkout = sliderElement.find('.box');
		var arrow = sliderElement.find('.arrow');

		sliderElement.find('.fill').width(handlePosition);
		arrow.css('left', (handlePosition - arrow.outerWidth() / 2) + (arrow.outerWidth() - handle.outerWidth()));
		checkout.css('left', handlePosition - checkout.outerWidth() / 2);
	}

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