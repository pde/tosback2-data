//var feedbackCSS = "/Calculate/css/feedback.layout.css";
//var popupCSS = "/Calculate/css/popup.layout.css";

//returns the value of the URL parameter specified. Handles = signs in the parameter nicely. 
function getURLParam(strParamName) {
  var strReturn = "";
  var strHref = window.location.href;
  var strQueryString,strQueryLower,aQueryString,aLower,iParam,aParam,icount;
  
  if ( strHref.indexOf("?") > -1 ) {
    strQueryString = strHref.substr(strHref.indexOf("?"));
    strQueryLower = strQueryString.toLowerCase();
    aQueryString = strQueryString.split("&");
    aLower = strQueryLower.split("&");
    for (iParam = 0;iParam < aLower.length;iParam++){
      if (aLower[iParam].indexOf(strParamName + "=") > -1 ) {
        aParam = aQueryString[iParam].split("=");
		if (aParam.length == 2) {
			strReturn = aParam[1];
		} else if (aParam.length > 2) {
			strReturn = aParam[1];
			for (icount = 2; icount < aParam.length; icount++) {
				strReturn = strReturn + "=" + aParam[icount];
			}
		}
        break;
      }
    }
  }
  return strReturn;
}

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 */
/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

jQuery.fn.redraw = function(){
  return this.each(function(){
    var tmp = this.style.display;
    this.style.display="none";
    var redrawFix = this.offsetHeight;
    this.style.display=tmp;
  });
};


// prevent jumping of result on iPad
 if (navigator.userAgent.indexOf("iPad") != -1) {
       // $("#content").css("margin-left","11px");
        $("#footer").css("right","85px");
        $("#linkbar").css("margin","0 auto 48px");
       // $("#header").css("margin","0 auto 42px");


// Resources menu, for iPad
$("#more-menu").click(function(e){$(this).css({"display":"block","overflow":"visible"}).children("ul").css({"display":"block","left":"-5px"})});
      $("body").click(function(e){if($(e.target).is(":not(#more-menu a)")){$("#more-menu").css({"display":"","overflow":""}).children("ul").css({"display":"","left":""});}});

$("#resources").click(function(e){$(this).css({"display":"block","overflow":"visible"}).children("ul").css({"display":"block"})});
      $("body").click(function(e){if($(e.target).is(":not(#resources a)")){$("#resources").css({"display":"","overflow":""}).children("ul").css({"display":""});}});


    //$("#i").css("width","470px");

    // ipad clear input button
    $("#i").keyup(function(){
        if( $("#i").val().length > 0 ) {
            $("#iClear").show();
        }
    }).click(function(){
        if( $("#i").val().length > 0 ) {
            $("#iClear").show();
        }
    }).blur(function(){
        setTimeout(function(){
            $("#iClear").hide();
        },100);
    });

    $("#iClear").click(function(){
        $("#i").val('').focus();
    });
 }



if ($.browser.msie) {
	var browsers = navigator.userAgent.toLowerCase().match( /.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)/ );
	var highestBrowser = 0;
	for (var i = 0; i < browsers.length; i++) {
		browsers[i] = parseInt(browsers[i]);
		
		if (!isNaN(browsers[i])) {
			highestBrowser = Math.max(highestBrowser, browsers[i]);
		}
	} 
	
	if (highestBrowser == 6) { // && $.browser.version == "6.0") {
		$.browser.version = "6.0";
		
		if ($.cookie('ie_six_error') == null) {
			//alert($.browser.version);
			var ie6error = "<div class=\"upgradebrowser\"><a href=\"#\" id=\"ie6errorclose\"></a><div>You are using Internet Explorer 6. Please note that some Wolfram|Alpha features require a more up-to-date browser, such as <a href=\"http://www.microsoft.com/windows/internet-explorer/default.aspx\" target=\"_blank\">Internet Explorer</a> 7+, <a href=\"http://www.mozilla.com/en-US/firefox/personal.html\" target=\"_blank\">Firefox</a> 3+, <a href=\"http://www.apple.com/safari/download/\" target=\"_blank\">Safari</a> 3+, <a href=\"http://www.opera.com/download/\" target=\"_blank\">Opera</a> 9+, etc.</div></div>";
			
			$("#calculate").after(ie6error);
			
			$("#ie6errorclose").click(function(e) {
				e.preventDefault();
				
				$(".upgradebrowser").remove();
				$.cookie('ie_six_error', 'hide', {domain: '.wolframalpha.com'});//, { expires: 90 });
			});
		} else {
			
		}
	}
}

