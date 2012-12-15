/* sets up sliding right rail modules */
function initSlideRail(){
	$('.moduleHeader').click(function(){
		var module = $(this).parent('.module'),
			isopen = $(module).hasClass('open'),
			_body = $(this).next('.moduleBody');
		if(isopen){
			$(module).removeClass('open')
				.addClass('closed');
			$(_body).slideUp();
		}else{
			$(module).removeClass('closed')
				.addClass('open');
			$(_body).slideDown();
		}
	});
}

/* Custom callback for the digg module */
diggwb = function(obj){
	var diggList = $('<ul></ul>');
	if(obj.stories){
		for(var i = 0; i < obj.stories.length; i++){
			var diggItem = $('<li></li>'),
				diggNumWrapper = $('<span class="diggsOuter"></span>').appendTo(diggItem),
				diggNum = $('<span class="diggs"></span>').appendTo(diggNumWrapper),
				diggLinkWrapper = $('<span class="link"></span>').appendTo(diggItem),
				diggLink = $('<a></a>').attr('target','_blank').attr('href',unescape(obj.stories[i].href)).text(obj.stories[i].title).appendTo(diggLinkWrapper);
			if(obj.stories[i].diggs > 10000){
				obj.stories[i].diggs = Math.floor(obj.stories[i].diggs / 1000) + 'K+';
			}
			diggNum.text(obj.stories[i].diggs);
			$('<div class="clear"></div>').appendTo(diggItem);
			diggItem.appendTo(diggList);
		}
		$('#diggBody .stories').html(diggList);
	} else {
		$('#diggModule').remove();
	}
}

/* Shifts top stories on channel pages */
function shiftStories(){
	var ph = 545,
		th = $('#channelTopStories').height();
	if(th > ph){
		var h = $('#topStories img').height();
		$('#topStories .story').each(function(i){
			var nh = h + $(this).height();
			if(nh > ph){
				$('#topStories .story').eq(i-1).addClass('last');
				$(this).nextAll().andSelf().hide();
				return;
			}
			h = nh;
		});
	}
}

function shiftStoriesHP(){
	var ph = 339,
		th = $('#latest_stories').height();
	if(th > ph){
		var h = $('#stories #hed').height();
		$('#stories .story').each(function(i){
			var nh = h + ($(this).height() - 16);
			if(nh > ph){
				$('#stories .story').eq(i-1).addClass('last');
				$(this).nextAll().andSelf().hide();
				return;
			}
			h = (nh + 16);
		});
	}
}

/* sets up bgiframe for nav dropdowns */
function initBGIframe(){
	$('.nav_section').hover(function(){
		$(this).children('.dd_container').bgiframe();
	});
}

/* Text Size */
function textSize(size){
	$('.resizeable, .resizeable *').css('font-size',size);
}

/* Image rollovers */
$(function(){
	$('img.over').mouseover(function(){
		if(!this.src.match('-over')){
			var file = this.src.substr(0,this.src.length-4),
				ext = this.src.substr(this.src.length-4,this.src.length);
			file += '-over';
			this.src = file + ext;
		}
	})
	.mouseout(function(){
		if(this.src.match('-over')){
			var source = this.src.replace('-over','');
			this.src = source;
		}
	});
});

/* prevent exec script in search box */
$(document).ready(function(){
            
	$("form[action='/search/'] a")
	.attr("href","#")
	.click(function(e){
		e.preventDefault();
		$(this).parents("form").submit();    
	});

	$("form[action='/search/']").submit(function(){
		$input = $("input[name=q]",this);
		//get unsafe search string 
		var s = $input.val();
		//replace
		s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
		//set safe search string 
		$input.val(s);
	});

});

$(function() {		/* lazy images */
    var b, e, lazyLoad;
    b = $(window);
    e = $('.lazyImage');		
    lazyLoad = function () {
        e = $('.lazyImage');		
		$.each(e, function () { 
            var c = $(this),
                a, d;
            a = c.offset();
            d = c.data();	
            if (!d.loaded && a.top <= b.height() + b.scrollTop()) {
		        a = new Image, a._parent = c, a.onload = function () { // IE8 fix: a._parent refers to the correct parent for the image, so that the image.onload callback knows which element to append the image to
                    this._parent.prepend(this);
                    $(this).fadeIn();
                    $(this).css('display', 'block');
                    this._parent.removeClass('lazyImage')
                }, $.extend(a, d), c.data('loaded', !0), e = $('.lazyImage');
            }
        });
    };
    lazyLoad();
    b.scroll(lazyLoad);
    b.resize(lazyLoad);
    window.lazyLoad = lazyLoad;
});