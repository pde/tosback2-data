// JavaScript Document
/* overflow hide on channels */
function hideChannelOverflow(){
	var max_height = 235; //hide articles when this height is exceededa
	var tot_height = 0;
	for(i=0;i<document.getElementById('recentItems').getElementsByTagName('li').length;i++){
		tot_height += document.getElementById('recentItems').getElementsByTagName('li')[i].offsetHeight;
		if(tot_height>max_height){
			document.getElementById('recentItems').getElementsByTagName('li')[i].style.display = "none";
		}
	}
}
/* Image rollover */
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

function loadPage(list) {

  location.href=list.options[list.selectedIndex].value

}

function reportingAbuse(comment_id){
	if (!!mag_user.logged_in){
	  var id = comment_id;
	  var popWin = window.open('/comments/report-this?comment_id='+id,'popForm','width=450,height=330');
	  popWin.focus();
	} else {
	  var id = comment_id;
	  var url = document.URL;
	  //alert(url);
	  var popWin = window.open('/comments_report_abuse_login?comment_id='+id+'&pUrl='+url,'popForm','width=450,height=330,resizable=1');
	  popWin.focus();
	}
}

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
                a = new Image, a.onload = function () {
                    c.prepend(this);
                    $(this).fadeIn();
                    $(this).css('display', 'block');
                    c.removeClass('lazyImage')
                }, $.extend(a, d), c.data('loaded', !0), e = $('.lazyImage')
            }
        })
    };
    lazyLoad();
    b.scroll(lazyLoad);
    b.resize(lazyLoad);
    window.lazyLoad = lazyLoad;
});