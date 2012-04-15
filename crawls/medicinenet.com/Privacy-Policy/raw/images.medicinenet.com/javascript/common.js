function popupWarning() {
    var a = window.open('/script/main/popup_privacy.asp', 'privacy_window', 'width=325,height=175,resizable=no,toolbar=no,left=10,top=10');
    if (a) { a.focus() }
}

function OODomainCookieWrite(sDomain, sCookieName, sCookieValue, sExpireDate) {
    //alert('cookie=' + sCookieValue);
    //alert('date=' + sExpireDate);
    if (sExpireDate != null && sExpireDate!='')
        document.cookie = escape(sCookieName) + '=' + escape(sCookieValue) + '; expires=' + (sExpireDate) + '; domain='+ sDomain +'; path=/';    
    else
        document.cookie = escape(sCookieName) + '=' + escape(sCookieValue) + '; domain=' + sDomain + '; path=/';

    //alert(OODomainCookieRead(sCookieName));
}
function OODomainCookieRead(cookieName) {
    var exp = new RegExp(escape(cookieName) + "=([^;]+)");
    if (exp.test(document.cookie + ";")) {
        exp.exec(document.cookie + ";");
        return unescape(RegExp.$1);
    }
    else return false;
}

//ToolTip Script
this.tooltip = function(){	
	/* CONFIG */		
		xOffset = 10;
		yOffset = 20;		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result		
	/* END CONFIG */		
	$("a.tooltip").hover(function(e){											  
		this.t = this.title;
		this.title = "";									  
		$("body").append("<p id='tooltip'>"+ this.t +"</p>");
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.css('opacity','0.8')
			.fadeIn("fast");
    },
	function(){
		this.title = this.t;		
		$("#tooltip").remove();
    });	
	$("a.tooltip").mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
};

$(document).ready(function() {

	//Image Preview
	tooltip();

});
