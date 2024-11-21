// function scripts(container){
    function remToPx(rem){    
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    let scrollY = 0;
    const pageContainer = document.querySelector('[data-scroll-container]');

    if($(document).width() <= 992){
        $('[data-scroll]').addClass('is-inview');
    }

    gsap.registerPlugin(ScrollTrigger, Draggable);
    const scroll = new LocomotiveScroll({
        el: pageContainer,
        smooth: true,
        tablet: {
            breakpoint: 0,
        }
    });

    $('section.page-otiokaio-learn div.in span').hover(function(){
        $('body').addClass('dark');
    }, function(){
        $('body').removeClass('dark');
    });

    scroll.on("scroll", args => {
        scrollY = args.scroll.y;
        ScrollTrigger.update();
        if(window.matchMedia("(orientation: landscape)").matches && $(document).width() > 992){
            if($('.white-view').hasClass('is-inview')){
                $('body').removeClass('dark gray');
            } else {
                if(!$('body').hasClass('dark-page')){
                    $('body').removeClass('dark gray');
                } else {
                    $('body').addClass('dark');
                }
                $('body').removeClass('gray');
                if($('.gray-view').hasClass('is-inview')){
                    $('body').addClass('gray').removeClass('dark');
                } else {
                    if(!$('body').hasClass('dark-page')){
                        $('body').removeClass('dark');
                    } else {
                        $('body').addClass('dark');
                    }
                    $('body').removeClass('gray');
                }
            }
            if($('section.page-project-hero').length){
                $('body').addClass('white-page')
            } else {
                // $('body').css('background-color','');
            }
            if(
                $('footer').hasClass('is-inview') ||
                ($('section.page-otiokaio-learn div.in span').length && $('section.page-otiokaio-learn div.in span').is(':hover'))
            ){
                $('body').addClass('dark').removeClass('gray white-page');
            } else {
                if(!$('body').hasClass('dark-page')){
                    if($('.dark-view').length && $('.dark-view').hasClass('is-inview') && !$('.white-view').hasClass('is-inview')){
                        $('body').addClass('dark').removeClass('gray');
                    } else {
                        $('body').removeClass('dark');
                    }
                }
            }
            if(args.scroll.y > 100){
                $('header').addClass('min');
            } else {
                $('header').removeClass('min');
            }
            if($('section.page-studio-brands').length && $('section.page-studio-brands .row > div:nth-child(17) .img').hasClass('is-inview')){
                $('section.page-studio-brands').addClass('opacity');
            } else {
                $('section.page-studio-brands').removeClass('opacity');
            }
        } else if($(document).width() > 992) {
            $('body').addClass('contrast');
            if($('body').hasClass('dark-page')){
                $('body').addClass('dark').removeClass('gray');
            }
            if($('section.page-project-hero').length){
                $('body').addClass('white-page')
            }
            if(!$('body').hasClass('dark-page')){
                if(!$('.dark-view').hasClass('is-inview')){
                    $('body').removeClass('dark gray');
                } else {
                    $('body').addClass('dark');
                }
            }
        }
    });
    function isIpadPro() {
        var ratio = window.devicePixelRatio || 1;
        var screen = {
            width : window.screen.width * ratio,
            height : window.screen.height * ratio
        };
        return (screen.width === 2048 && screen.height === 2732) || (screen.width === 2732 && screen.height === 2048) || (screen.width === 1536 && screen.height === 2048) || (screen.width === 2048 && screen.height === 1536);
    }
    const userAgent = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    if(isTablet){
        $('body').addClass('tablet');
    }
    if($(document).width() > 992 && !isTablet){
        trigger = ScrollTrigger.scrollerProxy(pageContainer, {
            scrollTop(value) {
                return arguments.length
                ? scroll.scrollTo(value, 0, 0)
                : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    left: 0,
                    top: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: "transform"
        });
    }

    const textarea = $('.textarea');
    if(textarea.length){
        textarea.find('span').each(function(i, el){
            if(i == 0){
                $(el).attr('contenteditable', true).addClass('focus');
            }
            $(el).attr('contenteditable', true).addClass('editable empty');
        });
    }
    textarea.not(textarea.find('span')).not('select').click(function(e){
        if(!textarea.find('span.empty').first().html().length){
            textarea.find('span.empty').first().focus();
        }
    });
    textarea.trigger('click');
    textarea.find('span').on('keydown', function(e){
        if(e.keyCode == 32){
            $(this).html($(this).html()+'\xA0');
            $(this).focus();
            scroll.update();
            return false;
        }
        if($(this).html().length){
            $(this).removeClass('empty');
        }
    });
    $(document).on('change', '.textarea select', function(){
        var text = $(this).find('option:selected').text()
        var $aux = $('<select/>').append($('<option/>').text(text))
        $(this).after($aux)
        $(this).width($aux.width())
        $aux.remove()
        console.log('aa')
      }).change()
    textarea.find('span').focus(function(i, el){
        $(el).focus();
        $(this).addClass('focus')
        if($(this).hasClass('empty')){
            $(this).html('');
        }
        setTimeout(function(){
            document.execCommand('selectAll');
            document.getSelection().collapseToEnd();
            scroll.update();
        }, 0);
    });
    textarea.find('span').keypress(function(e){
        if($(this).html().length){
            $(this).removeClass('focus')
        } else {
            $(this).addClass('focus')
        }
        if(e.which == 13 && $(this).html().length){
            e.preventDefault();
            $(this).next()[0].focus({ preventScroll: true });
        }
    });

    $(document).on('focus', '.textarea select', function(){
        $(this).trigger('click')
    });

    var behavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    options = {
        onKeyPress: function (val, e, field, options) {
            field.mask(behavior.apply({}, arguments), options);
            setTimeout(function(){
                document.execCommand('selectAll');
                document.getSelection().collapseToEnd();
                scroll.update();
            }, 0);
        }
    };
    $('.mask-tel').mask(behavior, options);
    
    window.addEventListener("load", function () {
        pinBoxes = document.querySelectorAll('.pin-wrap > *');
        pinWrap = document.querySelector('.pin-wrap');
        if(pinWrap){
            pinWrapDimensions = pinWrap.getBoundingClientRect();
            pinWrapParentTop = $('.pin-wrap').parent().offset().top;
            pinWrapTop = $('.pin-wrap').offset().top;
            firstItemWidth = parseFloat($('.pin-wrap .item:first-of-type').width()) + parseFloat($('.pin-wrap .item:first-of-type').css('marginLeft'));
            normalItemWidth = parseFloat($('.pin-wrap .item:nth-child(2)').width()) + parseFloat($('.pin-wrap .item:nth-child(2)').css('marginLeft')) + parseFloat($('.pin-wrap .item:nth-child(2)').css('marginRight'));
            lastItemWidth = parseFloat($('.pin-wrap .item:last-of-type').width()) + parseFloat($('.pin-wrap .item:last-of-type').css('marginRight'));
            pinWrapTop = pinWrapDimensions.top;
            pinWrapWidth = pinWrap.offsetWidth;
            horizontalScrollLength = pinWrapWidth - window.innerWidth;

            if($(document).width() > 992 && $(document).width() > $(window).height()){
                horizontalScroll = gsap.to('.pin-wrap', {
                    scrollTrigger: {
                        pin: true,
                        scroller: pageContainer,
                        scrub: 0,
                        trigger: 'section.projects .section',
                        start: 'top top',
                        end: '+='+pinWrapWidth
                    },
                    x: -horizontalScrollLength,
                    ease: 'none'
                });

                $('section.projects .item').each((el, item) => {
                    gsap.to(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: 'center center',
                            end: () => '+=100',
                            containerAnimation: horizontalScroll,
                            onEnter: () => {
                                console.log($(item).index());
                                offsetTop = pinWrapTop;
                                if(!$(item).index()){
                                    for(i = 0;i <= $(item).index();i++){
                                        calc = parseFloat($(item).width()) + parseFloat($(item).css('marginLeft')) + parseFloat($(item).css('marginRight'));
                                        offsetTop = offsetTop + calc + calc/2;
                                    }
                                    scroll.stop();
                                    scroll.scrollTo(offsetTop, 300);
                                    setTimeout(()=>scroll.start(), 500);
                                }
                            },
                            onLeave: () => {
                                console.log($(item).index());
                                offsetTop = pinWrapTop;
                                if($(item).index()){
                                    for(i = 0;i <= $(item).index();i++){
                                        calc = parseFloat($(item).width()) + parseFloat($(item).css('marginLeft')) + parseFloat($(item).css('marginRight'));
                                        offsetTop = offsetTop + calc + calc/2;
                                    }
                                    scroll.stop();
                                    scroll.scrollTo(offsetTop, 300);
                                    console.log(offsetTop);
                                    setTimeout(()=>scroll.start(), 500);
                                }
                            }
                        }
                    });
                });
        
                maxScroll = ScrollTrigger.maxScroll(window);
        
                ScrollTrigger.addEventListener('refresh', () => scroll.update());
        
                ScrollTrigger.refresh();

            }
        }
    
    });
    $('.effect').each(function(i, el){
        attrDelay = $(el).data('delay') != undefined ? parseInt($(el).data('delay')) : 0;
        count = attrDelay;
        $(el).find('span.line').each(function(i, let){
            if($(el).data('type') == 'line'){
                count = attrDelay;
            }
            text  = $(let).html();
            arr   = text.split(' ');
            html  = '';
            total = arr.length;
            arr.forEach(function(val, i){
                count++;
                delay = count / 10;
                if(val == '~'){
                    html += '<strong>';
                }
                if(val != '~' && val != '^'){
                    html += '<span class="float-start letter" data-scroll style="transition-delay: '+delay+'s">'+(i + 1 != total ? val+"&nbsp;" : val)+'</span>';
                }
                if(val == '^'){
                    html += '</strong>';
                }
            });
            $(let).html(html);
        });
    });
    
    addedDark = 0;
    $(document).on('click', '.menu-main:not(.open):not(.close)', function(){
        if($(this).hasClass('open')) return false;
        if(!$('body').hasClass('menu')){
            scroll.stop();
            $(this).addClass('open');
        } else {
            scroll.start();
            $(this).removeClass('open');
        }
        $('body').toggleClass('menu');
        setTimeout(function(){
            $('div.menu').fadeToggle().toggleClass('open');
        }, 600);
        if(!$('body').hasClass('dark')){
            // addedDark = 1;
            // setTimeout(function(){
            //     $('body').addClass('dark');
            // }, 600);
        } else {
            // if(addedDark){
            //     $('body').removeClass('dark');
            // }
        }
    });
    $(document).on('click', '.menu-main.close', function(){
        scroll.start();
        $('.menu-main').removeClass('open');
        $('div.menu').fadeOut().removeClass('open');
        $('body').removeClass('menu');
        // if(addedDark){
        //     $('body').removeClass('dark');
        // }
    });
