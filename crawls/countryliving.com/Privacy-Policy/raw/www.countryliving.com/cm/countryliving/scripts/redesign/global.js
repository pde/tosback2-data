// JavaScript Document

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
	
/* prevent exec script in search box */	
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