var inputSeries = Math.floor(Math.random()*10+1);
var seriesPage = 1;
var escapedInput = "";

//converts plain-text input to thumbnail image code 
function imgEncode( str ){
// encodeURIComponent skips "~!*()'", so we include them here
  if (str.indexOf("|") != -1) {
    str = str.substring(0,str.length -2);
  }
  // fix for IE href attribute
  if ($.browser.msie && str.indexOf("http://" + window.location.hostname) != -1) {
    str = str.replace("http://" + window.location.hostname, "");
    }
  str = str.substring(10);

  //return "thumbnails/" + $.trim(str) + ".gif";
  //return "thumbnails/"+ encodeURIComponent($.trim(str)).replace(/!/g,'%21').replace(/\*/g,'%2A').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/'/g,'%27') +".gif";
   return "thumbnails/"+ encodeURIComponent($.trim(str)).replace(/!/g,'%21').replace(/\*/g,'%2A').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/'/g,'%27') +".gif";

}

function loadThumbnails() {
/* load the thumbnail images later in order to keep the front page
      smaller and use progressive enhancement */
   $(".thumbs a").each(function(){
      if ($(this).attr("href") != "") {
        $(this).append('<b class="framed"><img src="'+imgEncode($(this).attr("href"))+'" /><b class="frame"></b></b>');
      }
    });
}