// }

$(document).on('click', 'div.card', function(){
    $(this).toggleClass('active')
    scroll.update()
});

let swiperStories = new Swiper('.page-otiokaio-where .swiper', {
    loop: true,
    spaceBetween: 32,
    slidesPerView: 1.2,
    speed: 5000,
    autoplay: {
        delay: 1
    },
    allowTouchMove: false,
    disableOnInteraction: true,
    breakpoints: {
        992: {
            slidesPerView: 3
        },
        1200: {
            slidesPerView: 4.2
        }
    }
});

let swiperRoutine = new Swiper('.page-otiokaio-watch .swiper', {
    loop: true,
    spaceBetween: 32,
    slidesPerView: 1.85,
    speed: 10000,
    autoplay: {
        delay: 1
    },
    allowTouchMove: false,
    disableOnInteraction: true
});

function scripts(){
    let swiperStories = new Swiper('.page-otiokaio-where .swiper', {
        loop: true,
        spaceBetween: 32,
        slidesPerView: 4.2,
        speed: 5000,
        autoplay: {
            delay: 1
        },
        allowTouchMove: false,
        disableOnInteraction: true
    });

    let swiperRoutine = new Swiper('.page-otiokaio-watch .swiper', {
        loop: true,
        spaceBetween: 32,
        slidesPerView: 1.85,
        speed: 10000,
        autoplay: {
            delay: 1
        },
        allowTouchMove: false,
        disableOnInteraction: true
    });
    $('.effect').each(function(i, el){
        attrDelay = $(el).data('delay') != undefined ? $(el).data('delay') : 0;
        count = attrDelay;
        $(el).find('span.line').each(function(i, let){
            if($(el).data('type') == 'line'){
                count = 0;
            }
            text  = $(let).html();
            arr   = text.split(' ');
            html  = '';
            total = arr.length;
            arr.forEach(function(val, i){
                count++;
                delay = count / 10;
                if(val == '~'){
                    html += '<strong>';
                }
                if(val != '~' && val != '^'){
                    html += '<span class="float-start letter" data-scroll style="transition-delay: '+delay+'s">'+(i + 1 != total ? val+"&nbsp;" : val)+'</span>';
                }
                if(val == '^'){
                    html += '</strong>';
                }
            });
            $(let).html(html);
        });
    });
    const textarea = $('.textarea');
    if(textarea.length){
        textarea.find('span').each(function(i, el){
            if(i == 0){
                $(el).attr('contenteditable', true).addClass('empty');
            }
            $(el).attr('contenteditable', true).addClass('editable');
        });
    }
    textarea.not(textarea.find('span')).not('select').click(function(){
        if(!textarea.find('span.empty').first().html().length){
            textarea.find('span.empty').first().focus();
        }
    });
    textarea.trigger('click');
    textarea.find('span').on('keydown', function(e){
        if(e.keyCode == 32){
            $(this).html($(this).html()+'\xA0');
            $(this).focus();
            scroll.update();
            return false;
        }
        if($(this).html().length){
            $(this).removeClass('empty');
        }
    });
    textarea.find('span').focus(function(i, el){
        $(el).focus();
        if($(this).hasClass('empty')){
            $(this).html('');
        }
        setTimeout(function(){
            document.execCommand('selectAll');
            document.getSelection().collapseToEnd();
            scroll.update();
        }, 0);
    });
    $(document).on('change', '.textarea select', function(){
        var text = $(this).find('option:selected').text()
        var $aux = $('<select/>').append($('<option/>').text(text))
        $(this).after($aux)
        $(this).width($aux.width())
        $aux.remove()
        console.log('aa')
      }).change()
    textarea.find('span').keypress(function(e){
        if(e.which == 13 && $(this).html().length){
            e.preventDefault();
            $(this).next()[0].focus({ preventScroll: true });
        }
    });
}

