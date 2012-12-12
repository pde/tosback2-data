// buzzfeed
var BF_NO_QS = true;
(function( ){
    BF_WIDGET_JS=document.createElement('script'); BF_WIDGET_JS.type="text/javascript";
    BF_WIDGET_SRC="http://ct.buzzfeed.com/wd/UserWidget?u=slate&to=1&or=vb&wid=1&cb=" + (new Date()).getTime();
    jQuery(document).ready(function () {
        setTimeout(function() {document.getElementById('BF_WIDGET_1').appendChild(BF_WIDGET_JS);BF_WIDGET_JS.src=BF_WIDGET_SRC},1);
    });
})();
//MSN Header Handler 
(function(){
	if(document.referrer.indexOf('msn.com') >= 0 && !$.cookie('sl-msn-referrer')){
		$.cookie('sl-msn-referrer', 'true', {path:'/'});
	}
	if($.cookie('sl-msn-referrer')){
		$.getScript('http://az29590.vo.msecnd.net/prod/slate/en-us/enusslimheader', function () {
			$("#divmsn_enusslimheader").html(msn_enusslimheader().markup);
		});
		$('.msn-container').css('display','block');
	}
})();

//Reddit Handler 
(function(){
	if(document.referrer.indexOf('reddit.com') >= 0 && !$.cookie('sl-reddit-referrer')){
		$.cookie('sl-reddit-referrer', 'true', {path:'/'});
	}
})();

//External visitor tracker 
(function(){
	if(document.referrer.length > 0 && document.referrer.match(/^https?:\/\/[a-zA-Z.]*\.slate.com\//) == null && !$.cookie('sl-ext-referrer')){
		$.cookie('sl-ext-referrer', 'true', {path:'/'});
	}
	if($.cookie('sl-ext-referrer')){
		$('.sl-viral-container').css('display','block');
		$('.sl-viral-container').track();
	}
})();

// twitter loader
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

// Visual Revenue Script
var _vrq = _vrq || [];
_vrq.push(['id', 119]);
_vrq.push(['automate', true]);
_vrq.push(['track', function(){}]);
(function(d, a) {
	var s = d.createElement(a),
	x = d.getElementsByTagName(a)[0];
	s.async = true;
	s.src = 'http://a.visualrevenue.com/vrs.js';
	x.parentNode.insertBefore(s, x);
})(document, 'script');

$(document).ready(function() {
	//Script for external links
	$("a[href^='http']:not([href*='slate.com'])").each(function(){
		//instead of "slate.com" we may use location.hostname
		var noNewTab = (this.getAttribute('class') != undefined) &&
		(this.getAttribute('class').indexOf('sl-img-no-new-tab') > -1);
		if((this.href.indexOf('doubleclick.net') == -1) &&	!noNewTab) {
			//console.log("href----" + this.getAttribute('href'));
			$this = $(this);
			if(!$this.has('target') || $this.attr('target') === undefined) {
				$this.attr('target', '_blank');
			}
		}
	});
});