/*--- onload ---*/
$(function(){
	if ($.browser.msie && $.browser.version == "6.0") {
		$("#more").hover(function() {
			$(this).addClass("hover");
		}, function() {
			$(this).removeClass("hover");
		});
	}

        if ($.browser.msie) {
	        $('#home a').click(function(e) {
                        e.preventDefault();
                        this.style.behavior = "url(#default#homepage)";
                        this.setHomePage("http://" + window.location.hostname);
                });
        }

	
	// display the corporate/professional lightbox on button click
	$("#corpprof").click(function(e) {
		e.preventDefault();
		if ($("#registerformContainer").length == 0) {
			$("#popanchor").append("<div id=\"registerformContainer\" class=\"hide\"></div>");
		}
		$("#registerformContainer").load("profform.html", function() {
			if (($.browser.msie && $.browser.version == "6.0") || 
				(navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
				$("#overlay")
					.css("width", "1600px")
					.css("height", "950px");
			}
			$("#overlay").removeClass("hide");
			$(this).removeClass("hide");
		});
	});
	
	// display the corporate/professional lightbox when page loads
	var pro = getURLParam("pro");
	if (pro != "") {
		$("#corpprof").trigger("click");
	}

	if ($.browser.msie && $.browser.version == "6.0") {
		$("#lblog").attr("src", "/images/ie6_blog_icon.gif");
		$("#lcommunity").attr("src", "/images/ie6_community_icon.gif");
		$("#lparticipate").attr("src", "/images/ie6_participate_icon.gif");
	}
	
	// show the iphone app advertisement
	/*if (navigator.userAgent.indexOf("iPhone") != -1) {
		if ($.cookie('iphone_app') == null) {
			$.cookie('iphone_app', null, {expires: 365, path: '/', domain: '.wolframalpha.com'});
			$("#popanchor").append("<div id=\"iphoneOverlay\"></div><div id=\"iphoneAppAdContainer\"><a id=\"closeIphoneAd\" href=\"\"></a><a id=\"downloadIphoneApp\" href=\"http://www.itunes.com/apps/wolframalpha\"></a></div>");
			$("#iphoneOverlay").css("height", $(document).height()).css("width", $(document).width());
			$("#closeIphoneAd").click(function(e) {
				e.preventDefault();
				$.cookie('iphone_app', 'hide', {expires: 7, path: '/', domain: '.wolframalpha.com'});
				$("#iphoneOverlay").remove();
				$("#iphoneAppAdContainer").remove();
			});
		}
	}*/
	
   // Experimental domain shifting code
//   $("#calculate").attr("action","http://www.devel"+Math.ceiling(Math.random()*5)+".wolframalpha.com/input/");
	
/*	if ($.browser.msie && $.browser.version == "6.0") {
		var ie6error = "<div class=\"upgradebrowser\"><div>Sorry... Wolfram|Alpha requires a more up-to-date web browser...<br />You can use <a href=\"http://www.microsoft.com/windows/internet-explorer/default.aspx\" target=\"_blank\">Internet Explorer</a> 7+, <a href=\"http://www.mozilla.com/en-US/firefox/personal.html\" target=\"_blank\">Firefox</a> 3+, <a href=\"http://www.apple.com/safari/download/\" target=\"_blank\">Safari</a> 3+, <a href=\"http://www.opera.com/download/\" target=\"_blank\">Opera</a> 9+, etc.</div></div>";
		
		$("#calculate").after(ie6error);
	}*/
	
    $("#inputs").one("mouseover",loadThumbnails);

    // Start the spinning icon if we are getting more data
    $("#spin").ajaxStart(function(){
        $(this).addClass("active");
        // disable the feedback form
        $("#tmpMessage").attr("disabled","disabled");
    }).ajaxStop(function(){
        $(this).removeClass("active");
        // enable the feedback form
        $("#tmpMessage").attr("disabled","");
    });

  // give focus to the input field if there is no current value for i
  //if($("#i").val() === ""){$("#i").focus();}

  /* if scripts are running, we assume the user wants to use asynchronous pods */
  $("input[name='asynchronous']").remove();


    $("#inputs ul.thumbs:last-child li:last-child a").css("color","#db0303");
    $("#tmpMessage").attr("disabled","");

    // Show large image howto
    $("#summary").click(function(e){ e.preventDefault();
	if ($.browser.msie && $.browser.version == "6.0") {
      $("body").append('<div id="about"><div class="popup"><a alt="close" class="close" href="/">close<img src="/images/ie6-close-home-popup.gif" /></a><img src="/images/ie6-home-popup.gif" height="694" width="734" /></div></div>');
	} else if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))){
      $("body").append('<div id="about" style="height:950px;width:1000px;"><div class="popup"><a alt="close" class="close" href="/">close<img src="/images/close-home-popup.png" /></a><img src="/images/home-popup.png" height="694" width="734" /></div></div>');
	} else {
      $("body").append('<div id="about"><div class="popup"><a alt="close" class="close" href="/">close<img src="/images/close-home-popup.png" /></a><img src="/images/home-popup.png" height="694" width="734" /></div></div>');
	}
      $("#about").show();
      $("#about").click(function(e){e.preventDefault(); $("#about").hide();});
    });

    $("#inputs").click(function(e){
      if($(e.target).text().indexOf("more") == 0) {
        e.preventDefault();
        seriesPage>= 6?1:seriesPage++;
        $("#inputs").load("/inputs/sampleinputs"+inputSeries+"-"+seriesPage+".htm",function(){
          $("#inputs").prepend('<h2><a href="/examples/">Sample Inputs</a></h2>').css("display","block").css("display","");
		  if ($.browser.version == "6.0") {
			IE6FormatSampleInputs();
		  }
          loadThumbnails();
        });
        if (seriesPage == 6) {
           $("#inputs").click(function(e){
             if($(e.target).text().indexOf("more") == 0) {
               e.preventDefault();
                window.open("/examples/","examples");
             }
           });
        }
      }
    });

     $("#calculate").submit(function(e){
        // if the input is blank, go home
    	 if ($("#i").val().replace(/\s*/g,"")=="") {
            e.preventDefault();
                window.location = "/";
                return;
        }
    // Load the animated GIF image
    $("#spin").addClass("active");

    // Hide the previous calculation's results and footer
    $("#warnings,.assuming,.popup,#results,#timeout,#sources,#footer,#debug-wrapper,#sidebar,#splat,#ex-main-content,#related").hide();
    }).keypress(function(e){
        if(e.which == 13){$("#calculate").submit();}
  });

