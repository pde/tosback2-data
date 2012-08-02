$(document).ready(function() {
	activePage(); // activate navs
	var isIE6 = (navigator.userAgent.indexOf('MSIE 6') > -1) ? true : false;
	if (isIE6) {
		ieNavFix(); // activate navs additional scripts for IE6
	}
	concatElqParamToGoLinks();
});

// services.jsp is hand coded, this satisifes js error.
if(document.URL.split('/')[4]=='services.jsp'){
		expChannel = "Small Business";
}
// services.jsp ends

function setPageSection(){
var pageSection = $("#nav > li[class='active'] > a").html();
	if(pageSection != undefined){
		pageSection = pageSection.replace("<br>","_");
		pageSection = pageSection.replace(" ","_");
		pageSection = pageSection.toLowerCase(); 
	}
	else{
		pageSection = "not_defined";
	}
	pageUrl.section = pageSection; 
}

function addPageSectionAsTitle(){
var pageSection = $("#nav > li[class='active'] > a").html();
var leftnavtitle = $('#leftnav_inc > ul').html();
if(leftnavtitle != null && pageSection != null){
leftnavtitle = leftnavtitle.indexOf('h4');
pageSection = pageSection.replace("<br>"," ");	
if(pageSection.length > 0 && leftnavtitle < 0){ // check if there is already a title in the form of an h4
	$('#leftnav_inc > ul').prepend('<li style="background: none; margin: 0;"><h4 style="margin: 0 0 0 5px;">'+ pageSection +'</h4></li>');
}
}
$('#leftnav_inc>ul>li>h4>br').replaceWith('&nbsp;');
}