if($('.page-otiokaio-hero, .page-learn').length){
    $('body.dark header').addClass('otiokaio');
}

$(document).on('click', 'section.page-learn div.row > div .in:not(.active)', function(){
    $(this).addClass('active');
    $('header').fadeOut();
    if($(document).width() < 992){
        $('section.page-learn div.row > div .in:not(.active)').parent().fadeOut(0);
        scroll.update();
        scroll.scrollTo(0, {
            duration: 0
        });
        scroll.stop();
    }
});
$(document).on('click', 'section.page-learn div.row > div .in .close', function(){
    $(this).closest('.in').removeClass('active');
    $('header').fadeIn();
    if($(document).width() < 992){
        $('section.page-learn div.row > div .in:not(.active)').parent().fadeIn(0);
        scroll.start();
        scroll.update();
    }
});

if($('section.page-project-hero').length){
    $('body').addClass('white-page')
}
if($(document).width() > 992){
$(document).on('mousemove', function(e){
    let selector = $('.page-otiokaio-hero .img');
    let img = selector.find('img');
    let width = selector.width();
    let height = selector.height();
    let posY = e.pageY + scrollY;
    let posX = e.pageX;
    let calcY = posY - height/2;
    let calcX = posX - width/2;
    let calcYOpposite = posY;
    let calcXOpposite = posX;
    let limit = selector.closest('.page-otiokaio-hero');
    let limitY = limit.height();
    let limitX = limit.width();
    selector.addClass('active');
    if(posY > 0 && calcYOpposite <= limitY){
        selector.css({'marginTop':calcY});
        img.css({'marginTop':calcY*-1});
    }
    if(posX > 0 && calcXOpposite <= limitX){
        selector.css({'marginLeft':calcX});
        img.css({'marginLeft':calcX*-1});
    }
    if(posY > limitY){
        selector.removeClass('active');
    }
});
}

