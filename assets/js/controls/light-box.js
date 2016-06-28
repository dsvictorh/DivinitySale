var lightBox = function(){
	var box = $('.light-box');

	function show(url){
		box.find('iframe').attr('src', url);
		box.fadeIn();
	}

	function hide(){
		box.fadeOut(function(){
			box.find('iframe').attr('src', '');
		});
	}

	box.on('click', function(){
		hide();
	});

	box.find('.content').on('click', function(e){
		e.stopImmediatePropagation();
	});

	return{
		element: box,
		show: show,
		hide: hide,
	}
}