function activePage(){
	function activeGroup(j){
		var groupClass = j.attr('class');
		var groupLabel = groupClass.replace(/^grp_/,"");
		groupLabel = groupLabel.replace(/_/g," ");
		groupLabel = groupLabel.replace(/\b[a-z]/g,capLtr);
		
		if(document.location.hostname == 'www.experian.com' || document.location.hostname == 'stg1.experian.com'){
			if($(".grp_business_services").length >= 1){ 
				groupLabel = "Enterprise Services";
			}
		}
		
		$("#globalNav li a:contains("+groupLabel+")").parents('li').addClass('active');
		$("#globalNav li a:contains("+groupLabel+")").parents('li').prev('li').css({'background':'none','padding-right':'0'});
	};
	
	function capLtr(){
		return arguments[0].toUpperCase();
	}
	
	if ($("#navGrp[class^='grp']").length >= 1){ 
		activeGroup($("#navGrp[class^='grp']"));   
	}  
	 
	function addActiveClass(){
		var path;
		var pathname = location.pathname;
		var expver, regForPath, regForNavComp, regForNavComp2;
		
		if(location.search.match(/expver=.*/i)){
			for(i=0;i<pageUrl.paramArray.length;i++){
				expver=pageUrl.paramArray[i].split("=");
				if(expver[0] == 'expver'){
					expver='-'+expver[1]+'.';
				    reg = new RegExp(expver, 'gi');
                }
			}
			pathname = pathname.replace(reg,'.'); 
		} 
		
		if(location.search.match(/cat[1|2]/)){
			var parms = location.search;
			for(i=0;i<pageUrl.paramArray.length;i++){
				if(!pageUrl.paramArray[i].match(/cat[1|2]/gi)){  
					parms = parms.replace('&' + pageUrl.paramArray[i],''); 
				}
				path = pathname.substring(1)+parms; // includes request params for cat1 or cat2 only
			}
		}
		
		else{
			path = pathname.substring(1); // ignore req parameters
		}
		if (path.search(/(\.html|\.jsp)/gi) > 0){
			regForPath = path+"$"; // end of line
			regForPath = new RegExp(regForPath, 'i');
				
			matchTopNavByRecursion = function(){
				var thisTopLink, thisTopLinkHref, thisLeftLinkHref;
				var activateTopNavCounter = 0;
				$('#nav li > a').each(function(){
					if(activateTopNavCounter < 1){
						thisTopLink = $(this);
						thisTopLinkHref = $(this).attr("href");
						thisTopLinkHref2 = thisTopLinkHref.split("?")[0];
						
						$("#leftnav200 ul li[class='active'] > a").each(function(){
							if(activateTopNavCounter < 1){
								thisLeftLinkHref = $(this).attr("href");
								
								if(typeof thisLeftLinkHref != "undefined"){
										regForNavComp = thisTopLinkHref+"$"; // end of line
										regForNavComp = new RegExp(regForNavComp, 'i');
										
										regForNavComp2 = thisTopLinkHref2+"$"; // end of line
										regForNavComp2 = new RegExp(regForNavComp2, 'i');
										
										
										if(thisLeftLinkHref.match(regForNavComp)){
											thisTopLink.parents("li").addClass('active');
											activateTopNavCounter++;
										}
										else if(thisLeftLinkHref.split("?")[0].match(regForNavComp)){	
											thisTopLink.parents("li").addClass('active');
											activateTopNavCounter++;
										}
										else if(thisLeftLinkHref.match(regForNavComp2)){
											thisTopLink.parents("li").addClass('active');
											activateTopNavCounter++;
										}
										else if(thisLeftLinkHref.split("?")[0].match(regForNavComp2)){	
											thisTopLink.parents("li").addClass('active');
											activateTopNavCounter++;
										}	
								}
							}
						});
					}	
				});
			}
			
			matchTopNavOnlyByRecursion = function(){
				var thisTopLink, thisTopLinkHref;
				var activateTopNavCounter = 0;
				$('#nav li > a').each(function(){
					if(activateTopNavCounter < 1){
						thisTopLink = $(this);
						thisTopLinkHref = $(this).attr("href");
						
						if(thisTopLinkHref.match(regForPath)){
							thisTopLink.parents("li").addClass('active');
							activateTopNavCounter++;
						}
						else if(thisTopLinkHref.split("?")[0].match(regForPath)){	
							thisTopLink.parents("li").addClass('active');
							activateTopNavCounter++;
						}
					}	
				});
			}
			
			matchLeftNavByRecursion = function(){
				var thisLeftLink, thisLeftLinkHref;
				var activateLeftNavCounter = 0;
					$("#leftnav200 li > a").each(function(){
							if(activateLeftNavCounter < 1){
								thisLeftLink = $(this);
								thisLeftLinkHref = $(this).attr("href");
								
								if(typeof thisLeftLinkHref != "undefined" ){
									if(thisLeftLinkHref.match(regForPath)){
										thisLeftLink.parents("li").addClass('active');
										activateLeftNavCounter++;
									}
									else if(thisLeftLinkHref.split("?")[0].match(regForPath)){	
										thisLeftLink.parents("li").addClass('active');
										activateLeftNavCounter++;
									}		
								}
							}		
					});	
			}
			
			// TRY MATCH BY SELECTION FIRST (most of the time this will be enough, otherwise, the use of req params may require match by recursion)
			// -- add active class to topnav if match
			$('#nav li a[href$="' + path + '"]').parents("li").addClass('active');
			// --- add active class to leftnav if match
			$('#leftnav200 li a[href$="' + path + '"]').parents("li").addClass('active');
			// --- add active class to nav level 1 if match
			if($("#leftnav200 li[class='active'] a").length > 0 && $("#nav li[class='active'] a").length < 1){
				matchTopNavByRecursion();
			}
			else if($("#leftnav200 li").length > 0 && $("#leftnav200 li[class='active'] a").length < 1){
				matchLeftNavByRecursion();
				matchTopNavByRecursion();
			}
			else if($("#leftnav200 li").length < 1){ // no left nav, match top nav only
				matchTopNavOnlyByRecursion();	
			}
			if(window.location.toString().indexOf("marketing-services") != -1){
				if($('.subnav subnavext li').hasClass('subnavcol active')){
			$('#nav li').addClass('active')}
			else{
			return false;}	
			}
			
		}
		setPageSection(); // sets pageId.section for site catalyst
		
		if(typeof expChannel != 'undefined' && ($("#leftnav_inc").find("#ems-left-nav-v1").length < 1)){
			if((document.URL.match(/[stg1|www].experian.com/)) && (expChannel == 'Enterprise')){ // US pages where expChannel = Enterprise only
				addPageSectionAsTitle();
			}
		}
		return false;
	}
	  
	if(location.search.match(/cat1=/g)){ // swaps left nav on product pages that have req params
		var leftNavURL;
		
		if(document.URL.match(/[stg1|www].experian.com\/small-business/)){ // US /small-business only
			getPageElementSuccess = function(id){
				addActiveClass();
			}
			
			leftNavURL = "http://stg1.experian.com/small-business/html/SmallBusiness/site-includes/"+pageUrl.cat1+"/"+pageUrl.cat1+"-left-navigation.jsp";
			getPageElement(leftNavURL,"homeContent > ul","leftnav_inc > ul",1);
		}
		else{
			if(location.search.match(/cat0=/g)){
				leftNavURL = "/site-includes/"+pageUrl.cat0+"/"+pageUrl.cat1+"/"+pageUrl.cat1+"-left-navigation.html";
			}
			else{
				leftNavURL = "/site-includes/business-services/"+pageUrl.cat1+"/"+pageUrl.cat1+"-left-navigation.html";
			}
			
			$.ajax({
			  type: 'GET', 
			  url: leftNavURL,
			  success: function(data){
				$('#leftnav_inc').html(data);
				addActiveClass();
			  },
			  error: function(data){
				addActiveClass();
			  } 
			});
		}
	}
	else {
		addActiveClass();
	}
}