// barba.init();
// barba.hooks.after(() => {
//     scripts();
//     pinBoxes = document.querySelectorAll('.pin-wrap > *');
//     pinWrap = document.querySelector('.pin-wrap');
//     if(pinWrap){
//         pinWrapDimensions = pinWrap.getBoundingClientRect();
//         pinWrapParentTop = $('.pin-wrap').parent().offset().top;
//         pinWrapTop = $('.pin-wrap').offset().top;
//         firstItemWidth = parseFloat($('.pin-wrap .item:first-of-type').width()) + parseFloat($('.pin-wrap .item:first-of-type').css('marginLeft'));
//         normalItemWidth = parseFloat($('.pin-wrap .item:nth-child(2)').width()) + parseFloat($('.pin-wrap .item:nth-child(2)').css('marginLeft')) + parseFloat($('.pin-wrap .item:nth-child(2)').css('marginRight'));
//         lastItemWidth = parseFloat($('.pin-wrap .item:last-of-type').width()) + parseFloat($('.pin-wrap .item:last-of-type').css('marginRight'));
//         pinWrapTop = pinWrapDimensions.top;
//         pinWrapWidth = pinWrap.offsetWidth;
//         horizontalScrollLength = pinWrapWidth - window.innerWidth;

//         if($(document).width() > 992 && $(window).width() > $(window).height()){
//             horizontalScroll = gsap.to('.pin-wrap', {
//                 scrollTrigger: {
//                     pin: true,
//                     scroller: pageContainer,
//                     scrub: 0,
//                     trigger: 'section.projects .section',
//                     start: 'top top',
//                     end: '+='+pinWrapWidth
//                 },
//                 x: -horizontalScrollLength,
//                 ease: 'none'
//             });

