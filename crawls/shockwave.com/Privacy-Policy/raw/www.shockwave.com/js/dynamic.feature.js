$(document).ready(function(){
    var nickFamily = $('.slide').hasClass('slideFamily');
    i=0;
    var selection = $('thumbnail img').is('clicked');
    $('.thumbnails img').hover(function(){
       $(this).css({
          cursor: 'pointer'
       }, function(){
           cursor: 'default'
       });
    });
    var container = $('.container img').map(function(){
        return this.className;
    }).get();
    var thumbs = $('.thumbnails img').map(function(){
        return this.className;
    }).get();
    slideFX(thumbs[0], container[0]);
    function slideFX(thumbnails, slide){
        if((container[i] === undefined) || container[i] =='appear1'){
            i=0;
        }
        if(nickFamily){
            if($.browser.webkit){
                $('.' + container[i] + '').css({ 'top' : '95px' });
            } else {
                $('.' + container[i] + '').css({ 'top' : '85px' });
            }
        }
        FX = setTimeout("$('." + container[i] + "').fadeIn(1000).delay(6000).fadeOut(1000);",0);
        fadeFX = setTimeout(nextFX, 8000);
        thumbFX();
//        click function behavior
        $('.thumbnails img').click(function(){
            var a = $(this).attr('value');
            i=a;
            clearTimeout(fadeFX);
            clearTimeout(FX);
            $('.container img').hide();
            $('.' + container[i] + '').show();
            slideFX(i,i);
        });
    }

    function thumbFX(){
        var genrepage = $('.slide').hasClass('slideGenre');
        var homepage = $('.clearfix').hasClass('slideShowHome');

        if(genrepage && !nickFamily){
            if ($.browser.webkit){
                if(i==1){
                    $('.slide').css({ 'top' : '162px' });
                } else if (i==2){
                    $('.slide').css({ 'top' : '230px' });
                } else if (i==3){
                    $('.slide').css({ 'top' : '299px' });
                } else {
                    $('.slide').css({ 'top' : '92px' });
                }
            } else {
               if(i==1){
                    $('.slide').css({ 'top' : '165px' });
                } else if (i==2){
                    $('.slide').css({ 'top' : '233px' });
                } else if (i==3){
                    $('.slide').css({ 'top' : '298px' });
                } else {
                    $('.slide').css({ 'top' : '95px' });
                }
            }
        // } else if(nickFamily){
        //    if ($.browser.webkit){
        //        if(i==1){
        //            $('.slide').css({ 'top' : '140px' });
        //        } else if (i==2){
        //            $('.slide').css({ 'top' : '213px' });
        //        } else if (i==3){
        //            $('.slide').css({ 'top' : '286px' });
        //        } else {
        //            $('.slide').css({ 'top' : '67px' });
        //        }
        //    } else {
        //       if(i==1){
        //            $('.slide').css({ 'top' : '138px' });
        //        } else if (i==2){
        //           $('.slide').css({ 'top' : '215px' });
        //        } else if (i==3){
        //            $('.slide').css({ 'top' : '287px' });
        //        } else {
        //            $('.slide').css({ 'top' : '63px' });
         //       }
         //   }
        } else {
            // online home and download home
             if ($.browser.webkit){
                if(i==1){
                    $('.slide').css({ 'top' : '75px' });
                } else if (i==2){
                    $('.slide').css({ 'top' : '148px' });
                } else if (i==3){
                    $('.slide').css({ 'top' : '214px' });
                } else {
                    $('.slide').css({ 'top' : '8px' });
                }
            } else {
                if(i==1){
                    $('.slide').css({ 'top' : '67px' });
                } else if (i==2){
                    $('.slide').css({ 'top' : '135px' });
                } else if (i==3){
                    $('.slide').css({ 'top' : '204px' });
                } else {
                    $('.slide').css({ 'top' : '2px' });
                }
            }
        }
    }

    function nextFX(){
        i++;
        slideFX(i,i);
    }
});