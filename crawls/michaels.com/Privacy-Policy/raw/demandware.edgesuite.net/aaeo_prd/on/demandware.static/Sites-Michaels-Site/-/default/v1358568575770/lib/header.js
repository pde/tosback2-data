$(document).ready(function(){
    // display drop down off the main navigation
    $('#section-nav-main ul li.dropdown').hoverIntent(
        function(){
            $(this).find('.sub-nav').fadeIn(200);
        },
        function(){
            $(this).find('.sub-nav').fadeOut(200);
        }
    )
    
    // display slide out off the sub menu
    $('li.slideout, li.slideout ul').hover(
        function(){
        	
            var p = $(this),
            position = p.position(),
            idx = $('.sub-nav li.slideout').index($(this)),
            idxLen = $('.sub-nav li.slideout').length,
            tmpW = $(this).find('ul').width();
            //alert(idx);
            if (idx > (idxLen - 3) ) {
                var tmpSpace = (idx - 12) * 36;
                $(this).find('ul').css({'top':'-'+tmpSpace+'px'}).show().animate({'right':'-'+tmpW+'px'},300, function(){
                    $(this).css({'z-index':999});
                });
            } else {
                $(this).find('ul').show().animate({'right':'-'+tmpW+'px'},300, function(){
                    $(this).css({'z-index':999});
                });
            }
        },
        function(){
            $(this).find('ul').hide().css({'z-index':-1, 'right':'0px'});
        }
    )
    
    // change background color for catigories
    $('#section-nav-main .sub-nav li:not(:first-child)').hover(
        function(){
            $(this).css({'background':'#e7f5f6'});
        },
        function(){
            $(this).css({'background':'#fff'});
        }
    )
    
    // change background color for slide out catigories
    $('#section-nav-main .sub-nav li ul li').hover(
        function(){
            $(this).css({'background':'#8aacaf'});
        },
        function(){
            $(this).css({'background':'#97c4c7'});
        }
    )
    
    
    $('.nav-cards').mouseleave(function() {
    	$('#section-nav-main ul li.nav-cards .sub-nav').css('display','none');
    	});
})