//             $('section.projects .item').each((el, item) => {
//                 gsap.to(item, {
//                     scrollTrigger: {
//                         trigger: item,
//                         start: 'center center',
//                         end: () => '+=100',
//                         containerAnimation: horizontalScroll,
//                         onEnter: () => {
//                             console.log($(item).index());
//                             offsetTop = pinWrapTop;
//                             if(!$(item).index()){
//                                 for(i = 0;i <= $(item).index();i++){
//                                     calc = parseFloat($(item).width()) + parseFloat($(item).css('marginLeft')) + parseFloat($(item).css('marginRight'));
//                                     offsetTop = offsetTop + calc + calc/2;
//                                 }
//                                 scroll.stop();
//                                 scroll.scrollTo(offsetTop, 300);
//                                 setTimeout(()=>scroll.start(), 500);
//                             }
//                         },
//                         onLeave: () => {
//                             console.log($(item).index());
//                             offsetTop = pinWrapTop;
//                             if($(item).index()){
//                                 for(i = 0;i <= $(item).index();i++){
//                                     calc = parseFloat($(item).width()) + parseFloat($(item).css('marginLeft')) + parseFloat($(item).css('marginRight'));
//                                     offsetTop = offsetTop + calc + calc/2;
//                                 }
//                                 scroll.stop();
//                                 scroll.scrollTo(offsetTop, 300);
//                                 console.log(offsetTop);
//                                 setTimeout(()=>scroll.start(), 500);
//                             }
//                         }
//                     }
//                 });
//             });
    
//             maxScroll = ScrollTrigger.maxScroll(window);
    