// Progressive enhancement:  remove the submit button for browsers with scripting
  $("#equal").replaceWith('<div id="equal" title="compute"></div>');

  $("div#equal").click(function(){
    $("#calculate").submit();
  });

/* Feedbback */
    // load the feedback form only when needed
/*    $("#feedback").bind("focus keyup click",function(e){
      if ($(e.target).is("#tmpMessage,#tmpSend,#giveus")){
        var val = this.value;
	$("#feedback").load("/input/feedback.jsp",function(responseText, textStatus, XMLHttpRequest){
	  if(textStatus == "error") {
		$("#feedback fieldset").hide();
		$("#feedback").append('<p style="color:#DB0303;">The feedback form is temporarily unavailable.</p>');
	  } else {
		$("#feedback").addClass("open");
		$("#feedback-textarea").val(val?val:'').focus(); 
		$("#spin").removeClass("active");
		//Default country to us
		$("#Country").val("United States");
	  }
          });
      }
    });*/


    // load the feedback form only when needed
    $("#feedback").live("keyup",function(e){
      if ($(e.target).is("#tmpMessage,#tmpSend,#giveus")){
        var val = this.value;
        /*if(!document.getElementById("feedbackCSS")){
          loadCSS("feedbackCSS",feedbackCSS,function(){$.get("/input/feedback.jsp",function(data,textStatus,XMLHttpRequest){$("#feedback").replaceWith(data);$("#feedback-textarea").val(val?val:'').focus(); bindFeedback(); $("#spin").removeClass("active");},"html");
          });
          if(!document.getElementById("popupCSS")){
            loadCSS("popupCSS",popupCSS);
          }
        }
        else {*/
            $.get("/input/feedback.jsp",function(data,textStatus,XMLHttpRequest){$("#feedback").replaceWith(data);$("#feedback-textarea").val(val?val:'').focus(); bindFeedback(); $("#spin").removeClass("active");},"html");
        //}
      }
    });
     $("#feedback").live("click",function(e){
      if ($(e.target).is("#tmpMessage,#tmpSend,#giveus")){
        var val = this.value;
        /*if(!document.getElementById("feedbackCSS")){
          loadCSS("feedbackCSS",feedbackCSS,function(){$.get("/input/feedback.jsp",function(data,textStatus,XMLHttpRequest){$("#feedback").replaceWith(data);$("#feedback-textarea").val(val?val:'').focus(); bindFeedback(); $("#spin").removeClass("active");},"html");
          });
          if(!document.getElementById("popupCSS")){
            loadCSS("popupCSS",popupCSS);
          }
        }
        else {*/
            $.get("/input/feedback.jsp",function(data,textStatus,XMLHttpRequest){$("#feedback").replaceWith(data);$("#feedback-textarea").val(val?val:'').focus(); bindFeedback(); $("#spin").removeClass("active");},"html");
       // }
      }
    });

    // on submit, load the response page as a pod rather than leave
 /*   $("#feedback").submit(function(e){
      e.preventDefault();
	reqFeed = "required";
     if (($("#feedback-textarea").val() == "" || $("#feedback-textarea").val() == reqFeed)&& $("#i").get(0).defaultValue == "") {
	$("#feedback-textarea").blur().css("color","red").val(reqFeed).one("focus",function(){$(this).val("").css("color","black");});
     }
     else if ($("#Email").val() == "") {
        emailConfirm();
     }
     else {
      if ($("#Remember").is(":checked")) {
        $.cookie('WolframAlphaName',$("#Name").val(),{expires: 90, domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaEmail',$("#Email").val(),{expires: 90, domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaOccupation',$("#Occupation").val(),{expires: 90, domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaOrganization',$("#Organization").val(),{expires: 90, domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaCountry',$("#Country").val(),{expires: 90, domain: '.wolframalpha.com'});
     }

     $("#feedback hr.top,#feedback hr.bot, #feedback table").css("display","none");  
     $("#ec").remove();
     $("#feedback").append('<div style="height:150px;">&nbsp;</div>');
     var data = $("#feedback").serializeArray();
     $("#feedback").load("/input/sendmessage.jsp #thanks",data,  function(){
		$("#thanks .close").click(function(){$(this).parent().remove();});
		
		if ($.browser.msie && $.browser.version == "6.0") {
		  $("#thanks .close").attr('src','/images/ie6-thanks-close-gray.gif');
          $("#thanks .close").mouseover(function() {
		    $(this).attr('src','/images/ie6-thanks-close-red.gif');
 	      }).mouseout(function(){
            $(this).attr('src','/images/ie6-thanks-close-gray.gif');
  	      });
		} else {
          $("#thanks .close").mouseover(function() {
            $(this).attr('src','/images/thanks-close-red.png');
 	      }).mouseout(function(){
            $(this).attr('src','/images/thanks-close.png');
  	      });
		}
	    $("#feedback").append("<fieldset></fieldset>");
        $("#feedback fieldset").load("/input/footer.jsp fieldset *", {i:"i"});
     }).removeClass("open");
      return true;
    }
  });*/

