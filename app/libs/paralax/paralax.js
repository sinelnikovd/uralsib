$(document).ready(function() {
    function getHeightVisible() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    }
    var data = {},
        i = 0,
        lastScrollTop = $(this).scrollTop(),
        lastPositionFixed = null,
        animationStatus = false;
    var breakIsWhite = false;
    $('section').each(function() {
        $(this).css({
            'z-index': 0,
            'position': 'relative'
        })
        data[i] = {};
        data[i]['class'] = '.js-window-paralax-' + i;
        data[i]['height'] = 0;
        if ($(this).hasClass('js-window-parallax-active'))
            data[i]['active'] = true;
        $(this).addClass('js-window-paralax-' + i);
        if ($(window).outerWidth() > 1200 && getHeightVisible() > 800) animationStatus = true;
        i++;
    });

    $(window).resize(function() {
        if ($(this).outerWidth() < 1200 || getHeightVisible() <= 800) {
            animationStatus = false;
            if (lastPositionFixed) {
                $(data[lastPositionFixed].class).css({
                    'position': 'relative',
                    'margin-top': 0
                });
                $(data[lastPositionFixed * 1 + 1].class).css({
                    'margin-top': (parseFloat($(data[lastPositionFixed * 1 + 1].class).css('margin-top')) - data[lastPositionFixed].height)
                });
                lastPositionFixed = null;
            }
        }
        if ($(window).outerWidth() > 1200 && getHeightVisible() > 800) animationStatus = true;

        for (var val in data) {
            data[val].height = $('.js-window-paralax-' + val).outerHeight();
        }
    });

    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        if (animationStatus) {
            var heightWindows = 0;
            //var scrollTo = scrollTop > lastScrollTop ? 'bottom' : 'top';

            for (var val in data) {
                if (data[val].height === 0) {
                    data[val].height = $('.js-window-paralax-' + val).outerHeight();
                }

                heightWindows += data[val].height;
                if (heightWindows - 500 < scrollTop && heightWindows > scrollTop && data[val].active == true) {
                    lastPositionFixed = val;
                    $(data[lastPositionFixed].class).css({
                        'position': 'fixed',
                        'top': 0,
                        'width': '100%',
                        'margin-top': -(data[lastPositionFixed].height - 500 - $('.nav-top').outerHeight())
                    });
                    $(data[(val * 1 + 1)].class).css({
                        'margin-top': data[lastPositionFixed].height
                    });
                    break;
                } else {
                    if (lastPositionFixed) {
                        $(data[lastPositionFixed].class).css({
                            'position': 'relative',
                            'margin-top': 0
                        });
                        $(data[lastPositionFixed * 1 + 1].class).css({
                            'margin-top': (parseFloat($(data[lastPositionFixed * 1 + 1].class).css('margin-top')) - data[lastPositionFixed].height)
                        });
                        lastPositionFixed = null;
                    }
                }

                if (heightWindows > scrollTop) {
                    break;
                }
            }
        }
    });
});