//             ScrollTrigger.addEventListener('refresh', () => scroll.update());
    
//             ScrollTrigger.refresh();

//         }
//     }
//     $('.menu-main.close').trigger('click');
//     scroll.update();
//     scroll.scrollTo(0, {duration: 0});
// });

// barba.hooks.afterLeave((data) => {
//     // Set <body> classes for "next" page
//     var nextHtml = data.next.html;
//     var response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml)
//     var bodyClasses = $(response).filter('notbody').attr('class')
//     $("body").attr("class", '');
//     $("body").attr("class", bodyClasses);
//     scroll.update();
// });
// barba.hooks.afterEnter((data) => {
//     setTimeout(function(){
//         if($('.page-otiokaio-hero').length){
//             $('header').addClass('otiokaio');
//         } else if($('.page-learn').length){
//             $('header').addClass('otiokaio');
//         } else {
//             $('header').removeClass('otiokaio');
//         }
//     }, 500)
// });

// $(window).load(function(){
// });
$(document).ready(function(){
    scroll.update();
    // setTimeout(() => {
    //     scroll.update();
    // }, 500);
});

var PageStart = 0;
$.fn.page = function(options, selector){
	var config = $.extend({
		'start': 0,
		'regenerate': function(){
			return false;
		},
		'reload': false,
		'location': false
	}, options);
	var page = {};
	page.url = function(link, prop){
		if(selector.length){
			if(PageStart == 0){
				PageStart++;
				$.get(link, function(data){
					if($(document).scrollTop() > 0){
						$(document).scrollTop('0');
					}
					if($(data).filter(selector)){
						var main = $(data).filter(selector),
							html = main.html(),
							title = $(data).filter('title').html();
						$(selector).html(html);
                        scroll.scrollTo(0, {
                            duration: 0
                        });
                        scroll.update();
						document.title = title;
						if(link.indexOf('#') > -1){
							var a = link.split('#')[1];
							if($('#'+a).length > 0){
								$(document).scrollTop(0);
							}
						}
					} else {
						$(document).html(data);
					}
					if(!prop){
						history.pushState({state: 'new'}, '', link);
					}
					config.regenerate();
					PageStart--;
				});
			}
		} else {
			console.log("The selector doesn't exist");
		}
	}
	if(config.reload == true){
		page.url(window.location.pathname);
	}
	if(config.location !== false){
		page.url(config.location);
	}
	$(window).on('popstate', function(){
		page.url(window.location.href, 'p');
	});
	$('a[href][data-ajax]:not([href^="#"]):not([target])').click(function(e){
		e.preventDefault();
		var a = $(this).attr('href');
		page.url(a);
	});
}

let ajaxProcessing = false;
$(document).on('submit', '.form-ajax', function(e){
    e.preventDefault();
    const form = $(this);
    const textarea = form.find('.textarea');
    const formData = {};
    textarea.find('span').each(function(i, el){
        const name = $(el).data('field');
        const value = $(el).html();
        formData[name] = value;
    });
    textarea.find('select').each(function(i, el){
        const name = $(el).data('field');
        const value = $(el).val();
        formData[name] = value;
    });
    const url = form.attr('action');
    if(!ajaxProcessing){
        $.ajax({
            type: 'POST',
            url: ajax_url+url,
            data: formData,
            dataType: 'json',
            beforeSend: () => {
                ajaxProcessing = true;
                form.find('[type="submit"]').prop('disabled', true);
                form.animate({'opacity':'0.5'});
            },
            success: data => {
                scroll.scrollTo(0);
                form.animate({'opacity':'1'});
                form.fadeOut(0);
                form.parent().find('.feedback').fadeIn(0);
            }
        });
    }
});

$('main').page({
    'regenerate': function(){
        scripts();
    }
}, 'main');

$(window).on('load', function(){
    scroll.update();
    setTimeout(() => {
        scroll.update();
    }, 500);
})

$('[data-scroll-container]').imagesLoaded({background: true}, function(){
    scroll.update();
});