/* ------------------------------------- */
  if ($.browser.opera) {
    $("#sidebar").css("margin-top", "47px");
    $("#even-more-link").mousemove(function(){$("body").redraw();});
  } else if ($.browser.safari) {
    $("#sidebar").css("margin-top", "47px");
  }

  if ($.browser.safari) {
	$("#preview, #previewMap").hover(function() { $("#toGallery").show(); }, function() { $("#toGallery").hide(); });
  }

//  var newto = true;

if ($.browser.msie) {
  //$("#inputArrow").attr("src", "http://" + window.location.hostname + "images/newtoalpha-inputarrow-ie.gif");
  
  // move to ie specific file
  if ($.browser.version == "6.0") {
        $("#preview img").attr("src", "/images/home-thumbs.gif");
	IE6FormatSampleInputs();
	$("#preview, #previewMap, #toGallery").hover(function() { $("#toGallery").show(); }, function() { $("#toGallery").hide(); });
	$("#resources").live("mouseover",function(e){
		$(this).find("ul, ul li").css("display","block");
	}).live("mouseout",function(e){
		$(this).find("ul, ul li").css("display","none");
	});
  }
}


if ($.cookie('new_to_alpha') == null) {
  loadNewToAlpha();
 } else {
  $.cookie('new_to_alpha', 'hide', {expires: 365, path: '/', domain: '.wolframalpha.com'});
  //$("#newToAlphaContainer").remove();
  $("#sidebar").css("left", "auto");
}      

}); // end of onload

function IE6FormatSampleInputs() {
	$("#inputs ul.thumbs li:first-child").addClass("first");//.css("padding-left", "0px").css("background-position", "-10000px 0");
	$("#inputs h2 + ul.thumbs").css("border-top", "0");
	$("#inputs h2").css("float", "left");
	$("#inputs h2 + ul.thumbs > li.first").css("margin-left", "40px");
}

var removeArrow;
var arrow;

