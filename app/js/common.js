$(document).ready(function() {

	if($('input.data-inputmask').length > 0) {
		$('input.data-inputmask').mask("+7 (999) 999-99-99");
	}

	$('.section-1__scroll-down-link').click(function() {
		if($('section').is('.section-2')){
			var scrollLastForm = $('.section-2').offset().top-110;
			$('body,html').animate({scrollTop:scrollLastForm},800);
		}	
		return false;
	});


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


	var carouselFunctionImg = $('.carousel-function-img').owlCarousel({
		loop: true,
		nav: false,
		items: 1,

	})

	$('.carousel-function__prev').click(function() {
		carouselFunctionImg.trigger('prev.owl.carousel');
	})
	$('.carousel-function__next').click(function() {
		carouselFunctionImg.trigger('next.owl.carousel');

	})



	$('.section-9__mobile-version').jScrollPane({'contentWidth': 295});


	function animation_init() {
		move_el_init($('*[data-elmove="true"]'));

		setTimeout(function(){
			move_el_action($('*[data-elmove="true"]'));
		}, 1500)
	}

animation_init();

function move_el_init(el) {
	el.each(function(){
		var dur, posX, posY, transform_v, delay;

		if(!$(this).data('dur'))
			dur = 2;
		else
			dur = $(this).data('dur')

		posX = $(this).data('left')+'px';
		posY = $(this).data('top')+'px';

		if($(this).data('transform')) {
			transform_v = $(this).data('transform');
		} else {
			transform_v = '';
		}

		if($(this).data("delay")) {
			delay = $(this).data('delay');
		} else {
			delay = 0;
		}

		$(this).css({'transform': 'translate('+posX+', '+posY+') '+transform_v, opacity:0});
		var bll = $(this);
		setTimeout(function(){
			bll.css({transition:'all '+dur+'s ease', 'transition-delay': delay+'s'});
		}, 100)
	});
}

function move_el_action(el) {
	el.each(function(){
		if(check_pos($(this)) !== true || $(this).hasClass('animation_done__'))
			return;

		$(this).css({'transform':'translate(0,0) scale(1)', opacity:1}).addClass('animation_done__');
	})
}

function check_pos(bl) {

	if(bl.data('force-start') == true)
		return true;

	var offset = 0;
	if(bl.data('offset'))
		offset = bl.data('offset');

	console.log(offset)

	var top_pos = bl.offset().top,
	wh = $(window).height(),
	wpos = $(window).scrollTop(),
	wbot = wh + wpos-wh*offset;

	if(wbot > top_pos) {
		return true;
	} else {
		return false; 
	}
}

	$(window).scroll(function(){
		move_el_action($('*[data-elmove="true"]'));

		var wp = $(window).scrollTop();
			

		if ($(".section-3__bacground").offset().top < (wp+$(window).height())) {
			var yPos = -($(".section-3__bacground").offset().top-wp)*0.8;
			if(yPos < 0)
				yPos = 0;
			$(".section-3__bacground").css({"background-position": "center "+yPos+"px"});
		}

		/*if (($(".section-9").offset().top+$(window).height()) <= (wp+$(window).height()+113)) {
			$('.section-9').css({'position':'fixed', 'z-index': '-2'});
			$('.section-10').css({'margin-top': '861px'});
			if(($(".section-9").height()+113) < $(window).height() ){
				$('.section-9').css({'top': '113px'});
			}else{
				$('.section-9').css({'bottom': '0'});
			}
		}*/
		/*var bool = $(".section-10").offset().top >=(wp+$(window).height()+113);
		if($(".section-9").height() < $(window).height()){
			bool = $(".section-10").offset().top >(wp+$(".section-9").height());
		}
		if (bool) {
			$('.section-9').css({'position':'static'});
			$('.section-10').css({'margin-top': '0'});
		}

		if ($(".section-10").offset().top < (wp+113)) {
			$('.section-9').css('display','none');
		}else{
			$('.section-9').css('display','block');
		}*/

		
		if(wp > 0)
			$('nav.nav-top').addClass('nav-fixed')
		else
			$('nav.nav-top').removeClass('nav-fixed')
	});

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