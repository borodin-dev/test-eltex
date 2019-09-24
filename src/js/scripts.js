$(document).ready(function () {
    (function() {
        var swInstance = new ScrollWatch({
            watchOnce: true
        });
    })();

    /* iPhone Slider */
    $('.owl-carousel').owlCarousel({
        stagePadding: 0,
        items: 2,
        margin:15,
        loop:true,
        center: true,
        dots: false,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });
});

function Slider(slider_class, animation_type, width) {
    var _ = this;
    _.slider_tag = $('.' + slider_class);
    _.slider_content = $(_.slider_tag).find('.slide-content');
    _.prev = $(_.slider_tag).find('.prev');
    _.next = $(_.slider_tag).find('.next');
    _.cursor = 0;
    $(_.prev).click(function () {
        if(_.cursor > 0) {
            _.cursor--;
            $(_.slider_content).animate({
                left: _.cursor*-width
            }, 500, animation_type, function(){
                if(_.cursor === 0) $(_.prev).addClass('grey-arrow');

                // when you click the prev arrow, the next arrow should be grey
                $(_.next).removeClass('grey-arrow');
            });
        }
    });
    $(_.next).click(function () {
        if(_.cursor < 3) {
            _.cursor++;
            $(_.slider_content).animate({
                left: _.cursor*-width
            }, 500, animation_type, function(){
                if(_.cursor === 3) $(_.next).addClass('grey-arrow');

                // when you click the next arrow, the prev arrow should be grey
                $(_.prev).removeClass('grey-arrow');
            });
        }
    });
}
if ($(window).width() >= 320 && $(window).width() < 479.98) {
    console.log('320');
    new Slider('container', 'linear', 153);
} else if ($(window).width() >= 480  && $(window).width() < 767.98){
    console.log('480');
    new Slider('container', 'linear', 222);
} else if ($(window).width() >= 768){
    console.log('768');
    new Slider('container', 'linear', 365);
} else {
    console.log('God Damn what is the resolution of your monitor???');
}