function loadNewToAlpha() {
  $.cookie('new_to_alpha', null, {expires: 365, path: '/', domain: '.wolframalpha.com'});
  
  if ($("#newToAlphaContainer").length == 0){
    $("#sidebar").prepend("<div id=\"newToAlphaContainer\"></div>");
  }
  $("#newToAlphaContainer").load("/newbie.html", function() {
    $("#input").prepend('<div id="inputArrow" style="display: none;" alt="Input Arrow" title="Input Arrow" ></div><div id="howTo" style="display: none;"  alt="How to Compute" title="How to Compute" ></div>');
    $("#try li a:not(#trymore)").click(function(e) {
      e.preventDefault();
      $("#i").val($(this).find("kbd").html()).focus();
      $("#howTo").css("display", "block");
      $("#inputArrow").css("display", "block");
      $("#popanchor").append('<img src="/sidebartracking.txt?type='+ 
	 $(this).parents("li").find("kbd").attr("name") + '" style="display:none;"/>');
      if (arrow != null) {
        $("#inputArrow").stop();
        clearTimeout(arrow);
      }
      removeArrow = function() { $("#inputArrow").fadeOut('slow'); }
      arrow = setTimeout(removeArrow, 3000);
    });

    $("#trymore").toggle(function() { // shows more examples to try
      $("#try li.collapse").removeClass("hide");
	$("#newToAlphaContainer").addClass("more");
      $(this).html("less &raquo;");
	/* Click tracking for New To Alpha */
           $("#popanchor").append('<img src="/sidebartracking.txt?type=more" style="display:none;"/>');
      // Fixes a bug in IE where the bottom border won't render in the appropriate place
      if ($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")) {
        $("#newbie .bot").css("top", "0").css("top", "auto");
        if($.browser.version == "7.0"){
      		$("#newbie .bot").css("bottom", "-5px");
      	}
      }
    },function() {// shows less examples to try
        $("#try li.collapse").addClass("hide");
	$("#newToAlphaContainer").removeClass("more");
        $(this).html("more &raquo;");
	/* Click tracking for New To Alpha */
           $("#popanchor").append('<img src="/sidebartracking.txt?type=less" style="display:none;"/>');
        // Fixes a bug in IE where the bottom border won't render in the appropriate place
        if ($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")) {
          $("#newbie .bot").css("top", "0").css("top", "auto");
          if($.browser.version == "7.0") {
        	  $("#newbie .bot").css("bottom", "-11px");
          }
        }
      });
    $("#newbie h2 > a").click(function(e) {
		e.preventDefault();
        //$("#newToAlphaContainer").remove();
        $("#newToAlphaContainer").hide();
        $("#relatedlinks, #searchtheweb, #ads").css("top", "").css("top", "auto");
        $.cookie('new_to_alpha', 'hide', {expires: 365, path: '/', domain: '.wolframalpha.com'});//, { expires: 90 });
	/* Click tracking for NewToAlpha */
        $("#popanchor").append('<img src="/sidebartracking.txt?type=remove" style="display:none;"/>');
      });
      $("#relatedlinks, #searchtheweb, #ads").css("top", "").css("top", "auto");
      $("#sidebar").css("left", "auto");
    });
}

var parsedExpr = '';
var assumptionsMade = '{}';
var rawAssumptions = '{}';

function emailConfirm(){
  $('#popanchor').append('<div id="ec"> <p>Please include a valid email address if you want to make a response possible.</p> <div> <input id="eci" type="text" /> <input id="ecSend" type="image" src="/images/calculate-feedbackopen-send.gif"/> <br/> <span>We will keep your email address private.</span> </div> <p><b>Send without a return email address &raquo;</b></p></div>');

  /*find position of 'parent' which is the results pod clicked*/
  var pos = $('#fbsb').offset();

  $('#ec').css('top',pos.top-95);
  $('#ec').css('left',pos.left-210);
  
  $('.about #ec').css('top',pos.top- 160);
  $('.about #ec').css('left',pos.left-470);

  $("#ecSend").click(function(e){
	if ($("#eci").val().indexOf("@") == -1) {
           $("#eci").blur().css("color","red").val("enter valid email").one("focus",function(){$(this).val("").css("color","black");});
        } else {	   
           $("#Email").val($("#eci").val());
	   $("#feedback").submit();
        }
  });
  $("#ec b").click(function(e){
    $("#Email").val("Anonymous");   
    $("#feedback").submit();
  });
}


