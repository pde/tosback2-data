//Specific section tracking used on homepage DO NOT REMOVE!!!
$(function(){
	var appendClickTracker = function(url, parameter) {
		if (url) {
			var newURL;
			var argIndex = url.indexOf("?");
			var anchorIndex = url.indexOf("#");
			
			var objQueryStringAmp = [];
			var objQueryStringAnchor = [];
			var objQueryStringAlone = [];
			
			objQueryStringAmp.push("?click=");
			objQueryStringAmp.push(parameter);
			objQueryStringAmp.push("&");
			var queryString = objQueryStringAmp.join('');
			
			objQueryStringAnchor.push("?click=");
			objQueryStringAnchor.push(parameter);
			objQueryStringAnchor.push("#");
			var queryStringAnchor = objQueryStringAnchor.join('');
			
			objQueryStringAlone.push("?click=");
			objQueryStringAlone.push(parameter);
			var queryStringAlone = objQueryStringAlone.join('');
			var objUrlAlone = [];
			if (argIndex >= 0) {
				newURL = url.replace("?",queryString);
			} else if (anchorIndex >= 0) {
				newURL = url.replace("#",queryStringAnchor);
			} else {
				url = url.replace(" ", "");
				objUrlAlone.push(url);
				objUrlAlone.push(queryStringAlone);
				newURL = objUrlAlone.join('');
			}
			return newURL;
		} else {
			return false;
		}
	};
	
	$(".hbz_lefttop a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "lefttop");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$(".hbz_leftmiddle a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "leftmiddle");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$(".hbz_leftbottom a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "leftbottom");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$(".hbz_spotlight_rightcolumn .hbz_report_heading a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "blog");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$(".hbz_spotlight_rightcolumn .hbz_report_links a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "blog");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$("#hbz_body .main1 a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "main1");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$("#hbz_body .main2 a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "main2");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$("#hbz_body .main3 a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "main3");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$("#hbz_body .main4 a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "main4");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$("#hbz_body .main5 a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "main5");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$("#hbz_body .main6 a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "main6");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
	$("#hbz_body .main7 a").click(function(){
		var url = appendClickTracker($(this).attr("href"), "main7");
		if (url) {
			window.location.href = url;
		}
		return false;
	});
});

//Gives all Buttons with Class ".over" a hover
$(function() {
	$("img.over")
		.mouseover(function() {
		var src = $(this).attr("src").match(/[^\.]+/) + "-over.gif";
		$(this).attr("src", src);
	})
	.mouseout(function() {
		var src = $(this).attr("src").replace("-over", "");
		$(this).attr("src", src);
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

/* Remove Bottom Border on last element in nav dropdown */
$(function() {
        var navs = "#content_container #nav .dd_outer ul.f li:last, #content_container #nav .dd_outer ul.b li:last, #content_container #nav .dd_outer ul.c li:last";

        $(navs).addClass("last");
        $(navs).prev().addClass("sec_last");

        $(".last").mouseover(function(){
                $(".sec_last").removeClass("add_border").addClass("no_border");
        });
        $(".last").mouseout(function(){
                 $(".sec_last").removeClass("no_border").addClass("add_border");
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
                a = new Image, $.extend(a, d), a.onload = function () {
                    c.prepend(this);
                    $(this).fadeIn();
                    $(this).css('display', 'block');
                    c.removeClass('lazyImage')
                }, c.data('loaded', !0), e = $('.lazyImage')
            }
        })
    };
    lazyLoad();
    b.scroll(lazyLoad);
    b.resize(lazyLoad);
    window.lazyLoad = lazyLoad;
});