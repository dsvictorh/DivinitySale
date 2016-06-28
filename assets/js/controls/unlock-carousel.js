var unlockCarousel = function(args){
	var carousel = $(args.element);
    
	carousel.owlCarousel({
        navigation: true,
        slideSpeed: 300,
        dots: false,
        singleItem: true,
        navigationText: [args.prevText || '', args.NextText || ''],
        afterMove: args.afterMove,
    });

    $(args.pages).click(function(){
        $(args.element).trigger('owl.goTo', $(this).index());
    });

    return {
    	carouselElement: carousel,
    }
};