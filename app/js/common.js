$(document).ready(function() {

	if($('input.data-inputmask').length > 0) {
		$('input.data-inputmask').mask("+7 (999) 999-99-99");
	}



	var carouselCustomer = $('.carousel-customer__items').owlCarousel({
		loop: true,
		nav: false,
		items: 1
	})
	$('.carousel-customer__prev').click(function() {
		carouselCustomer.trigger('prev.owl.carousel');
	})
	$('.carousel-customer__next').click(function() {
		carouselCustomer.trigger('next.owl.carousel');
	})



});

	//SVG Fallback
if (!Modernizr.svg) {
	// wrap this in a closure to not expose any conflicts
	(function() {
		// grab all images. getElementsByTagName works with IE5.5 and up
		var imgs = document.getElementsByTagName('img'),endsWithDotSvg = /.*\.svg$/,i = 0,l = imgs.length;
		// quick for loop
		for(; i < l; ++i) {
			if(imgs[i].src.match(endsWithDotSvg)) {
				// replace the png suffix with the svg one
				imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
			}
		}
	})();
}