/*if (!($.browser.msie && $.browser.version == "6.0")) {
$("#more-menu").mouseover( function() {
          $("#more-menu").addClass("hover");
    }).mouseout( function() {
          $("#more-menu").removeClass("hover");
        });

$("#menu").mouseover( function() {
          $("#menu").addClass("hover");
    }).mouseout( function() {
          $("#menu").removeClass("hover");
        });
}*/

 /* remove the "Are you new to W|A cookie */
  $("#new-to, #newto a").click(function(e){
	e.preventDefault();
	
         /* Click tracking for NewToAlpha */
           $("#popanchor").append('<img src="/sidebartracking.txt?type=add" style="display:none;"/>');
           loadNewToAlpha();
	   $("#newToAlphaContainer").show();
    });

/*$("#tr1").click(function(e){
  window.open("http://products.wolframalpha.com/iphone/");
});
$("#tr2").click(function(e){
  window.open("http://products.wolframalpha.com/api/");
});
$("#tr3").click(function(e){
  window.open("http://homeworkday.wolframalpha.com/");
});*/


$("#cite").click(function(e){
  e.preventDefault();
  var pos = $(this).offset();

  if ( $('#citation').length != 0 ){
    $('#citation').show();
    $('#citation').css({'top':pos.top-180,'left':pos.left+60});
  } else {

  $("#popanchor").load("/citation.html",function(){

  $('#citation').css({'top':pos.top-180,'left':pos.left+60});

   $("#citation .close").click(function(e){
     $("#citation").hide();
   });
   //Make the popup movable, but only by the enabled parts (pdrag)
   $("#citation").draggable( {handle: ".pdrag", cancel: "p, b"} ).css("position","absolute");

  });
  }
});

function bindFeedback(){
    $("#feedback").submit(function(e){
      e.preventDefault();
     reqFeed = "required";
     if ($("#feedback-textarea").val().length == 0 || $("#feedback-textarea").val() == reqFeed) {
        $("#feedback-textarea").blur().css("color","red").val(reqFeed).one("focus",function(){$(this).val("").css("color","black");});
        return false;
     }
     else if ($("#Email").val() == "") {
	emailConfirm();
     }
     else {
       if ($("#Remember").is(":checked")) {
        $.cookie('WolframAlphaName',$("#Name").val(),{expires: 90, domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaEmail',$("#Email").val(),{expires: 90, domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaOccupation',$("#Occupation").val(),{expires: 90, domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaOrganization',$("#Organization").val(),{expires: 90, domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaCountry',$("#Country").val(),{expires: 90, domain: '.wolframalpha.com'});
      }
      else {  // remove any existing cookies if the user doesn't click remember me
       $.cookie('WolframAlphaName',null,{domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaEmail',null,{domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaOccupation',null,{domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaOrganization',null,{domain: '.wolframalpha.com'});
        $.cookie('WolframAlphaCountry',null,{domain: '.wolframalpha.com'});
     }

	$("#ec").remove();

     $("#feedback hr.top,#feedback hr.bot, #feedback table, #feedback-confirm").css("display","none");
     $("#feedback").append('<div style="height:150px;">&nbsp;</div>');

     var data = $("#feedback").serializeArray();
     $("#feedback").load("/input/sendmessage.jsp #thanks",data,  function(){
        $("#thanks .close").click(function(){$(this).parent().remove();});
        $("#thanks .close").mouseover(function() {

          $(this).attr('src','/images/thanks-close-red.png');
          }).mouseout(function(){
          $(this).attr('src','/images/thanks-close.png');
          });
   $("#feedback").append("<fieldset></fieldset>");
        $("#feedback fieldset").load("/input/footer.jsp fieldset *", {i:"i"});
     }).removeClass("open");
        //if ($.browser.msie && $.browser.version == "6.0") {
          //loadCSS("ie6CSS","/Calculate/css/ie6.css");
        //}
      return true;
    }
  });

}

function loadCSS(id,url,callback){
  // Use $.get instead of load because IE doesn't like to modify style tags
  $.get(url, function(data,textStatus){
    $('head').append('<style id="'+id+'" type="text/css">'+data+'</style>');
    if(typeof callback == "function"){callback();}}, "text" );
}

  if($.browser.opera){
    $("head").append('<style type="text/css">.h li{top:0px;} #content .pulldownContainer {top: 0;} #inputs .thumbs li {float: left;}</style>');
  }

