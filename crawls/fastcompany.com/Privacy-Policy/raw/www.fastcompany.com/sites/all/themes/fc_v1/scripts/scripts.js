$(document).ready(function() {
    $('.expand a span').bind('click',function() {
        var dropdown = $(this).parents('.expand');

        if(dropdown.hasClass('visible')) {
            dropdown.removeClass('visible').children('.expanded').slideUp(100);
        } else {
            $('.expand').removeClass('visible').children('.expanded').hide();
            dropdown.addClass('visible').children('.expanded').slideDown(100);
        }
    });

    /*$('.drop.expand a span').bind('mouseover', function() {
        var dropdown = $(this).parents('.expand');

        $('.drop.expand').removeClass('visible').children('.expanded').hide();
        dropdown.addClass('visible').children('.expanded').slideDown(100);
    });

    $('.drop .expanded').bind('mouseout', function() {
        $(this).slideUp(300);
    });*/
});