function ieNavFix(){
	$("#nav > li[class!=active]").hover(function(){
		$('.active .subnav').css({'display':'none'});
		$(this).css({'background':'url(/global-images/nav_tab_active_right.gif) right top no-repeat'});
		$(this).children('a').css({'background':'url(/global-images/nav_tab_active_left.gif) left top no-repeat','color':'#595959'});
		$(this).children('.subnav').css({'display':'block'});
		$(this).children('.subnav li a').css({'background':'none'});
	}, function() {
		$(this).css({'background':'none'});
		$('.active .subnav').css({'display':'block'});
		$(this).children('a').css({'background':'none','color':'#fefefe'});
		$(this).children('.subnav').css({'display':'none'});
	});
}

function UrlObj(){
	var rawpathname = location.pathname.substring(1);
	rawpathname = rawpathname.split(".");
	this.pageId = rawpathname[0].replace("/","_"); 
	
    if(document.URL.indexOf('?') > 0) {
		this.urlArray = document.URL.split('?');
		this.paramString = this.urlArray[1];	
		this.paramArray = this.paramString.split('&');

		for(var i=0; i < this.paramArray.length; i++) {
			var pair = this.paramArray[i].split('=');
			var urlkey = pair[0].toLowerCase();	
			switch(urlkey){
				case "gnav":
					this.gnav = pair[1];
					break;
				case "lnav": 
					this.lnav = pair[1];
					break;
				case "cat0":
					this.cat0 = pair[1];
					break;
				case "cat1":
					this.cat1 = pair[1];
					break;
				case "cat2":
					this.cat2 = pair[1];
					break;
				case "intcmp":
					this.intcmp = pair[1];
					break;
				case "wt.srch":
					this.wtsrch = pair[1];
					break;
				case "cmpid":
					this.cmpid = pair[1];
					break;		
				case "bvdisplaycode":
					this.bvdisplaycode = pair[1];
					break;
				case "bcvid": // brightcove video id
					this.bcvid = pair[1];
					break;
				case "video": // brightcove video id
					this.video = pair[1];
					break;
				case "player": // brightcove collection
					this.player = pair[1];
					break;
				case "gallery": // brightcove gallery
					this.gallery = pair[1];
					break;		
				case "tab":
					this.tab = pair[1];
					break;
				case "lname":
					this.lname = pair[1];
					break;
				case "fname":
					this.fname = pair[1];
					break;
				case "company":
					this.company = pair[1];
					break;
				case "email":
					this.email = pair[1];
					break;
				case "elq":
					this.elq = pair[1];
					break;								
			}
		}
    }
}

function ReferUrlObj(){
	var rawpathname = document.referrer;
 	
  if(rawpathname.indexOf('?') > 0) {
		this.urlArray = rawpathname.split('?');
		this.paramString = this.urlArray[1];	
		this.paramArray = this.paramString.split('&');

		for(var i=0; i < this.paramArray.length; i++) {
			var pair = this.paramArray[i].split('=');
			var urlkey = pair[0].toLowerCase();	
			switch(urlkey){		
				case "q":
					this.q = pair[1];
					break;			
			}
		}
 }
}

function concatElqParamToGoLinks(){
	if (typeof pageUrl.elq != "undefined") {
		$("a[href^='http://go.experian.com']").each(function(){
				var elqHref = $(this).attr("href");
		   	if(elqHref.indexOf("?") > 0){
		   		elqHref = elqHref + "&elq=" + pageUrl.elq;
		   	}
		   	else{
		   		elqHref = elqHref + "?elq=" + pageUrl.elq;
		   	}
		   	$(this).attr("href",elqHref); // replace current href with elqHref
		});
	}	
}

var pageUrl = new UrlObj(); // create pageUrl instance
var referUrl = new ReferUrlObj(); // create refer url instance

